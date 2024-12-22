export const btnPopForm = [
  {
    key: "type",
    default: 1,
    type: "radio",
    label: "项目类型",
    dataOptions: [
      {
        label: "pc",
        value: 1,
      },
      {
        label: "mobile",
        value: 2,
        disabled: true,
      },
    ],
    placeholder: "请选择项目类型",
    value: "",
    rules: [
      {
        required: true,
        message: "请选择项目类型",
      },
    ],
  },
  {
    key: "code",
    default: "",
    type: "input",
    label: "三字码",
    data: "",
    placeholder: "请输入项目三字码",
    value: "",
    rules: [
      {
        required: true,
        message: "请输入项目三字码",
        trigger: "blur",
      },
      {
        max: 3,
        message: "请输入英文3个字符串",
        trigger: "blur",
      },
    ],
  },
  {
    key: "name",
    default: "",
    type: "input",
    label: "项目名称",
    data: "",
    placeholder: "请输入项目名称",
    value: "",
    rules: [
      {
        required: true,
        message: "请输入项目名称",
        trigger: "blur",
      },
    ],
  },
  {
    key: "desc",
    default: "",
    type: "input",
    label: "项目描述",
    data: "",
    placeholder: "请输入项目描述",
    value: "",
    rules: [
      {
        required: true,
        message: "请输入项目描述",
        trigger: "blur",
      },
    ],
  },
  {
    key: "status",
    default: 2,
    type: "radio",
    label: "是否禁用",
    dataOptions: [
      {
        label: "禁用",
        value: 1,
      },
      {
        label: "开启",
        value: 2,
      },
    ],
    value: "",
    rules: [
      {
        required: true,
        message: "请选择是否禁用",
      },
    ],
  },
];

export const tableColumns = [
  {
    key: "name",
    title: "项目名称",
  },
  {
    key: "code",
    title: "三字码",
  },
  {
    key: "desc",
    title: "项目描述",
  },
  {
    key: "type_desc",
    title: "项目类型",
  },
  {
    key: "status_desc",
    title: "项目状态",
  },
  {
    key: "create_time",
    title: "创建时间",
  },
  {
    key: "update_time",
    title: "修改时间",
  },
  {
    key: "options",
    prop: "options",
    title: "操作",
    width: "200px",
    fixed: "right",
    noEmptyValue: true,
  },
];
