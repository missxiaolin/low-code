// mysql 配置。 mysql 使用参见 https://dev.mysql.com/doc/refman/8.0/en/
import env from './env'

// 下面的特定环境可以深度合并到上面的默认环境
// 线上环境是上面的默认环境，不要乱改哦

// 开发环境配置
const development = {
    hosts: ["amqp://localhost"],
    index: 0,
}
// 测试环境配置
const testing = development

// 线上环境
const production = testing

let config = {
    development,
    testing,
    production
}

export default config[env]
