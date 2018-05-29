const network = require("../../utils/network.js");
const common = require("../../utils/common.js");

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time1: null,
    time2: null,
    isRequest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var time1 = common.dateFormat(new Date(), "yyyy-MM-dd");
    var time2 = common.dateFormat(new Date(), "HH-mm");
    that.setData({
      time1: time1,
      time2: time2
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

  bindDateChange: function (e) {
    console.log(e);
    this.setData({
      time1: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log(e);
    this.setData({
      time2: e.detail.value
    })
  },

  /**
   * 提交留言
   */
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    console.log(data);
    if (data.name == "") {
      wx.showToast({
        title: '请填写预约人',
      })
      return;
    }
    if (data.mobile == "") {
      wx.showToast({
        title: '请填写电话',
      })
      return;
    }
    if (that.data.isRequest) {
      that.data.isRequest = false;
      network.ajax({
        url: network.joinContact,
        method: "GET",
        data: data,
        success: function (res) {
          setTimeout(function () {
            wx.showToast({
              title: res.msg,
              success: function () {
                setTimeout(function(){
                  wx.navigateBack({});
                },1000);
                
              }
            })
          }, 50)
        },
        fail: function (res) {
          setTimeout(function () {
            wx.showToast({
              title: res.msg,
            })
          }, 50)
        },
        complete: function () {
          that.data.isRequest = true;
        }
      })
    }
  }
})