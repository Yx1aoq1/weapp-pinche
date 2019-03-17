let app = getApp()
import wxCloud from '../../utils/wxCloud'

Page({
  bindGetUserInfo (e) {
    app.globalData.userInfo = e.detail.userInfo
    
    wx.navigateBack({
      delta: 1
    })
  }
})