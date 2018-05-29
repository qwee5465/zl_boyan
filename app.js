const network = require("/utils/network.js");
const common = require("/utils/common.js");

App({
  /**
   * 设备的全局属性
   */
  globalData: {
    token: "",
    code: "",
    userInfo: {},
    baseInfo: {}, //平台基础信息
  },
  isNavigateTo: true,
  isRedirectTo: true,
  isRequest: false, //是否可以调用 network.ajax 请求流程
  callbacks: [],

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    //初始化
    that.init();
    //登陆
    that.login();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    var that = this;

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    var that = this;
  },

  /**
  * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  */
  onError: function (msg) {

  },

  /**
   * 获取globalData 信息
   */
  getGlobalDataInfo: function (callback) {
    var that = this;
    if (that.isRequest) {
      callback(that.globalData);
    } else {
      setTimeout(function () {
        that.getGlobalDataInfo(callback);
      }, 100);
    }
  },


  /**
   * 初始化(解决点击过快导致触发多次的bug)
   */
  init: function () {
    var that = this;
    var wxNavigateTo = wx.navigateTo;
    var wxRedirectTo = wx.redirectTo;
    var wxShowToast = wx.showToast;
    Object.defineProperties(wx, {
      'navigateTo': {
        writable: true //writable表示能不能够重写属性值，默认为false
      },
      'redirectTo': {
        writable: true //writable表示能不能够重写属性值，默认为false
      },
      'showToast': {
        writable: true //writable表示能不能够重写属性值，默认为false
      }
    });
    wx.navigateTo = function (obj) {
      if (that.isNavigateTo) {
        that.isNavigateTo = false;
        wxNavigateTo(obj);
        setTimeout(function () {
          that.isNavigateTo = true;
        }, 500)
      }
    }
    wx.redirectTo = function (obj) {
      if (that.isRedirectTo) {
        that.isRedirectTo = false;
        wxRedirectTo(obj);
        setTimeout(function () {
          that.isRedirectTo = true;
        }, 500)
      }
    }
    wx.showToast = function (obj) {
      obj.icon = obj.icon || "none";
      wxShowToast(obj);
    }
  },

  /**
  * 登陆
  */
  login: function () {
    var that = this;
    wx.login({ //微信登陆
      success: function (json) {
        if (json.code) {
          wx.request({ //后台登陆
            url: network.authorization,
            data: { code: json.code, app_key: network.app_key },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "GET",
            success: function (res) {
              res = res.data;
              that.globalData.token = res.data.access_token;
              that.getBaseInfo();
            },
            fail: function (res) {
              console.log("登陆失败");
            }
          });
        }
      }
    });
  },

  /**
   * 获取平台基本接口
   */
  getBaseInfo: function () {
    var that = this;
    wx.request({
      url: network.baseInfo,
      data: { access_token: that.globalData.token, app_key: network.app_key },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "GET",
      success: function (res) {
        res = res.data;
        that.isRequest = true;
        that.globalData.baseInfo = res.data;
        var callbacks = that.callbacks;
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i].fun(callbacks[i].config);
        }
        callbacks = [];
      },
      fail: function (res) {
        console.log(res.msg);
      }
    });
  }

})