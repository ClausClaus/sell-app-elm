/**
 *
 * 解析Url参数
 * @example ?id=123&a=b
 * @return Object{id:123,a:b}
 * @export
 */

export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=123','&a=b'];
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]); // --> id
      let val = decodeURIComponent(tempArr[1]); // --> 123
      obj[key] = val;
    });
  }
  return obj;
}
