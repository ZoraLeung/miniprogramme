// registration-queue.js
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
  
  // 加入排队
  joinQueue: function() {
    wx.showLoading({
      title: '加入排队中...'
    });
    
    // 模拟加入排队过程
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showModal({
        title: '加入排队成功',
        content: '您已成功加入排队，一旦有名额释放，我们将立即为您报名并发送通知。',
        showCancel: false,
        confirmText: '知道了',
        success: (res) => {
          if (res.confirm) {
            // 可以跳转到排队状态页面或返回首页
            this.backToHome();
          }
        }
      });
    }, 2000);
  },
  
  // 取消报名
  cancelRegistration: function() {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消报名吗？信息将不会录入系统。',
      confirmText: '确认取消',
      cancelText: '继续等待',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的报名信息
          wx.removeStorageSync('registrationData');
          
          wx.showToast({
            title: '已取消报名',
            icon: 'success',
            duration: 2000
          });
          
          setTimeout(() => {
            this.backToHome();
          }, 2000);
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