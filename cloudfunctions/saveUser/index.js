const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'test-demo-8411ac'
})

const db = cloud.database()

function saveUser (event, context) {
  const {OPENID} = cloud.getWXContext()
  let isRepeat = false
  let id = ''
  db.collection('users').where({
    _openid: OPENID
  }).get().then(res => {
    if (res.data.length !== 0) {
      isRepeat = true
      id = res.data._id
    }
  })
  if (isRepeat) {
    return updateUser(id, event, context)
  } else {
    return addUser(event, context)
  }
}

function updateUser (id, event, context) {
  return db.collection('users').doc(id).update({
    avatarUrl: event.avatarUrl,
    
  })
}

exports.main = async (event, context) => {
  return await saveUser(event, context)
}