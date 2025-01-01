class urlUtils {
  constructor() {}

  /**
   * 解析url
   * @param {*} url
   */
  getQueryObject(url) {
    let search = url.substring(url.lastIndexOf("?") + 1),
      obj = {},
      reg = /([^?&=]+)=([^?&=]*)/g,
      base_url = url.split("?")[0];
    search.replace(reg, (rs, $1, $2) => {
      let name = decodeURIComponent($1),
        val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
    });

    return {
      baseUrl: base_url,
      query: obj,
    };
  }

  /**
   * 组装url
   * @param {*} queryObject
   */
  makeQuery(queryObject) {
    let query = Object.entries(queryObject)
      .reduce((result, entry) => {
        result.push(entry.join("="));
        return result;
      }, [])
      .join("&");
    return `?${query}`;
  }
}

export default urlUtils;
