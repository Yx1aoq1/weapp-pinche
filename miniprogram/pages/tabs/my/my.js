var app = getApp()

Page({
  data: {
    version: app.globalData.version,
    userInfo: {}
  },

  onLoad: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo().then(userInfo => {
      //更新数据
      this.setData({
        userInfo
      })
    })
  }
})