import Token from '../library/utils/token'
import API_RES from '../constants/api_res'

/**
 * login 中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function login(req, res, next) {
    let token = req.get('Authorization') || ""
    if (!token) {
        res.send(API_RES.needLoginIn());
        return
    }
    let data = Token.decrypt(token)
    if (data.token) {
        next()
    } else {
        res.send(API_RES.needLoginIn());
        return
    }
}

export default login