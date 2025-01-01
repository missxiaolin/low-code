import { _export_sfc, useRouter, importShared, __tla as __tla_0 } from './index-DI9_lGZc.js';
let _404;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const _sfc_main = {
        setup (props) {
            const router = useRouter();
            const goHome = ()=>{
                router.push({
                    path: "/"
                });
            };
            return {
                goHome
            };
        }
    };
    const { createTextVNode: _createTextVNode, resolveComponent: _resolveComponent, withCtx: _withCtx, createVNode: _createVNode, openBlock: _openBlock, createElementBlock: _createElementBlock } = await importShared('vue');
    const _hoisted_1 = {
        class: "error-page"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_a_button = _resolveComponent("a-button");
        const _component_a_result = _resolveComponent("a-result");
        return (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _createVNode(_component_a_result, {
                status: "404",
                title: "404",
                "sub-title": "Sorry, the page you visited does not exist."
            }, {
                extra: _withCtx(()=>[
                        _createVNode(_component_a_button, {
                            onClick: $setup.goHome
                        }, {
                            default: _withCtx(()=>_cache[0] || (_cache[0] = [
                                    _createTextVNode("Back Home")
                                ])),
                            _: 1
                        }, 8, [
                            "onClick"
                        ])
                    ]),
                _: 1
            })
        ]));
    }
    _404 = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-cb3fb815"
        ]
    ]);
});
export { _404 as default, __tla };
