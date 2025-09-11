// notice.js
Page({
  data: {
    noticeContent: `
报名须知

1. 报名条件
   • 年满18周岁，身体健康
   • 具备相应的学历要求
   • 无不良记录

2. 报名流程  
   • 通过岗位保护查询
   • 完成黑名单校验
   • 阅读并同意本须知
   • 填写完整报名信息
   • 上传缴费凭证

3. 注意事项
   • 请确保填写信息真实有效
   • 报名费用一经缴纳不予退还
   • 如发现虚假信息将取消报名资格

4. 联系方式
   • 咨询电话：400-xxx-xxxx
   • 工作时间：9:00-18:00
    `,
    hasRead: false,
    canContinue: false
  },

  onLoad: function (options) {
    
  },

  onScroll: function(e) {
    // 检查是否滚动到底部
    const scrollTop = e.detail.scrollTop;
    const scrollHeight = e.detail.scrollHeight;
    const clientHeight = e.detail.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.setData({
        hasRead: true
      });
    }
  },

  onAgreeChange: function(e) {
    this.setData({
      canContinue: e.detail.value.length > 0
    });
  },

  continueNext: function() {
    if (!this.data.canContinue) {
      wx.showToast({
        title: '请先同意报名须知',
        icon: 'none'
      });
      return;
    }

    // 存储须知确认状态
    wx.setStorageSync('noticeAgreed', {
      agreed: true,
      agreeTime: new Date().toISOString()
    });

    wx.navigateTo({
      url: '/pages/registration/registration'
    });
  }
})