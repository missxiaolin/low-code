const createUserList = () => {
  return {
    username: "xiaolin",
    password: "123456",
  };
};

export default [
  {
    url: "/api/user/get",
    method: "get",
    response: ({ body }) => {
      return {
        code: 200,
        data: createUserList(),
      };
    },
  },
];
