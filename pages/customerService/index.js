const network = require("../../utils/network.js");
const common = require("../../utils/common.js");

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getGlobalDataInfo(function (res) {
      that.setData({
        baseInfo: res.baseInfo
      })
      common.hideLoading(that);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 拨打电话
   */
  makePhoneCall: function (e) {
    var that = this;
    var code = e.currentTarget.dataset.code;
    wx.makePhoneCall({
      phoneNumber: code,
    })
  },

  /**
   * 跳转到指定地址
   */
  openLocation: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.baseInfo.by_location_latitude),
      longitude: parseFloat(that.data.baseInfo.by_location_longitude),
      name: that.data.baseInfo.by_address
    })
  },

  /**
   * 跳转到预约
   */
  goBespeak: function () {
    wx.navigateTo({
      url: '/pages/bespeak/index',
    })
  }

})