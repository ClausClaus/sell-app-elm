export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    /* 1.0 匹配一个或者多个y,匹配成功后fmt的四个y被分组捕获，使用replace方法将捕获的字符串替换为真正的年份，年份转化为字符串
    之后调用字符串substr方法通过4据减去捕获到的y的个数得到replac方法的第二个参数，从0的位置开始替换。最终返回替换了的年份 */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = o[key] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
/**
 * 根据传入的字符串长度，来分割字符串。
 * 不定义第二个参数，让截取位置从字符串对象的开始位置开始截取
 *
 * @param {any} str
 * @returns
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
