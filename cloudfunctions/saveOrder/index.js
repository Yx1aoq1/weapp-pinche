const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'test-demo-8411ac'
})

const db = cloud.database()

function addOrder (event, context) {
  const {OPENID} = cloud.getWXContext()
  return db.collection('orders').add({
    data: {
      name: event.name, // 姓名
      sex: event.sex, // 性别
      phone: event.phone, // 手机
      type: event.type, // 拼车类型
      start: event.start, // 出发地
      over: event.over, // 目的地
      date: event.date, // 日期
      time: event.time, // 时间
      price: event.price, // 价格
      carType: event.carType, // 车型
      surplus: event.surplus, // 空位
      desc: event.desc, // 说明
      createTime: new Date(), // 创建时间
      updateTime: new Date(), // 更新
      _openid: OPENID,
      createUserInfo: event.createUserInfo
    }
  }).then(res => {
    return {
      msg: 'success',
      success: true,
      data: res._id
    }
  }).catch(err => {
    return Promise.reject({
      msg: err.errMsg || JSON.stringify(err),
      success: false
    })
  })
}

function updateOrder (event, context) {
  const {OPENID} = cloud.getWXContext()
  return db.collection('orders').doc(event.id).update({
    data: {
      name: event.name, // 姓名
      sex: event.sex, // 性别
      phone: event.phone, // 手机
      type: event.type, // 拼车类型
      start: event.start, // 出发地
      over: event.over, // 目的地
      date: event.date, // 日期
      time: event.time, // 时间
      price: event.price, // 价格
      carType: event.carType, // 车型
      surplus: event.surplus, // 空位
      desc: event.desc, // 说明
      updateTime: new Date(),
      _openid: OPENID,
      createUserInfo: event.createUserInfo
    }
  }).then(res => {
    return {
      msg: 'success',
      success: true,
      data: res._id
    }
  }).catch(err => {
    return Promise.reject({
      msg: err.errMsg || JSON.stringify(err),
      success: false
    })
  })
}

exports.main = async (event, context) => {
  if (event.id) {
    return await updateOrder(event, context)
  } else {
    return await addOrder(event, context)
  }
}