export const btnPopForm = [
  {
    key: "type",
    default: 1,
    type: "radio",
    label: "项目类型",
    disabled: false,
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
    disabled: false,
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
    disabled: false,
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
    disabled: false,
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
    disabled: false,
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
    key: "id",
    title: "ID",
    align: "center",
  },
  {
    key: "name",
    title: "项目名称",
    align: "center",
  },
  {
    key: "code",
    title: "三字码",
    align: "center",
  },
  {
    key: "desc",
    title: "项目描述",
    align: "center",
  },
  {
    key: "type_desc",
    title: "项目类型",
    align: "center",
  },
  {
    key: "status_desc",
    title: "项目状态",
    align: "center",
  },
  {
    key: "create_time",
    title: "创建时间",
    align: "center",
  },
  {
    key: "update_time",
    title: "修改时间",
    align: "center",
  },
  {
    key: "status",
    prop: "status",
    title: "状态",
    align: "center",
  },
  {
    key: "options",
    prop: "options",
    align: "center",
    title: "操作",
    width: "250px",
    fixed: "right",
    noEmptyValue: true,
  },
];
