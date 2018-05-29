const network = require("../../utils/network.js");
const common = require("../../utils/common.js");

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRequest: true,
    notData: false,
    limit: 10,
    offset: 0,
    baseInfo: {},
    banner: [],
    columnList: [],
    cinfo: {},
    sinfo: {},
    cpinfo: {},
    ctinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getHomepage();
    that.getCases();
    that.getServices();
    that.getCompany();
    that.getContact();
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
    var that = this;
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
   * 获取首页信息
   */
  getHomepage: function () {
    var that = this;
    network.ajax({
      url: network.homepage,
      method: "GET",
      data: {},
      success: function (res) {
        that.setData({
          banner: res.data.banner_list,
          columnList: res.data.column_list
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        common.hideLoading(that);
      }
    })
  },

  /**
   * 获取服务项目信息
   */
  getServices: function () {
    var that = this;
    network.ajax({
      url: network.services,
      method: "GET",
      data: {},
      success: function (res) {
        that.setData({
          sinfo: res.data
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
   * 获取公司简介接口
   */
  getCompany: function () {
    var that = this;
    network.ajax({
      url: network.company,
      method: "GET",
      data: {},
      success: function (res) {
        that.setData({
          cpinfo: res.data
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
   * 获取联系我们广告位
   */
  getContact: function () {
    var that = this;
    network.ajax({
      url: network.contact,
      method: "GET",
      data: {},
      success: function (res) {
        that.setData({
          ctinfo: res.data
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
   * 跳转到案例详情
   */
  goCasesDetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/casesDetail/index?id=' + id,
    })
  },

  /**
   * 跳转到公司简介
   */
  goSynopsis: function () {
    wx.navigateTo({
      url: '/pages/synopsis/index',
    })
  },

  /**
   * 跳转到指定页面
   */
  goPage: function (e) {
    var that = this;
    var type1 = e.currentTarget.dataset.type;
    console.log(1);
    switch (type1) {
      case "company":
        wx.navigateTo({
          url: '/pages/synopsis/index',
        })
        break;
      case "service":
        wx.navigateTo({
          url: '/pages/service/index',
        })
        break;
      case "case":
        wx.switchTab({
          url: '/pages/cases/index',
        })
        break;
      case "contact":
        wx.switchTab({
          url: '/pages/member/index',
        })
        break;
    }
  },

  /**
   * 跳转到案例展示
   */
  goCases: function () {
    wx.navigateTo({
      url: '/pages/cases/index',
    })
  },

  /**
   * 跳转到服务范围
   */
  goService: function () {
    wx.navigateTo({
      url: '/pages/service/index',
    })
  },

  /**
   * 跳转到咨询留言
   */
  goMessage: function () {
    wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
      // 使页面滚动到底部  
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },

  /**
   * 跳转到产品
   */
  goProduct: function () {
    wx.switchTab({
      url: '/pages/product/index',
    })
  },

  /**
   * 跳转到我们
   */
  goContact: function () {
    wx.navigateTo({
      url: '/pages/contactUs/index',
    })
  },

  /**
   * 跳转到联系我们
   */
  goContactUs: function () {
    wx.navigateTo({
      url: '/pages/contactUs/index',
    })
  },

  /**
   * 提交留言
   */
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    if (data.name == "") {
      common.toast({
        that: that,
        title: "请输入姓名"
      })
      return;
    }
    if (data.mobile == "") {
      common.toast({
        that: that,
        title: "请输入电话"
      })
      return;
    }
    if (data.company == "") {
      common.toast({
        that: that,
        title: "请输入公司"
      })
      return;
    }
    if (that.data.isRequest) {
      that.data.isRequest = false;
      network.ajax({
        url: network.contact,
        method: "POST",
        data: data,
        success: function (res) {
          common.toast({
            that: that,
            title: res.msg
          })
        },
        fail: function (res) {
          common.toast({
            that: that,
            title: res.msg
          })
        },
        complete: function () {
          that.data.isRequest = true;
        }
      })
    }

  }

})