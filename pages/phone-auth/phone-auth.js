// phone-auth.js
Page({
  data: {
    
  },
  
  onLoad: function (options) {
    console.log('手机号授权页加载');
  },
  
  // 获取手机号授权
  getPhoneNumber: function(e) {
    console.log('手机号授权结果:', e.detail);
    
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 授权成功
      wx.setStorageSync('phoneAuthResult', {
        success: true,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        timestamp: Date.now()
      });
      
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 1500
      });
      
      // 延迟跳转到岗位保护查询页
      setTimeout(() => {
        this.goToNextStep();
      }, 1500);
      
    } else {
      // 授权失败
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000
      });
    }
  },
  
  // 跳转到下一步
  goToNextStep: function() {
    wx.navigateTo({
      url: '/pages/position-check/position-check'
    });
  }
});