// approval-result.js
Page({
  data: {
    approvalStatus: 'approved', // approved, pending, rejected
    statusTitle: '',
    statusMessage: '',
    registrationId: ''
  },
  
  onLoad: function (options) {
    // 获取审核状态，实际项目中应该从服务器获取
    const status = options.status || 'approved'; // 默认为通过状态用于演示
    const registrationId = options.id || wx.getStorageSync('registrationId');
    
    this.setData({
      approvalStatus: status,
      registrationId: registrationId
    });
    
    this.updateStatusDisplay(status);
  },
  
  // 更新状态显示
  updateStatusDisplay: function(status) {
    let title = '';
    let message = '';
    
    switch(status) {
      case 'approved':
        title = '审核通过';
        message = '恭喜您，报名审核已通过！';
        break;
      case 'pending':
        title = '审核中';
        message = '您的报名正在审核中，请耐心等待';
        break;
      case 'rejected':
        title = '审核未通过';
        message = '很抱歉，您的报名未通过审核';
        break;
      default:
        title = '审核结果';
        message = '正在查询您的审核状态...';
    }
    
    this.setData({
      statusTitle: title,
      statusMessage: message
    });
  },
  
  // 复制微信号
  copyWechatId: function() {
    const wechatId = 'course_advisor_2024';
    wx.setClipboardData({
      data: wechatId,
      success: function () {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function () {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 返回首页
  backToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },
  
  // 刷新状态
  checkAgain: function() {
    wx.showLoading({
      title: '检查中...'
    });
    
    // 模拟检查审核状态
    setTimeout(() => {
      wx.hideLoading();
      // 实际项目中这里应该调用API查询最新状态
      const randomStatus = Math.random() > 0.5 ? 'approved' : 'pending';
      this.setData({
        approvalStatus: randomStatus
      });
      this.updateStatusDisplay(randomStatus);
      
      if (randomStatus === 'approved') {
        wx.showToast({
          title: '审核已通过！',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: '仍在审核中',
          icon: 'none'
        });
      }
    }, 2000);
  },
  
  // 联系客服
  contactService: function() {
    wx.showModal({
      title: '联系客服',
      content: '请添加客服微信：service_2024 或拨打客服电话：400-000-0000',
      confirmText: '复制微信号',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: 'service_2024',
            success: function () {
              wx.showToast({
                title: '客服微信号已复制',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },
  
  // 保存二维码
  saveQRCode: function() {
    wx.showActionSheet({
      itemList: ['保存到相册', '分享给朋友'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 保存到相册的逻辑
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          });
        }
      }
    });
  }
});