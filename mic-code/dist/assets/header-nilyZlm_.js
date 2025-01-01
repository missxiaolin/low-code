import { _export_sfc, importShared, useGeneralStore, __tla as __tla_0 } from './index-DI9_lGZc.js';
let header;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const { ref, watch, computed, getCurrentInstance, nextTick } = await importShared('vue');
    const generalStore = useGeneralStore();
    const _sfc_main = {
        name: "header-animat",
        setup () {
            const handleManualRefresh = ()=>{
                generalStore.setManualRefresh();
            };
            const currentProjectId = ref(Number(generalStore.getCurrentProjectId));
            const projectList = computed(()=>{
                const list = generalStore.getProjectList;
                let arr = [];
                list.forEach((item)=>{
                    arr.push({
                        label: item.name,
                        value: item.id
                    });
                });
                return arr;
            });
            const handleProjectChange = (value)=>{
                generalStore.setCurrentProject(value);
                nextTick(()=>{
                    handleManualRefresh();
                });
            };
            return {
                currentProjectId,
                projectList,
                handleProjectChange
            };
        }
    };
    const { createElementVNode: _createElementVNode, resolveComponent: _resolveComponent, createVNode: _createVNode, withCtx: _withCtx, openBlock: _openBlock, createElementBlock: _createElementBlock } = await importShared('vue');
    const _hoisted_1 = {
        class: "header-animat"
    };
    const _hoisted_2 = {
        class: "header-animat-right"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_UserOutlined = _resolveComponent("UserOutlined");
        const _component_a_avatar = _resolveComponent("a-avatar");
        return (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _cache[1] || (_cache[1] = _createElementVNode("div", null, null, -1)),
            _createElementVNode("div", _hoisted_2, [
                _createVNode(_component_a_avatar, {
                    class: "header-animat-avatar",
                    size: 22
                }, {
                    icon: _withCtx(()=>[
                            _createVNode(_component_UserOutlined)
                        ]),
                    _: 1
                }),
                _cache[0] || (_cache[0] = _createElementVNode("div", {
                    class: "header-animat-username"
                }, "admin", -1))
            ])
        ]));
    }
    header = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-6ab21b0c"
        ]
    ]);
});
export { header as default, __tla };
