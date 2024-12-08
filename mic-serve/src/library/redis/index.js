import Redis from 'ioredis'
import _ from 'lodash'
import Logger from '../logger'
import dotenv from "dotenv";

const appConfig = dotenv.config().parsed;

/**
 * @via(@xiaolin)
 * 原生Redis有这么几个问题
 * 1. 命令没有参数提示
 * 2. 连接Redis后不会自动断开, 导致程序无法正常退出
 * 因此, 在这里手工对ioredis进行了一次手工封装, 添加参数提示和链接自动断开逻辑, 方便使用
 * 目前只用到了setex和get方法, 后续有需要可以再添加
 */
class RedisClient {
    /**
     * 初始化
     * @param {*} isTest 
     */
    constructor(isTest = false) {
        this.redisClient = new Redis({
            port: appConfig.REDIS_PORT,
            host: appConfig.REDIS_HOST,
            password: appConfig.REDIS_PASSWORD || "",
            retryStrategy: (hasRetryTimes) => {
                // 关闭自动重连功能
                return false
            },
            lazyConnect: true, // 初始化时不能连接Redis Server, 否则会因为无法断开连接, 导致npm run start命令不能退出
            showFriendlyErrorStack: true
        })
        this.isTest = isTest
        // 利用debounce限制当连接空闲1s以上时, 自动断开链接, 避免由于持有连接句柄导致进程无法退出
        this._debounceDisconnect = _.debounce(async () => {
            if (this.checkIsConnected() == true) {
                await this.redisClient.disconnect()
                this._log(`disconnect success! now connect status change to => ${this.hasConnected}`)
            }
        }, 1 * 1000)
    }

    /**
     * 判断是否连接
     * @return {?}
     */
    checkIsConnected() {
        let isConnected = _.get(this.redisClient, ['connector', 'connecting'], false)
        return isConnected
    }

    /**
     * 自动重连
     * @return {?}
     */
    async _autoConnect() {
        this._log('connect: this.hasConnected =>', this.hasConnected)
        if (this.checkIsConnected() === false) {
            await this.redisClient.connect()
            this._log(`connect success! now connect status change to => ${this.hasConnected}`)
        }
    }

    /**
     * 自动断开
     * @return {?}
     */
    async _autoDisconnect() {
        await this._debounceDisconnect()
    }

    /**
     * 打印日志
     * @return {?}
     */
    _log() {
        if (this.isTest) {
            Logger.log(...arguments)
        }
    }

    /**
     * 获取key
     * @param {*} key 
     */
    async asyncGet(key) {
        await this._autoConnect()
        let resultJson = await this.redisClient.get(key).catch(e => {
            Logger.log('Redis异常=>')
            Logger.log(e)
            return ''
        })
        await this._autoDisconnect()
        return result
    }

    /**
     * 设值
     * @param {*} key 
     * @param {*} expire 
     * @param {*} value 
     */
    async asyncSetex(key, expire, value) {
        this._autoConnect()
        let valueJSON = JSON.stringify(value)
        let result = await this.redisClient.setex(key, expire, valueJSON).catch(e => {
            Logger.log('Redis异常=>')
            Logger.log(e)
        })
        await this._autoDisconnect()
        return result
    }

}

let client = new RedisClient()

export default client