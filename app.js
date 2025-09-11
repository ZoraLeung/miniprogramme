// app.js
App({
  onLaunch: function () {
    // 小程序启动时的处理
    console.log('学员报名系统启动');
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  checkLoginStatus: function() {
    // 检查用户登录状态
    wx.checkSession({
      success: () => {
        console.log('登录状态有效');
      },
      fail: () => {
        console.log('登录状态失效');
        // 可以在这里处理重新登录逻辑
      }
    });
  },

  globalData: {
    userInfo: null,
    registrationData: {} // 存储报名过程中的数据
  }
})