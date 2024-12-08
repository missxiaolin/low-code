import API_RES from '../../constants/api_res'

const METHOD_TYPE_GET = 'get'
const METHOD_TYPE_POST = 'post'

/**
 *
 * @param {String} url          接口url
 * @param {String} methodType   接口类型, METHOD_TYPE_GET / METHOD_TYPE_POST
 * @param {Function} func       实际controller函数
 * @param {Boolean} needLogin   是否需要登录
 * @param {Object}
 */
function routerConfigBuilder(url = '/', methodType = METHOD_TYPE_GET, func, needLogin = false) {
    let routerConfig = {}
    routerConfig[url] = {
        methodType,
        func: (req, res, next) => {
            // 封装一层, 统一加上catch代码
            try {
                func(req, res, next)
            } catch(e) {
                res.send(API_RES.showError('服务器错误', 10000, e.stack))
            }
        },
        needLogin
    }
    return routerConfig
}

export default {
    routerConfigBuilder,

    // 方法常量
    METHOD_TYPE_GET,
    METHOD_TYPE_POST
}
