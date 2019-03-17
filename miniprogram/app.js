import Util from './utils/util'

const version = {
	versionCode: 1,
	versionName: '1.0.0',
}

// 云平台环境
wx.cloud.init({
	traceUser: true,
	env: 'test-demo-8411ac'
})

App({

	globalData: {
		version,
		userInfo: null
	},

	onLaunch() {
		this.getUserInfo()
	},

	// 获取登陆用户的信息
	getUserInfo(callback) {
		return new Promise((resolve, reject) => {
			if (this.globalData.userInfo) {
				typeof callback === 'function' && callback(this.globalData.userInfo)
					resolve(this.globalData.userInfo)
			} else {
				wx.login({
					success: () => {
						wx.getUserInfo({
							success: res => {
								this.globalData.userInfo = res.userInfo
								typeof callback === 'function' && callback(this.globalData.userInfo)
								resolve(this.globalData.userInfo)
							},
							fail: () => {
								wx.showModal({
									title: '警告',
									content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
									success: res => {
										if (res.confirm) {
											wx.navigateTo({
												url: '/pages/login/login',
											})
										}
									}
								})
							}
						})
					}
				})
			}
		})
	},

	// 退出
	logout(callback) {
		this.globalData.userInfo = null
		callback && callback(this.globalData)
	}
})