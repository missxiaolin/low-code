import index from "./index/index";
import project from "./project/index";
import page from "./page/index";
import login from "./login";

export default {
  ...index,
  ...login,
  ...project,
  ...page,
};
