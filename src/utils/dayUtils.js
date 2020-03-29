/**
 * fun description
 * @param {Object} time 传入日期对象
 * @return {string} 返回档期时间标准样式 如：1999-7-16 00：00：00
 * @author clarencekong
 */
export default function dateFormat(time) {
    const date = time || new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()} ${date.getSeconds()}`

}