import dotenv from "dotenv";
const appConfig = dotenv.config().parsed;

/**
 *  === env config ===
 *  环境配置
 *
 */

// 环境变量值=>
// development
// testing
// production
let env = appConfig['NODE_ENV'] || 'development'
export default env
