// 方便取值的时候能够把上层的取到，但是获取的时候不会全部把所有的数据获取到。
export function createObject(superProps, props, properties = {}) {
  if (superProps && Object.isFrozen(superProps)) {
    superProps = cloneObject(superProps);
  }

  const obj = superProps
    ? Object.create(
        superProps,
        Object.assign(
          {},
          {
            __super: {
              value: superProps,
              writable: false,
              enumerable: false,
            },
          },
          properties
        )
      )
    : Object.create(Object.prototype, properties);

  props &&
    isObject(props) &&
    Object.keys(props).forEach((key) => (obj[key] = props[key]));

  return obj;
}

// 主要用于解决 0.1+0.2 结果的精度问题导致太长
export function stripNumber(number) {
  if (typeof number === "number") {
    return parseFloat(number.toPrecision(12));
  } else {
    return number;
  }
}
