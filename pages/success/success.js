// success.js
Page({
  data: {
    registrationId: '',
    registrationInfo: {}
  },

  onLoad: function (options) {
    const registrationId = options.id || wx.getStorageSync('registrationId') || '';
    
    // 获取完整的报名信息
    const completeData = wx.getStorageSync('completeRegistrationData');
    
    this.setData({
      registrationId: registrationId,
      registrationInfo: completeData?.registration || {}
    });
    
    // 清除临时数据（可选）
    // this.clearTemporaryData();
  },

  clearTemporaryData: function() {
    // 清除临时存储的数据
    wx.removeStorageSync('positionCheckResult');
    wx.removeStorageSync('blacklistVerifyResult');
    wx.removeStorageSync('noticeAgreed');
    wx.removeStorageSync('registrationData');
  },

  copyRegistrationId: function() {
    wx.setClipboardData({
      data: this.data.registrationId,
      success: () => {
        wx.showToast({
          title: '报名编号已复制',
          icon: 'success'
        });
      }
    });
  },

  contactService: function() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：400-xxx-xxxx\n工作时间：9:00-18:00',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  backToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 查看审核结果
  checkApprovalResult: function() {
    wx.navigateTo({
      url: '/pages/approval-result/approval-result?id=' + this.data.registrationId
    });
  },

  onShareAppMessage: function() {
    return {
      title: '我刚刚完成了报名，快来看看吧！',
      path: '/pages/index/index'
    };
  }
})