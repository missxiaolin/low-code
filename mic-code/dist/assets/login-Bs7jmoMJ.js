import { request, _export_sfc, importShared, useGeneralStore, Form, useRouter, api, setToken, __tla as __tla_0 } from './index-DI9_lGZc.js';
let login;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const login$1 = (data)=>{
        return request({
            url: "/adm/login",
            method: "post",
            data
        });
    };
    const _imports_0 = "/assets/logo-BSgXqyPE.png";
    const { reactive } = await importShared('vue');
    const generalStore = useGeneralStore();
    const _sfc_main = {
        setup (props) {
            const useForm = Form.useForm;
            const router = useRouter();
            const formRef = reactive({
                username: "admin",
                password: "12345678"
            });
            const rulesRef = reactive({
                username: [
                    {
                        required: true,
                        message: "请输入用户名"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码"
                    },
                    {}
                ]
            });
            const { validate, validateInfos } = useForm(formRef, rulesRef);
            const onFinish = ()=>{
                login$1(formRef).then((res)=>{
                    if (!res.success) {
                        api.error(res.errorMessage);
                        return;
                    }
                    setToken(res.model.token || "");
                    setTimeout(()=>{
                        generalStore.getValidProject();
                    });
                    api.success("登录成功");
                    setTimeout(()=>{
                        router.push("/");
                    }, 3000);
                });
            };
            return {
                formRef,
                rulesRef,
                validateInfos,
                validate,
                onFinish
            };
        }
    };
    const { createElementVNode: _createElementVNode, resolveComponent: _resolveComponent, createVNode: _createVNode, withCtx: _withCtx, createTextVNode: _createTextVNode, openBlock: _openBlock, createElementBlock: _createElementBlock } = await importShared('vue');
    const _hoisted_1 = {
        class: "login-container"
    };
    const _hoisted_2 = {
        class: "login-card"
    };
    const _hoisted_3 = {
        class: "content"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_UserOutlined = _resolveComponent("UserOutlined");
        const _component_a_input = _resolveComponent("a-input");
        const _component_a_form_item = _resolveComponent("a-form-item");
        const _component_LockOutlined = _resolveComponent("LockOutlined");
        const _component_a_input_password = _resolveComponent("a-input-password");
        const _component_a_button = _resolveComponent("a-button");
        const _component_a_form = _resolveComponent("a-form");
        return (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _createElementVNode("div", _hoisted_2, [
                _cache[3] || (_cache[3] = _createElementVNode("div", {
                    class: "title"
                }, [
                    _createElementVNode("img", {
                        src: _imports_0
                    })
                ], -1)),
                _createElementVNode("div", _hoisted_3, [
                    _createVNode(_component_a_form, {
                        id: "formLogin",
                        name: "basic",
                        class: "user-layout-login",
                        "label-col": {
                            span: 4
                        },
                        onFinish: $setup.onFinish,
                        model: $setup.formRef
                    }, {
                        default: _withCtx(()=>[
                                _createVNode(_component_a_form_item, {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your username!'
                                        }
                                    ],
                                    name: "username"
                                }, {
                                    default: _withCtx(()=>[
                                            _createVNode(_component_a_input, {
                                                size: "large",
                                                type: "text",
                                                placeholder: "请输入用户名",
                                                value: $setup.formRef.username,
                                                "onUpdate:value": _cache[0] || (_cache[0] = ($event)=>(($setup.formRef.username) = $event))
                                            }, {
                                                prefix: _withCtx(()=>[
                                                        _createVNode(_component_UserOutlined)
                                                    ]),
                                                _: 1
                                            }, 8, [
                                                "value"
                                            ])
                                        ]),
                                    _: 1
                                }),
                                _createVNode(_component_a_form_item, {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!'
                                        }
                                    ],
                                    name: "password"
                                }, {
                                    default: _withCtx(()=>[
                                            _createVNode(_component_a_input_password, {
                                                size: "large",
                                                placeholder: "请输入密码",
                                                value: $setup.formRef.password,
                                                "onUpdate:value": _cache[1] || (_cache[1] = ($event)=>(($setup.formRef.password) = $event)),
                                                autocomplete: ""
                                            }, {
                                                prefix: _withCtx(()=>[
                                                        _createVNode(_component_LockOutlined)
                                                    ]),
                                                _: 1
                                            }, 8, [
                                                "value"
                                            ])
                                        ]),
                                    _: 1
                                }),
                                _createVNode(_component_a_form_item, null, {
                                    default: _withCtx(()=>[
                                            _createVNode(_component_a_button, {
                                                block: "",
                                                "html-type": "submit",
                                                size: "large"
                                            }, {
                                                default: _withCtx(()=>_cache[2] || (_cache[2] = [
                                                        _createTextVNode("登 录")
                                                    ])),
                                                _: 1
                                            })
                                        ]),
                                    _: 1
                                })
                            ]),
                        _: 1
                    }, 8, [
                        "onFinish",
                        "model"
                    ])
                ])
            ])
        ]));
    }
    login = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-05adab9e"
        ]
    ]);
});
export { login as default, __tla };
