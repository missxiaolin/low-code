import isPlainObject from 'lodash/isPlainObject';
import {Evaluator} from './evalutor';
import {parse} from './parser';
import moment from 'moment';

// 方便取值的时候能够把上层的取到，但是获取的时候不会全部把所有的数据获取到。
export function createObject(
  superProps?: {[propName: string]: any},
  props?: {[propName: string]: any},
  properties?: any
): object {
  if (superProps && Object.isFrozen(superProps)) {
    superProps = cloneObject(superProps);
  }

  const obj = superProps
    ? Object.create(superProps, {
        ...properties,
        __super: {
          value: superProps,
          writable: false,
          enumerable: false
        }
      })
    : Object.create(Object.prototype, properties);

  props &&
    isObject(props) &&
    Object.keys(props).forEach(key => (obj[key] = props[key]));

  return obj;
}

export function cloneObject(target: any, persistOwnProps: boolean = true) {
  const obj =
    target && target.__super
      ? Object.create(target.__super, {
          __super: {
            value: target.__super,
            writable: false,
            enumerable: false
          }
        })
      : Object.create(Object.prototype);
  persistOwnProps &&
    target &&
    Object.keys(target).forEach(key => (obj[key] = target[key]));
  return obj;
}

export function isObject(obj: any) {
  const typename = typeof obj;
  return (
    obj &&
    typename !== 'string' &&
    typename !== 'number' &&
    typename !== 'boolean' &&
    typename !== 'function' &&
    !Array.isArray(obj)
  );
}

export function string2regExp(value: string, caseSensitive = false) {
  if (typeof value !== 'string') {
    throw new TypeError('Expected a string');
  }

  return new RegExp(
    value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d'),
    !caseSensitive ? 'i' : ''
  );
}

export function getVariable(
  data: {[propName: string]: any},
  key: string | undefined,
  canAccessSuper: boolean = true
): any {
  if (!data || !key) {
    return undefined;
  } else if (canAccessSuper ? key in data : data.hasOwnProperty(key)) {
    return data[key];
  }

  return keyToPath(key).reduce(
    (obj, key) =>
      obj &&
      typeof obj === 'object' &&
      (canAccessSuper ? key in obj : obj.hasOwnProperty(key))
        ? obj[key]
        : undefined,
    data
  );
}

export function setVariable(
  data: {[propName: string]: any},
  key: string,
  value: any,
  convertKeyToPath?: boolean
) {
  data = data || {};

  if (key in data) {
    data[key] = value;
    return;
  }

  const parts = convertKeyToPath !== false ? keyToPath(key) : [key];
  const last = parts.pop() as string;

  while (parts.length) {
    let key = parts.shift() as string;
    if (isPlainObject(data[key])) {
      data = data[key] = {
        ...data[key]
      };
    } else if (Array.isArray(data[key])) {
      data[key] = data[key].concat();
      data = data[key];
    } else if (data[key]) {
      // throw new Error(`目标路径不是纯对象，不能覆盖`);
      // 强行转成对象
      data[key] = {};
      data = data[key];
    } else {
      data[key] = {};
      data = data[key];
    }
  }

  data[last] = value;
}

export function deleteVariable(data: {[propName: string]: any}, key: string) {
  if (!data) {
    return;
  } else if (data.hasOwnProperty(key)) {
    delete data[key];
    return;
  }

  const parts = keyToPath(key);
  const last = parts.pop() as string;

  while (parts.length) {
    let key = parts.shift() as string;
    if (isPlainObject(data[key])) {
      data = data[key] = {
        ...data[key]
      };
    } else if (data[key]) {
      throw new Error(`目标路径不是纯对象，不能修改`);
    } else {
      break;
    }
  }

  if (data && data.hasOwnProperty && data.hasOwnProperty(last)) {
    delete data[last];
  }
}

/**
 * 将例如像 a.b.c 或 a[1].b 的字符串转换为路径数组
 *
 * @param string 要转换的字符串
 */
export const keyToPath = (string: string) => {
  const result = [];

  if (string.charCodeAt(0) === '.'.charCodeAt(0)) {
    result.push('');
  }

  string.replace(
    new RegExp(
      '[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
      'g'
    ),
    (match, expression, quote, subString) => {
      let key = match;
      if (quote) {
        key = subString.replace(/\\(\\)?/g, '$1');
      } else if (expression) {
        key = expression.trim();
      }
      result.push(key);
      return '';
    }
  );

  return result;
};

export const tokenize = (
  str: string,
  data: object,
  defaultFilter: string = '| html'
) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  try {
    const ast = parse(str, {
      evalMode: false,
      allowFilter: true
    });
    const result = new Evaluator(data, {
      defaultFilter
    }).evalute(ast);

    return `${result == null ? '' : result}`;
  } catch (e) {
    console.warn(e);
    return str;
  }
};

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const prettyBytes = (num: number) => {
  if (!Number.isFinite(num)) {
    throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
  }

  const neg = num < 0;

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    UNITS.length - 1
  );
  const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
  const unit = UNITS[exponent];

  return (neg ? '-' : '') + numStr + ' ' + unit;
};

const entityMap: {
  [propName: string]: string;
} = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
export const escapeHtml = (str: string) =>
  String(str).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });

export function formatDuration(value: number): string {
  const unit = ['秒', '分', '时', '天', '月', '季', '年'];
  const steps = [1, 60, 3600, 86400, 2592000, 7776000, 31104000];
  let len = steps.length;
  const parts = [];

  while (len--) {
    if (steps[len] && value >= steps[len]) {
      parts.push(Math.floor(value / steps[len]) + unit[len]);
      value %= steps[len];
    } else if (len === 0 && value) {
      parts.push((value.toFixed ? value.toFixed(2) : '0') + unit[0]);
    }
  }

  return parts.join('');
}

const timeUnitMap: {
  [propName: string]: string;
} = {
  year: 'Y',
  month: 'M',
  week: 'w',
  weekday: 'W',
  day: 'd',
  hour: 'h',
  minute: 'm',
  min: 'm',
  second: 's',
  millisecond: 'ms'
};

export const relativeValueRe =
  /^(.+)?(\+|-)(\d+)(minute|min|hour|day|week|month|year|weekday|second|millisecond)s?$/i;
export const filterDate = (
  value: string,
  data: object = {},
  format = 'X',
  utc: boolean = false
): moment.Moment => {
  let m,
    mm = utc ? moment.utc : moment;

  if (typeof value === 'string') {
    value = value.trim();
  }

  // todo
  const date = new Date();
  value = tokenize(value, createObject(data, {
    now: mm().toDate(),
    today: mm([date.getFullYear(), date.getMonth(), date.getDate()])
  }), '| raw');

  if (value && typeof value === 'string' && (m = relativeValueRe.exec(value))) {
    const date = new Date();
    const step = parseInt(m[3], 10);
    const from = m[1]
      ? filterDate(m[1], data, format, utc)
      : mm(
          /(minute|min|hour|second)s?/.test(m[4])
            ? [
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
              ]
            : [date.getFullYear(), date.getMonth(), date.getDate()]
        );

    return m[2] === '-'
      ? from.subtract(step, timeUnitMap[m[4]] as moment.DurationInputArg2)
      : from.add(step, timeUnitMap[m[4]] as moment.DurationInputArg2);
    //   return from[m[2] === '-' ? 'subtract' : 'add'](step, mapping[m[4]] || m[4]);
  } else if (value === 'now') {
    return mm();
  } else if (value === 'today') {
    const date = new Date();
    return mm([date.getFullYear(), date.getMonth(), date.getDate()]);
  } else {
    const result = mm(value);
    return result.isValid() ? result : mm(value, format);
  }
};

export function parseDuration(str: string): moment.Duration | undefined {
  const matches =
    /^((?:\-|\+)?(?:\d*\.)?\d+)(minute|min|hour|day|week|month|quarter|year|weekday|second|millisecond)s?$/.exec(
      str
    );

  if (matches) {
    const duration = moment.duration(parseFloat(matches[1]), matches[2] as any);

    if (moment.isDuration(duration)) {
      return duration;
    }
  }

  return;
}

// 主要用于解决 0.1+0.2 结果的精度问题导致太长
export function stripNumber(number: number) {
  if (typeof number === 'number') {
    return parseFloat(number.toPrecision(12));
  } else {
    return number;
  }
}

export function pickValues(names: string, data: object) {
  let arr: Array<string>;
  if (!names || ((arr = names.split(',')) && arr.length < 2)) {
    let idx = names.indexOf('~');
    if (~idx) {
      let key = names.substring(0, idx);
      let target = names.substring(idx + 1);
      return {
        [key]: resolveVariable(target, data)
      };
    }
    return resolveVariable(names, data);
  }

  let ret: any = {};
  arr.forEach(name => {
    let idx = name.indexOf('~');
    let target = name;

    if (~idx) {
      target = name.substring(idx + 1);
      name = name.substring(0, idx);
    }

    setVariable(ret, name, resolveVariable(target, data));
  });
  return ret;
}

export function resolveVariable(path?: string, data: any = {}): any {
  if (path === '&' || path == '$$') {
    return data;
  } else if (!path || typeof path !== 'string') {
    return undefined;
  } else if (!~path.indexOf(':')) {
    // 简单用法直接用 getVariable
    return getVariable(data, path[0] === '$' ? path.substring(1) : path);
  }

  // window:xxx  ls:xxx.xxx
  // 带 namespace 的用公式
  // 主要是用公式会严格点，不能出现奇怪的变量名
  try {
    return new Evaluator(data).evalute(
      parse(path, {
        variableMode: true,
        allowFilter: false
      })
    );
  } catch (e) {
    return undefined;
  }
}

export function isPureVariable(path?: any): path is string {
  return typeof path === 'string'
    ? /^\$(?:((?:\w+\:)?[a-z0-9_.][a-z0-9_.\[\]]*)|{[^}{]+})$/i.test(path)
    : false;
}

export const resolveVariableAndFilter = (
  path?: string,
  data: object = {},
  defaultFilter: string = '| html',
  fallbackValue = (value: any) => value
) => {
  if (!path || typeof path !== 'string') {
    return undefined;
  }

  try {
    const ast = parse(path, {
      evalMode: false,
      allowFilter: true
    });

    const ret = new Evaluator(data, {
      defaultFilter
    }).evalute(ast);

    return ret == null && !~path.indexOf('default') && !~path.indexOf('now')
      ? fallbackValue(ret)
      : ret;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
