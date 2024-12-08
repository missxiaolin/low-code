import _ from 'lodash'
import Index from '../../../controller/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const indexController = new Index()

// 获取左边菜单栏
const getAdmColum = RouterConfigBuilder.routerConfigBuilder('/adm/get/colum', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.getColum(req, res)
}, true)

// 微前端配置
const getMicro = RouterConfigBuilder.routerConfigBuilder('/adm/get/micro', RouterConfigBuilder.METHOD_TYPE_GET, (req, res) => {
    return indexController.getMicro(req, res)
}, true)

export default {
    ...getAdmColum,
    ...getMicro
}