function formatTime (date, format) {
  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'H+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

function isError (isError, message, that) {
  that.setData({
    showTopTips: isError,
    errorMsg: message
  })
}

function clearError (that) {
  that.setData({
    showTopTips: false,
    errorMsg: ''
  })
}

function isEmpty(object) {
  try {
    for(let item of object) return false
  } catch (e) {
    return true
  }
  return true
}

module.exports = {
  formatTime,
  isError,
  clearError,
  isEmpty
}
