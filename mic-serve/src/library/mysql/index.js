import knex from 'knex'
import Logger from '../logger'
import dotenv from "dotenv";
const appConfig = dotenv.config().parsed;

const Knex = knex({
    client: 'mysql',
    connection: {
        host: appConfig.MYSQL_HOST,
        port: appConfig.MYSQL_PORT,
        database: appConfig.MYSQL_DATABASE,
        user: appConfig.MYSQL_USER,
        password: appConfig.MYSQL_PASSWORD
    },
    debug: false,
    pool: {
        max: 10,
        min: 0,
        // 由于存在资源池, 导致句柄不被释放, 程序不能退出
        // 因此将最小句柄数设为0, 每100ms检查一次是否有超过120ms未被使用的资源
        // 以便句柄的及时回收
        // free resouces are destroyed after this many milliseconds
        idleTimeoutMillis: 100,
        // how often to check for idle resources to destroy
        reapIntervalMillis: 150
    },
    acquireConnectionTimeout: 60000,
    log: {
        error(message) {
            Logger.info(`数据库操作异常 => ${message}`)
        }
    }
})

export default Knex