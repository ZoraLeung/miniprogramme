// index.js
Page({
  data: {
    
  },

  onLoad: function (options) {
    
  },

  startRegistration: function() {
    wx.navigateTo({
      url: '/pages/phone-auth/phone-auth'
    })
  }
})