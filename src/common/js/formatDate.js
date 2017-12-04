/**
 *
 * @export
 * @param {any} date = Sat Jul 23 2016 16:19:24 GMT+0800 (中国标准时间)
 * @param {any} formatStr = 'YYYY-MM-DD', 'hh:mm'
 */
export default function formatDate(date, formatStr) {
  if (/(Y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    // 返回年 :'2016-mm-dd', 'hh:mm'
  }
  // 定义通用的匹配模式
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
// RegExp.$1.length 代表的是MM、dd、ss 这些
  for (var k in o) {
    if (new RegExp(`(${k})`).test(formatStr)) {
      let str = o[k] + '';
      formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return formatStr; // 2016-07-23
}

/**
 * str = '09'吗？ '00' + 09 = ‘0009’.substr(2) = 09;
 *  这里的str有可能超过2位数，都需要进行格式化
 * @param {any} str
 * @returns
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
