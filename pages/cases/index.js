const network = require("../../utils/network.js");
const common = require("../../utils/common.js");

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    banner: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getBanners();
    that.getCases();
    app.getGlobalDataInfo(function (res) {
      that.setData({
        baseInfo: res.baseInfo
      })
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
   * 跳转到案例详情
   */
  goCaseDetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/casesDetail/index?id=' + id,
    })
  },

  /**
   * 获取装修方案接口信息
   */
  getCases: function () {
    var that = this;
    network.ajax({
      url: network.cases,
      method: "GET",
      data: {},
      success: function (res) {
        that.setData({
          cinfo: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {

      }
    })
  },

  /**
   * 获取轮播图接口
   */
  getBanners: function () {
    var that = this;
    network.ajax({
      url: network.banners,
      method: "GET",
      data: { type: 'case' },
      success: function (res) {
        that.setData({
          banner: res.data.banner_list
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        common.hideLoading(that);
      }
    })
  }
})