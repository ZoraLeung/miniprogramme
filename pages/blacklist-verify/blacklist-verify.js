// blacklist-verify.js
Page({
  data: {
    verifyStatus: 'pending', // pending, verifying, passed, failed
    verifyMessage: '',
    progress: 0
  },

  onLoad: function (options) {
    this.startVerify();
  },

  startVerify: function() {
    this.setData({
      verifyStatus: 'verifying',
      verifyMessage: '正在进行黑名单校验...'
    });

    this.animateProgress();
  },

  animateProgress: function() {
    const timer = setInterval(() => {
      if (this.data.progress >= 100) {
        clearInterval(timer);
        this.completeVerify();
        return;
      }
      
      this.setData({
        progress: this.data.progress + 2
      });
    }, 50);
  },

  completeVerify: function() {
    // 模拟校验结果
    const isBlacklisted = Math.random() > 0.9; // 10%概率在黑名单中
    
    setTimeout(() => {
      this.setData({
        verifyStatus: isBlacklisted ? 'failed' : 'passed',
        verifyMessage: isBlacklisted ? 
          '很抱歉，您在黑名单中，无法继续报名' : 
          '黑名单校验通过，可以继续报名'
      });

      // 存储校验结果
      wx.setStorageSync('blacklistVerifyResult', {
        isBlacklisted: isBlacklisted,
        verifyTime: new Date().toISOString()
      });
      
    }, 1000);
  },

  continueNext: function() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
})