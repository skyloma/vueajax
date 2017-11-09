
let util = {
 // theme: "light",
  date: {}
}

util.title = function (title, sub) {
  sub = sub ? ' - ' + sub : ''
  title = title ? title + sub : '项目开发管理平台'
  window.document.title = title
}

util.date.formatDate = function (date, type) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  let dateStr = ''
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  dateStr = y + '-' + m + '-' + d
  if (type === 'datetime') {
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let M = date.getMinutes()
    M = M < 10 ? ('0' + M) : M
    let s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    dateStr += ' ' + h + ':' + M + ':' + s
  }
  return dateStr
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}
