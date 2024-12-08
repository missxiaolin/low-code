import API_RES from '../constants/api_res'

/**
 * 基础Base类
 */
 export default class Base {
    /**
     * 发送
     * @param {*} res 
     * @param {*} data 
     * @param {*} success 
     * @param {*} errorMessage 
     * @param {*} errorCode
     */
    send(res, data, success = true, errorMessage = "", errorCode = "") {
        return res.send(API_RES.showResult(data, success, errorMessage, errorCode))
    }
}