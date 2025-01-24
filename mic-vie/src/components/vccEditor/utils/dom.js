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
