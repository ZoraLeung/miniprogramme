// registration.js  
Page({
  data: {
    formData: {
      name: '',
      idNumber: '',
      phone: '',
      email: '',
      position: '',
      education: '',
      experience: '',
      remark: ''
    },
    positions: ['岗位A', '岗位B', '岗位C', '岗位D'],
    educations: ['高中', '大专', '本科', '硕士', '博士'],
    positionIndex: 0,
    educationIndex: 0
  },

  onLoad: function (options) {
    // 获取之前步骤的数据
    const positionCheck = wx.getStorageSync('positionCheckResult');
    if (positionCheck) {
      this.setData({
        'formData.idNumber': positionCheck.idNumber
      });
    }
  },

  onNameInput: function(e) {
    this.setData({
      'formData.name': e.detail.value
    });
  },

  onPhoneInput: function(e) {
    this.setData({
      'formData.phone': e.detail.value
    });
  },

  onEmailInput: function(e) {
    this.setData({
      'formData.email': e.detail.value
    });
  },

  onExperienceInput: function(e) {
    this.setData({
      'formData.experience': e.detail.value
    });
  },

  onRemarkInput: function(e) {
    this.setData({
      'formData.remark': e.detail.value
    });
  },

  onPositionChange: function(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      positionIndex: index,
      'formData.position': this.data.positions[index]
    });
  },

  onEducationChange: function(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      educationIndex: index,
      'formData.education': this.data.educations[index]
    });
  },

  validateForm: function() {
    const { name, phone, email, position, education } = this.data.formData;
    
    if (!name.trim()) {
      wx.showToast({ title: '请填写姓名', icon: 'none' });
      return false;
    }
    
    if (!phone.trim() || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请填写正确的手机号', icon: 'none' });
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      wx.showToast({ title: '请填写正确的邮箱', icon: 'none' });
      return false;
    }
    
    if (!position) {
      wx.showToast({ title: '请选择报名岗位', icon: 'none' });
      return false;
    }
    
    if (!education) {
      wx.showToast({ title: '请选择学历', icon: 'none' });
      return false;
    }
    
    return true;
  },

  submitForm: function() {
    if (!this.validateForm()) return;
    
    // 存储表单数据
    wx.setStorageSync('registrationData', {
      ...this.data.formData,
      position: this.data.positions[this.data.positionIndex],
      education: this.data.educations[this.data.educationIndex],
      submitTime: new Date().toISOString()
    });
    
    wx.navigateTo({
      url: '/pages/payment-upload/payment-upload'
    });
  }
})