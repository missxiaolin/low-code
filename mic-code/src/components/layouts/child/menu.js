export const routeFormat = (data) => {
  let arr = data.map((item) => {
    let obj = {
      key: item.id,
      label: item.name,
      path: item.path,
    };
    if (item.type === 1 && item.children && item.children.length > 0) {
      obj.children = routeFormat(item.children);
    }
    return obj;
  });
  return arr;
};
