// registration-failed.js
Page({
  data: {
    registrationId: ''
  },
  
  onLoad: function (options) {
    // 获取报名编号
    const registrationId = options.id || wx.getStorageSync('registrationId');
    this.setData({
      registrationId: registrationId
    });
  },
  
  // 关闭小程序
  closeApp: function() {
    wx.showModal({
      title: '确认关闭',
      content: '确定要关闭小程序吗？',
      success: (res) => {
        if (res.confirm) {
          // 小程序无法主动关闭，只能提示用户
          wx.showToast({
            title: '请手动关闭小程序',
            icon: 'none',
            duration: 3000
          });
          
          // 或者返回首页
          setTimeout(() => {
            this.backToHome();
          }, 3000);
        }
      }
    });
  },
  
  // 返回首页
  backToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  }
});