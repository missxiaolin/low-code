import router from '../router/index'
export const isSubMicro = (window).__MICRO_APP_ENVIRONMENT__ || (window).__MICRO_APP_PUBLIC_PATH__; // (window as any).__MICRO_APP_BASE_APPLICATION__;
export const subApp = `micro-vie`; // 子服务名称

export let routeIsOpenBlank = false;

/**
 * @param {*} params 
 * @returns 
 */
const setParams = (params) => {
	return Object.keys(params)
		.map(function (k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
		})
		.join('&');
};

const toJump = (location) => {
	let url = '';
	if (isString(location)) {
		url = location;
	} else {
		const { path, query, params } = location;
		let search = '';
		if (query) {
			search = setParams(query);
		} else if (params) {
			search = setParams(params);
		}

		url = `${path}${search ? '?' + search : ''}`;
	}
	// 模拟a标签跳转
	const a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('style', 'display:none');
	a.setAttribute('target', '_blank');
	document.body.appendChild(a);
	a.click();
	a.parentNode.removeChild(a);
};

const VueRouterOpenBlank = () => {
	try {
		router.push = function push(location) {
			toJump(location);
			return; //routerPush.call(this, location).catch(err => err)
		};
		// 页面是新窗口打开 不监听repalce跳转
		// 兼容主服务下发跳转
		if (!routeIsOpenBlank) {
			router.replace = function replace(location) {
				toJump(location);
				return; //routerPush.call(this, location).catch(err => err)
			};
		}
	} catch (error) {
		console.log('VueRouterOpenBlank error----', error);
	}
};

export const subDispatchNewsToMain = (data = {}) => {
	const { subRoutes = {}, subDispatch = {}, subName = 'vie', forceSend = false, customInfo = {} } = data;
	if (forceSend) {
		window.microApp?.dispatch({ subRoutes, subDispatch, subName, sendTime: Date.now(), customInfo });
	} else {
		window.microApp?.dispatch({ subRoutes, subDispatch, subName, customInfo });
	}
};

// 服务跳转 涉及跳转其他子服务 需要通知主服务
/**
 *
 * @param {*} path: 页面路径
 * @param {*} query: 页面参处
 * @param {*} jump: 页面是否跳转 false: 主服务获取页面 标题 ，true: 获取标题 并 进行页面跳转用于 routerBack()、 /login
 */
export const serviceRouter = ({ fullPath = '/', jump = false, callBack = null }) => {
	if (isSubMicro) {
		// 发送数据至主服务 -->
		subDispatchNewsToMain({ subRoutes: { fullPath, jump, callBack } });
	} else {
		router.push(fullPath);
	}
};

/**
 * @param {*} router 
 */
export const handleMicroData = (router, app) => {
    let routerHasRegister = false;
    window.microApp.addDataListener((data) => {
		// 挂载主应用方法
		if (data.getDomain) {
			// window.microApp.$getDomain = data.getDomain
			// app.provide('$getDomain', data.getDomain)
			// app.config.globalProperties.$getDomain = data.getDomain
		}

        const { path, refresh, openBlank, business = {} } = data;
		routeIsOpenBlank = openBlank;
		if (openBlank && !routerHasRegister) {
			routerHasRegister = true;
			VueRouterOpenBlank();
		}
		if (path && path !== router.currentRoute.value.fullPath) {
			// 页面跳转
			if (routeIsOpenBlank) {
				return router.replace(path);
			}
			router.push(path);
		} else if (refresh) {
			
		}
    })
}