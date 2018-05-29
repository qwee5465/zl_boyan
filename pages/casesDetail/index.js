const network = require("../../utils/network.js");
const common = require("../../utils/common.js");
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.id = options.id;
    that.getCaseInfo();
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
   * 获取公司简介信息
   */
  getCaseInfo: function () {
    var that = this;
    network.ajax({
      url: network.caseDetail,
      method: "GET",
      data: { id: that.data.id },
      success: function (res) {
        console.log(res);
        WxParse.wxParse('goods_detail', 'html', res.data.intro, that, 0);
        that.setData({
          info: res.data
        })
      },
      fail: function (res) {

      }
    })
  }
})