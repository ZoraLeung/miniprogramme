// position-check.js
Page({
  data: {
    idNumber: '',
    studentId: '',
    showStudentId: false,
    showResult: false,
    canQuery: false,
    canContinue: false,
    resultType: '',
    resultMessage: ''
  },

  onLoad: function (options) {
    
  },

  onIdNumberInput: function(e) {
    this.setData({
      idNumber: e.detail.value,
      canQuery: e.detail.value.length >= 15
    })
  },

  onStudentIdInput: function(e) {
    this.setData({
      studentId: e.detail.value
    })
  },

  queryPosition: function() {
    if (!this.data.canQuery) return;
    
    wx.showLoading({
      title: '查询中...'
    });
    
    // 这里将来接入具体的查询逻辑
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟查询结果
      const hasProtection = Math.random() > 0.5;
      
      this.setData({
        showResult: true,
        canContinue: !hasProtection,
        resultType: hasProtection ? 'protected' : 'available',
        resultMessage: hasProtection ? 
          '查询到岗位保护，暂时无法报名此岗位' : 
          '未发现岗位保护，可以继续报名'
      });
      
      // 存储查询结果
      wx.setStorageSync('positionCheckResult', {
        idNumber: this.data.idNumber,
        studentId: this.data.studentId,
        hasProtection: hasProtection,
        checkTime: new Date().toISOString()
      });
      
    }, 2000);
  },

  continueNext: function() {
    wx.navigateTo({
      url: '/pages/blacklist-verify/blacklist-verify'
    });
  }
})