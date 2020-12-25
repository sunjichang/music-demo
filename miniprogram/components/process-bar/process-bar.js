// components/process-bar/process-bar.js

let movableAreaWidth = 0
let movableViewWidth = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    ready() {
      this._getMovableDis()
      this._bindBGMEvent()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    movableDis: 0,
    process: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(rect => {
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },
    _bindBGMEvent() {
      backgroundAudioManager.onPlay(() => {
        console.log('onPlay')
      })
      backgroundAudioManager.onStop(() => {
        console.log('onPlay')
      })
      backgroundAudioManager.onPause(() => {
        console.log('onPause')
      })
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
        if (typeof backgroundAudioManager.duration != 'undefined') {
          this._setTime()
        } else {
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })
      backgroundAudioManager.onTimeUpdate(() => {
        console.log('onTimeUpdate')
      })
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded')
      })
      backgroundAudioManager.onError(res => {
        console.error(res.errMsg)
        console.error(res.errCode)
        wx.showToast({
          title: `错误${res.errCode}`,
        })
      })
    },
    _setTime() {
      const duration = backgroundAudioManager.duration
      const durationFmt = this._dataFormat(duration)
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
      })
    },
    // 格式化时间
    _dataFormat(sec) {
      // 分钟
      const min = Math.floor(sec / 60)
      sec = Math.floor(sec % 60)
      return {
        'min': this._parse0(min),
        'sec': this._parse0(sec)
      }
    },
    _parse0(sec) {
      return sec < 10 ? `0${sec}`: sec
    }
  }
})
