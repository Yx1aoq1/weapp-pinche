import Util from '../../../utils/util'
import wxCloud from '../../../utils/wxCloud'

const now = new Date()
const weekLater = new Date(+now + 1000 * 60 * 60 * 24 * 7)
const minDate = Util.formatTime(now, 'yyyy-MM-dd')
const maxDate = Util.formatTime(weekLater, 'yyyy-MM-dd')
const nowTime = Util.formatTime(now, 'HH:mm')

let app = getApp()

Page({
  data: {
    id: '',
    editForm: {
      id: '', // id
      name: '', // 姓名
      sex: '', // 性别
      phone: '', // 手机
      type: '', // 拼车类型
      start: '', // 出发地
      over: '', // 目的地
      date: '', // 日期
      time: '', // 时间
      price: '', // 价格
      carType: '', // 车型
      surplus: '', // 空位
      desc: '', // 说明
      createUserInfo: '', // 创建人信息
    },
    sexPicker: ['男', '女'],
    typePicker: ['找人', '找车'],
    sitPicker: [1, 2, 3, 4, 5, 6],
    minDate,
    maxDate,
    showTopTips: '',
    errorMsg: ''
  },

  onLoad (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    } else {
      this.setData({
        'editForm.date': minDate,
        'editForm.time': nowTime
      })
    }
    this.setData({
      'editForm.createUserInfo': app.globalData.userInfo
    })
    console.log(this.data.editForm)
  },

  bindSexChange (e) {
    this.setData({
      'editForm.sex': this.data.sexPicker[e.detail.value]
    })
  },

  bindTypeChange (e) {
    this.setData({
      'editForm.type': this.data.typePicker[e.detail.value]
    })
  },

  bindDateChange (e) {
    this.setData({
      'editForm.date': e.detail.value
    })
  },

  bindTimeChange (e) {
    this.setData({
      'editForm.time': e.detail.value
    })
  },

  bindSurplusChange (e) {
    this.setData({
      'editForm.surplus': this.data.sitPicker[e.detail.value]
    })
  },

  bindSubmit (e) {
    const data = e.detail.value
    if (!this.vaildForm(data.name, [{required: true, message: '请输入姓名'}])) return
    if (!this.vaildForm(data.sex, [{required: true, message: '请选择性别'}])) return
    if (!this.vaildForm(data.phone, [{type: 'phone', message: '请输入正确的手机号'}])) return
    if (!this.vaildForm(data.type, [{required: true, message: '请选择拼车类型'}])) return
    if (!this.vaildForm(data.start, [{required: true, message: '请选择出发地'}])) return
    if (!this.vaildForm(data.over, [{required: true, message: '请选择目的地'}])) return
    if (!this.vaildForm(data.surplus, [{required: true, message: '请选择剩余空位'}])) return
    data.createUserInfo = this.data.editForm.createUserInfo
    wxCloud('saveOrder', data).then(res => {
      wx.navigateBack({
        delta: 1
      })
    })
    Util.clearError(this)
  },

  vaildForm (value, rules) {
    return rules.reduce((isVaild, item) => {
      let isError = true
      if (item.type === 'phone') {
        isError = /^1[34578]\d{9}$/.test(value)
        Util.isError(!isError, item.message, this)
      }
      if (item.required) {
        isError = value !== ''
        Util.isError(!isError, item.message, this)
      }
      return isVaild && isError
    }, true)
  }
})