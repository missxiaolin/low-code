const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/menu-DpKcd6ZN.js","assets/index-DI9_lGZc.js","assets/runtime-core.esm-bundler-CRooAsae.js","assets/index-CwxY-jLF.css","assets/menu-D6RbagQY.css","assets/header-nilyZlm_.js","assets/header-X_tPzXHQ.css","assets/main-BZwLacCc.js","assets/main-SYTKtOiS.css"])))=>i.map(i=>d[i]);
import { _export_sfc, importShared, __vitePreload, __tla as __tla_0 } from './index-DI9_lGZc.js';
let index;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const { defineAsyncComponent } = await importShared('vue');
    const _sfc_main = {
        components: {
            routeMenu: defineAsyncComponent(()=>__vitePreload(()=>import('./menu-DpKcd6ZN.js').then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), true ? __vite__mapDeps([0,1,2,3,4]) : void 0)),
            routeHeader: defineAsyncComponent(()=>__vitePreload(()=>import('./header-nilyZlm_.js').then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), true ? __vite__mapDeps([5,1,2,3,6]) : void 0)),
            routeMain: defineAsyncComponent(()=>__vitePreload(()=>import('./main-BZwLacCc.js').then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), true ? __vite__mapDeps([7,1,2,3,8]) : void 0))
        },
        setup () {}
    };
    const { resolveComponent: _resolveComponent, createVNode: _createVNode, withCtx: _withCtx, createElementVNode: _createElementVNode, openBlock: _openBlock, createBlock: _createBlock } = await importShared('vue');
    const _hoisted_1 = {
        class: "layouts-right"
    };
    const _hoisted_2 = {
        class: "layouts-main"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_route_menu = _resolveComponent("route-menu");
        const _component_a_layout = _resolveComponent("a-layout");
        const _component_route_header = _resolveComponent("route-header");
        const _component_route_main = _resolveComponent("route-main");
        return (_openBlock(), _createBlock(_component_a_layout, {
            class: "layouts"
        }, {
            default: _withCtx(()=>[
                    _createVNode(_component_a_layout, {
                        class: "menu"
                    }, {
                        default: _withCtx(()=>[
                                _createVNode(_component_route_menu)
                            ]),
                        _: 1
                    }),
                    _createElementVNode("div", _hoisted_1, [
                        _createVNode(_component_route_header),
                        _createElementVNode("div", _hoisted_2, [
                            _createVNode(_component_route_main)
                        ])
                    ])
                ]),
            _: 1
        }));
    }
    index = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-d5a6641d"
        ]
    ]);
});
export { index as default, __tla };
