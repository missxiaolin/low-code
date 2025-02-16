import { isObject, trim, camelCase } from "lodash-es";

/**
 * // EventListenerOrEventListenerObject
 * @param {*} element
 * @param {*} event
 * @param {*} handler
 * @param {*} useCapture
 */
export const on = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

/**
 * @param {*} element
 * @param {*} event
 * @param {*} handler // EventListenerOrEventListenerObject
 */
export const off = function (element, event, handler) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
};

export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function setStyle(element, styleName, value = "") {
  if (!element || !styleName) return;
  if (isObject(styleName)) {
    Object.keys(styleName).forEach((prop) => {
      setStyle(element, prop, styleName[prop]);
    });
  } else {
    styleName = camelCase(styleName);
    console.log(styleName, value);
    element.style[styleName] = value;
  }
}
