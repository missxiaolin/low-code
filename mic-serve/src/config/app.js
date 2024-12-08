/**
 * === app config ===
 * 项目应用的配置
 * 
 */

import env from './env'
import path from 'path'

const production = {
    proxy: false,
    absoluteLogPath: path.resolve(__dirname, '../', 'log')
}

// 下面的特定环境可以深度合并到上面的默认环境
// 线上环境是上面的默认环境，不要乱改哦

// 开发环境配置
const development = {
    proxy: false,
    absoluteLogPath: path.resolve(__dirname, '../', 'log')
}
// 测试环境配置
const testing = {
    proxy: false,
    absoluteLogPath: path.resolve(__dirname, '../', 'log')
}

let config = {
    development,
    testing,
    production
}

export default config[env]