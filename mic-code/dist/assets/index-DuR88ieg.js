import { _export_sfc, importShared, useGeneralStore, useRoute, useRouter, __tla as __tla_0 } from './index-DI9_lGZc.js';
let index;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const remotesMap = {};
    const loadJS = async (url, fn)=>{
        const resolvedUrl = typeof url === 'function' ? await url() : url;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = fn;
        script.src = resolvedUrl;
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    function merge(obj1, obj2) {
        const mergedObj = Object.assign(obj1, obj2);
        for (const key of Object.keys(mergedObj)){
            if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                mergedObj[key] = merge(mergedObj[key], obj2[key]);
            }
        }
        return mergedObj;
    }
    const wrapShareModule = (remoteFrom)=>{
        return merge({
            __rf_placeholder__shareScope
        }, (globalThis.__federation_shared__ || {})['default'] || {});
    };
    async function __federation_method_ensure(remoteId) {
        const remote = remotesMap[remoteId];
        if (!remote.inited) {
            if ('var' === remote.format) {
                return new Promise((resolve)=>{
                    const callback = ()=>{
                        if (!remote.inited) {
                            remote.lib = window[remoteId];
                            remote.lib.init(wrapShareModule(remote.from));
                            remote.inited = true;
                        }
                        resolve(remote.lib);
                    };
                    return loadJS(remote.url, callback);
                });
            } else if ([
                'esm',
                'systemjs'
            ].includes(remote.format)) {
                return new Promise((resolve, reject)=>{
                    const getUrl = typeof remote.url === 'function' ? remote.url : ()=>Promise.resolve(remote.url);
                    getUrl().then((url)=>{
                        import(url).then(async (m)=>{
                            await m.__tla;
                            return m;
                        }).then((lib)=>{
                            if (!remote.inited) {
                                const shareScope = wrapShareModule(remote.from);
                                lib.init(shareScope);
                                remote.lib = lib;
                                remote.lib.init(shareScope);
                                remote.inited = true;
                            }
                            resolve(remote.lib);
                        }).catch(reject);
                    });
                });
            }
        } else {
            return remote.lib;
        }
    }
    function __federation_method_unwrapDefault(module) {
        return (module?.__esModule || module?.[Symbol.toStringTag] === 'Module') ? module.default : module;
    }
    function __federation_method_getRemote(remoteName, componentName) {
        return __federation_method_ensure(remoteName).then((remote)=>remote.get(componentName).then((factory)=>factory()));
    }
    function __federation_method_setRemote(remoteName, remoteConfig) {
        remotesMap[remoteName] = remoteConfig;
    }
    const { onMounted, ref, watch } = await importShared('vue');
    const _sfc_main = {
        setup (props) {
            const generalStore = useGeneralStore();
            const component = ref("");
            const route = useRoute();
            const router = useRouter();
            let projectId = generalStore.currentProjectId;
            const load = ()=>{
                __federation_method_setRemote("lowCode", {
                    url: async ()=>{
                        return Promise.resolve("http://remote.missxiaolin.com/assets/remoteEntry.js").catch((e)=>{
                            console.log(e);
                        });
                    },
                    format: "esm",
                    from: "vite"
                });
            };
            generalStore.$subscribe((mutation, state)=>{
                if (state.currentProjectId == projectId || !state.currentProjectId) return;
                projectId = state.currentProjectId;
                load();
            });
            const init = async ()=>{
                try {
                    const moduleWraped = await __federation_method_getRemote("lowCode", `${route.path}`);
                    component.value = __federation_method_unwrapDefault(moduleWraped);
                } catch (error) {
                    if (error.toString() && error.toString().indexOf("Can not find remote module") > -1) {
                        router.push("/404");
                        return;
                    }
                }
            };
            watch(route, ()=>{
                init();
            });
            onMounted(()=>{
                load();
                init();
            });
            return {
                component
            };
        }
    };
    const { resolveDynamicComponent: _resolveDynamicComponent, openBlock: _openBlock, createBlock: _createBlock, createCommentVNode: _createCommentVNode } = await importShared('vue');
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return ($setup.component) ? (_openBlock(), _createBlock(_resolveDynamicComponent($setup.component), {
            key: 0
        })) : _createCommentVNode("", true);
    }
    index = _export_sfc(_sfc_main, [
        [
            'render',
            _sfc_render
        ]
    ]);
});
export { index as default, __tla };
