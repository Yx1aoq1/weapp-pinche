import Util from '../../../utils/util'
import wxCloud from '../../../utils/wxCloud'

const now = new Date()
const weekLater = new Date(+now + 1000 * 60 * 60 * 24 * 7)
const minDate = Util.formatTime(now, 'yyyy-MM-dd')
const maxDate = Util.formatTime(weekLater, 'yyyy-MM-dd')
const TYPE = {
  'FIND_MAN': '找人',
  'FIND_CAR': '找车'
}

Page({
  data: {
    tabs: [{
      name: "全部",
      key: "ALL"
    }, {
      name: "找人",
      key: "FIND_MAN"
    }, {
      name: "找车",
      key: "FIND_CAR"
    }],
    searchForm: {
      start: '',
      over: '',
      date: '',
      type: 'ALL'
    },
    orderList: [],
    minDate: minDate,
    maxDate: maxDate
  },

  onLoad (options) {
    this.getOrders()
  },

  getOrders () {
    this.debug(this.data.searchForm)
    wxCloud('getOrders', this.data.searchForm).then(res => {
      this.setData({
        orderList: res.data
      })
    })
  },

  debug (event) {
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
    console.log(filter)
    console.log(event)
  },

  bindTabChange (e) {
    this.setData({
      'searchForm.type': e.detail.key
    })
    this.getOrders()
  },

  bindDateChange (e) {
    this.setData({
      'searchForm.date': e.detail.value
    })
    this.getOrders()
  }
})