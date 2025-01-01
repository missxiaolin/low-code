import { _export_sfc, importShared, useGeneralStore, __tla as __tla_0 } from './index-DI9_lGZc.js';
let main;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const { computed } = await importShared('vue');
    const generalStore = useGeneralStore();
    const _sfc_main = {
        setup () {
            const isManualRefresht = computed(()=>{
                return generalStore.getManualRefresh;
            });
            return {
                isManualRefresht
            };
        }
    };
    const { resolveComponent: _resolveComponent, createVNode: _createVNode, openBlock: _openBlock, createElementBlock: _createElementBlock, createCommentVNode: _createCommentVNode } = await importShared('vue');
    const _hoisted_1 = {
        key: 0,
        class: "main-app"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_router_view = _resolveComponent("router-view");
        return (!$setup.isManualRefresht) ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _createVNode(_component_router_view)
        ])) : _createCommentVNode("", true);
    }
    main = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-758f1d40"
        ]
    ]);
});
export { main as default, __tla };
