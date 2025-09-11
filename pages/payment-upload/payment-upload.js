// payment-upload.js
Page({
  data: {
    paymentInfo: {
      amount: '298.00',
      method: '微信支付/支付宝',
      account: 'xxxxx@example.com'
    },
    uploadedImage: '',
    imageUploaded: false
  },

  onLoad: function (options) {
    
  },

  chooseImage: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          uploadedImage: tempFilePath,
          imageUploaded: true
        });
        
        // 这里可以添加图片上传到服务器的逻辑
        this.uploadImageToServer(tempFilePath);
      },
      fail: (err) => {
        console.error('选择图片失败', err);
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    });
  },

  uploadImageToServer: function(filePath) {
    wx.showLoading({
      title: '上传中...'
    });
    
    // 模拟上传过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
        icon: 'success'
      });
    }, 2000);
    
    // 实际项目中这里应该是真正的上传逻辑
    /*
    wx.uploadFile({
      url: 'your-server-url',
      filePath: filePath,
      name: 'paymentImage',
      success: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
    */
  },

  previewImage: function() {
    if (!this.data.uploadedImage) return;
    
    wx.previewImage({
      urls: [this.data.uploadedImage],
      current: this.data.uploadedImage
    });
  },

  deleteImage: function() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张缴费截图吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            uploadedImage: '',
            imageUploaded: false
          });
        }
      }
    });
  },

  submitPayment: function() {
    if (!this.data.imageUploaded) {
      wx.showToast({
        title: '请上传缴费截图',
        icon: 'none'
      });
      return;
    }
    
    // 收集所有数据准备提交到飞书
    const allData = {
      positionCheck: wx.getStorageSync('positionCheckResult'),
      blacklistVerify: wx.getStorageSync('blacklistVerifyResult'),
      noticeAgreed: wx.getStorageSync('noticeAgreed'),
      registration: wx.getStorageSync('registrationData'),
      payment: {
        image: this.data.uploadedImage,
        uploadTime: new Date().toISOString()
      }
    };
    
    // 存储完整数据
    wx.setStorageSync('completeRegistrationData', allData);
    
    // 这里将来接入飞书多维表格API
    this.submitToFeishu(allData);
  },

  submitToFeishu: function(data) {
    wx.showLoading({
      title: '提交中...'
    });
    
    // 模拟提交到飞书
    setTimeout(() => {
      wx.hideLoading();
      
      // 生成报名编号
      const registrationId = 'REG' + Date.now();
      wx.setStorageSync('registrationId', registrationId);
      
      wx.navigateTo({
        url: '/pages/success/success?id=' + registrationId
      });
    }, 3000);
    
    // 实际项目中这里应该调用飞书API
    /*
    wx.request({
      url: 'your-feishu-api-endpoint',
      method: 'POST',
      data: data,
      success: (res) => {
        wx.hideLoading();
        const registrationId = res.data.id || 'REG' + Date.now();
        wx.setStorageSync('registrationId', registrationId);
        wx.navigateTo({
          url: '/pages/success/success?id=' + registrationId
        });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showModal({
          title: '提交失败',
          content: '网络连接异常，请稍后重试',
          showCancel: false
        });
      }
    });
    */
  }
})