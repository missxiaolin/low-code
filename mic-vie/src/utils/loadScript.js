/**
 * 加载js
 * @param url
 * @param id
 * @param callback
 */
export function loadScript(url, id, callback) {
  // 如果URL不存在或者该ID已经加载过了
  if (!url || document.getElementById(id)) {
    if (typeof callback === "function") {
      // eslint-disable-next-line
      callback(true);
    }
    return;
  }
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (id) {
    script.id = id;
  }
  if (typeof callback === "function") {
    // 默认10S超时就立即执行回调函数
    let timer = setTimeout(() => {
      callback(false);
      timer = null;
    }, 10000);

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          if (timer) {
            callback(true);
          }
        }
      };
    } else {
      script.onload = () => {
        if (timer) {
          clearTimeout(timer);
          callback(true);
        }
      };
    }
  }
  script.src = url;
  document.head.appendChild(script);
}
