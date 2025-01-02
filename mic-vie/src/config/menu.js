export const initRoute = [
  {
    key: "dashboard",
    path: "/",
    label: "介绍",
  },
  {
    key: "project",
    label: "项目",
    children: [
      {
        key: "projectList",
        path: "/project/list",
        label: "项目列表",
      },
      {
        key: "menuList",
        path: "/project/menu",
        label: "菜单列表",
      },
    ],
  },
  // {
  //   key: "2",
  //   label: "低代码测试",
  //   children: [
  //     {
  //       key: "remoteButton",
  //       path: "/remoteButton",
  //       label: "remoteButton",
  //     },
  //   ],
  // },
];
