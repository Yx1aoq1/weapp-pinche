Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    tabs: {
      type: Array,
      value: () => []
    }
  },

  data: {
    activeIndex: 0
  },

  methods: {
    _tabClick (e) {
      this.setData({
        activeIndex: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      this.triggerEvent('tabChange', {key: e.currentTarget.dataset.key})
    }
  }
})