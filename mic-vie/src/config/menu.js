export const initRoute = [
  {
    key: "dashboard",
    path: "/",
    label: "首页",
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