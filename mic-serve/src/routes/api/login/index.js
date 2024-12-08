import _ from 'lodash'
import Index from '../../../controller/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const indexController = new Index()

// 登录
const login = RouterConfigBuilder.routerConfigBuilder('/adm/login', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.login(req, res)
}, false)


export default {
    ...login,
}