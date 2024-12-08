export default [
  {
    path: "/vcc/project",
    meta: {
      title: "项目",
      elIcon: "Operation",
    },
    children: [
      {
        path: "/vcc/project/list",
        hidden: false,
        meta: {
          title: "项目列表",
        },
      },
    ],
  },
];
