const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'test-demo-8411ac'
})

const db = cloud.database()

//npm install --save wx-server-sdk@latest

const TYPE = {
  'FIND_MAN': '找人',
  'FIND_CAR': '找车'
}

function getFilterOrders (filter, context) {
  return db.collection('orders').where(filter).get().then(res => {
    return {
      success: true,
      msg: 'success',
      data: res.data
    }
  }).catch(err => {
    return Promise.reject({
      msg: err.errMsg || JSON.stringify(err),
      success: false
    })
  })
}

function getAllOrders () {
  return db.collection('orders').get().then(res => {
    return {
      success: true,
      msg: 'success',
      data: res.data
    }
  }).catch(err => {
    return Promise.reject({
      msg: err.errMsg || JSON.stringify(err),
      success: false
    })
  })
}

exports.main = async (event, context) => {
  let filter = {}
  for (let key in event) {
    if (!['over', 'start', 'type', 'date', '_openid'].includes(key)) continue
    if (!event[key]) continue
    if (key === 'type') {
      if (event.type === 'ALL') continue
      filter[key] = TYPE[event[key]]
    } else {
      filter[key] = event[key]
    }
  }
  if (Object.keys(filter).length === 0) {
    return await getAllOrders()
  } else {
    return await getFilterOrders(filter)
  }
}