// 统一时间记录格式
const UNIT = {}
UNIT.YEAR = 'year'
UNIT.MONTH = 'month'
UNIT.DAY = 'day'
UNIT.HOUR = 'hour'
UNIT.MINUTE = 'minute'
UNIT.SECOND = 'second'
UNIT.MILLSECOND = 'millsecond' // countType最大支持10位字符串

// 数据展示
const DISPLAY_BY_YEAR = 'YYYY'
const DISPLAY_BY_MONTH = 'YYYY-MM'
const DISPLAY_BY_DAY = 'YYYY-MM-DD'
const DISPLAY_BY_HOUR = 'YYYY-MM-DD HH'
const DISPLAY_BY_MINUTE = 'YYYY-MM-DD HH:mm'
const DISPLAY_BY_SECOND = 'YYYY-MM-DD HH:mm:ss'
const DISPLAY_BY_MILLSECOND = 'YYYY-MM-DD HH:mm:ss.SSS'

export default {

    DISPLAY_BY_YEAR,
    DISPLAY_BY_MONTH,
    DISPLAY_BY_DAY,
    DISPLAY_BY_HOUR,
    DISPLAY_BY_MINUTE,
    DISPLAY_BY_SECOND,
    DISPLAY_BY_MILLSECOND,

    UNIT,
}
