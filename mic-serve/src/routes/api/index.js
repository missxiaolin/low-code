import index from "./index/index";
import project from "./project/index";
import page from "./page/index";
import dpIndex from "./page/dpIndex";
import login from "./login";
import com from "./component";

export default {
  ...index,
  ...login,
  ...project,
  ...page,
  ...dpIndex,
  ...com,
};
