// registration-status.js
Page({
  data: {
    status: 'success', // success, failed_completed, failed_waiting
    statusIcon: '',
    statusClass: '',
    statusTitle: '',
    statusMessage: '',
    countdownTime: '09:59',
    countdownInterval: null,
    remainingSeconds: 600 // 10分钟 = 600秒
  },
  
  onLoad: function (options) {
    // 模拟不同的报名状态，实际项目中应该从服务器获取
    const simulatedStatus = this.getRandomStatus();
    
    // 也可以从参数获取状态
    const status = options.status || simulatedStatus;
    
    this.setData({
      status: status
    });
    
    this.updateStatusDisplay(status);
    
    // 如果是成功状态，启动倒计时
    if (status === 'success') {
      this.startCountdown();
    }
  },
  
  onUnload: function () {
    // 页面卸载时清除定时器
    if (this.data.countdownInterval) {
      clearInterval(this.data.countdownInterval);
    }
  },
  
  // 模拟获取随机状态（用于演示）
  getRandomStatus: function() {
    const statuses = ['success', 'failed_completed', 'failed_waiting'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  },
  
  // 更新状态显示
  updateStatusDisplay: function(status) {
    let icon = '';
    let statusClass = '';
    let title = '';
    let message = '';
    
    switch(status) {
      case 'success':
        icon = '✓';
        statusClass = 'success';
        title = '报名成功';
        message = '请尽快上传缴费截图';
        break;
      case 'failed_completed':
        icon = '✗';
        statusClass = 'failed';
        title = '报名失败';
        message = '名额已满';
        break;
      case 'failed_waiting':
        icon = '⏳';
        statusClass = 'waiting';
        title = '名额暂满';
        message = '可选择排队等待';
        break;
    }
    
    this.setData({
      statusIcon: icon,
      statusClass: statusClass,
      statusTitle: title,
      statusMessage: message
    });
  },
  
  // 开始倒计时
  startCountdown: function() {
    const interval = setInterval(() => {
      let remaining = this.data.remainingSeconds - 1;
      
      if (remaining <= 0) {
        // 倒计时结束
        clearInterval(interval);
        this.handleTimeup();
        return;
      }
      
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      this.setData({
        remainingSeconds: remaining,
        countdownTime: timeString
      });
    }, 1000);
    
    this.setData({
      countdownInterval: interval
    });
  },
  
  // 倒计时结束处理
  handleTimeup: function() {
    wx.showModal({
      title: '时间已到',
      content: '很抱歉，您未能在规定时间内完成缴费，名额已释放。',
      showCancel: false,
      confirmText: '知道了',
      success: (res) => {
        if (res.confirm) {
          this.backToHome();
        }
      }
    });
  },
  
  // 前往缴费页面
  goToPayment: function() {
    // 清除倒计时
    if (this.data.countdownInterval) {
      clearInterval(this.data.countdownInterval);
    }
    
    wx.navigateTo({
      url: '/pages/payment-upload/payment-upload'
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