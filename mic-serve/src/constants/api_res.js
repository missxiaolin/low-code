/**
 * 返回参数
 * @param {*} data 
 * @param {*} success 
 * @param {*} errorMessage 
 */
function showResult(data, success = true, errorMessage = '', errorCode = null) {
    return {
        success,
        model: data,
        errorMessage,
        errorCode
    }
}

/**
 * 返回错误消息
 * @param {*} errorMessage
 * @param {*} errorCode
 * @param {*} data
 * @param {*} action
 */
function showError(errorMessage = '', errorCode = 10000, data = {}) {
    return showResult(data, false, errorMessage, errorCode)
}

/**
 * @param {*} msg 
 * @returns 
 */
function needLoginIn(msg = '请先登录') {
    return showResult({}, false, msg, 10000)
}

export default {
    showResult,
    showError,
    needLoginIn
}