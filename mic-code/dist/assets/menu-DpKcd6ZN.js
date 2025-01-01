import { request, _export_sfc, importShared, useGeneralStore, useRouter, useRoute, __tla as __tla_0 } from './index-DI9_lGZc.js';
let menu;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const initRoute = [];
    function projectMenuRouteAll(data) {
        return request({
            url: "/adm/project/menu/route/all",
            method: "post",
            data
        });
    }
    const routeFormat = (data)=>{
        let arr = data.map((item)=>{
            let obj = {
                key: item.id,
                label: item.name,
                path: item.path
            };
            if (item.type === 1 && item.children && item.children.length > 0) {
                obj.children = routeFormat(item.children);
            }
            return obj;
        });
        return arr;
    };
    const { onMounted, ref, watch } = await importShared('vue');
    const _sfc_main = {
        setup () {
            const generalStore = useGeneralStore();
            const router = useRouter();
            const route = useRoute();
            let path = route.path;
            let openKeys = ref([]);
            let selectedKeys = ref([]);
            let items = ref([]);
            let projectId = generalStore.currentProjectId;
            items.value = items.value.concat(initRoute);
            const init = ()=>{
                items.value.forEach((item)=>{
                    if (item.path === path) {
                        openKeys.value = [
                            item.key
                        ];
                        selectedKeys.value = [
                            item.key
                        ];
                        return;
                    }
                    if (item.children) {
                        item.children.forEach((child)=>{
                            if (child.path === path) {
                                openKeys.value = [
                                    item.key
                                ];
                                selectedKeys.value = [
                                    child.key
                                ];
                            }
                        });
                    }
                });
            };
            const handleClick = (e)=>{
                if (e.keyPath.length === 1) {
                    openKeys.value = [];
                    selectedKeys.value = [
                        e.keyPath[0]
                    ];
                }
                if (e.keyPath.length === 2) {
                    openKeys.value = [
                        e.keyPath[0]
                    ];
                    selectedKeys.value = [
                        e.keyPath[1]
                    ];
                }
                const item = e.item;
                if (item.path) {
                    router.push(item.path);
                }
            };
            watch(()=>route.path, (newPath)=>{
                openKeys.value = [];
                selectedKeys.value = [];
                path = newPath;
                init();
            }, {
                immediate: true
            });
            generalStore.$subscribe((mutation, state)=>{
                if (state.currentProjectId == projectId || !state.currentProjectId) return;
                projectId = state.currentProjectId;
                items.value = [].concat(initRoute);
                getRoutes();
            });
            const getRoutes = async ()=>{
                let res = await projectMenuRouteAll({
                    projectId: projectId
                });
                if (!res.success) return;
                let arr = routeFormat(res.model);
                items.value = items.value.concat(arr);
            };
            onMounted(async ()=>{
                await getRoutes();
                init();
            });
            return {
                openKeys,
                selectedKeys,
                handleClick,
                items
            };
        }
    };
    const { createElementVNode: _createElementVNode, resolveComponent: _resolveComponent, createVNode: _createVNode, openBlock: _openBlock, createElementBlock: _createElementBlock } = await importShared('vue');
    const _hoisted_1 = {
        class: "menu-d"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_a_menu = _resolveComponent("a-menu");
        return (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _cache[0] || (_cache[0] = _createElementVNode("div", {
                class: "menu-title"
            }, "Low Code", -1)),
            _createVNode(_component_a_menu, {
                mode: "inline",
                onSelect: $setup.handleClick,
                items: $setup.items,
                "open-keys": $setup.openKeys,
                selectedKeys: $setup.selectedKeys,
                "inline-collapsed": false
            }, null, 8, [
                "onSelect",
                "items",
                "open-keys",
                "selectedKeys"
            ])
        ]));
    }
    menu = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ],
        [
            '__scopeId',
            "data-v-393b32b5"
        ]
    ]);
});
export { menu as default, __tla };
