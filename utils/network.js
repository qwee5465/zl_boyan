/**测试 */
var baseUrl = "http://boyan.zuanla.com.cn/api/app/";

var app_key = '12118162aUjf86B';

/**
 * 用户登录
 */
var authorization = baseUrl.concat('authorization');

/**
 * 获取平台基本信息
 */
var baseInfo = baseUrl.concat("base_info");

/**
 * 获取公司简介接口
 */
var company = baseUrl.concat("company");

/**
 * 获取轮播图接口
 */
var banners = baseUrl.concat("banners");

/**
 * 获取首页信息
 */
var homepage = baseUrl.concat("homepage");

/**
 * 获取服务项目接口
 */
var services = baseUrl.concat("services");

/**
 * 获取装修方案接口
 */
var cases = baseUrl.concat("cases");

/**
 * 获取装修方案详情接口
 */
var caseDetail = baseUrl.concat("case");

/**
 * 获取联系我们接口
 */
var contact = baseUrl.concat("contact");

/**
 * 获取底部广告位接口
 */
var adsense = baseUrl.concat("adsense");

/**
 * 预约接口
 */
var joinContact = baseUrl.concat("join/contact");

/**
 * 网络请求
 */
function ajax(config) {
  var that = this;
  config.requestNum = config.requestNum || 0;
  if (getApp().isRequest) {
    var token = config.token || getApp().globalData.token;
    var url = config.url || "",
      data = config.data || {},
      method = config.method || "GET",
      loading = typeof config.loading === 'undefined' ? true : config.loading,
      header = config.header || {},
      success = config.success,
      fail = config.fail,
      isCheck = typeof config.isCheck === 'undefined' ? true : config.isCheck,
      complete = config.complete || function () { };

    if (loading) {
      wx.showLoading({
        title: '请稍后'
      })
    }
    data.token = token;
    data.app_key = app_key;
    if (method == 'GET') {
      header = { 'Content-Type': 'application/json' }
    } else {
      if (typeof header['Content-Type'] === 'undefined') {
        header = { "Content-Type": "application/x-www-form-urlencoded" }
      }
    }
    wx.request({
      url: url,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        if (res.data.ret == 0) {
          success(res.data)
        } else {
          setTimeout(function () {
            fail(res.data)
          }, 100);
        }
      },
      fail: function (res) {
        fail(res)
      },
      complete: function (res) {
        if (loading) {
          wx.hideLoading();
        }
        complete(res);
      }
    })
  } else {
    var callbacks = getApp().callbacks;
    var obj = { fun: that.ajax, config: config };
    callbacks.push(obj);
    // if (config.requestNum <= 9) {
    //   setTimeout(function () {
    //     config.requestNum++;
    //     that.ajax(config);
    //   }, 100);
    // } else {
    //   setTimeout(function () {
    //     config.requestNum = 0;
    //     that.ajax(config);
    //     console.log("请求超时，初始数据未生成,重新启动");
    //   }, 1000)
    // }
  }
}

/**
 * 上传文件
 */
function upLoadFile(config) {
  var showToast = config.showToast;
  var formData = config.formData;
  var method = config.method || "POST";
  var header = config.header;
  var url = config.url;
  var name = config.name || "fileName";
  var filePath = config.filePath;
  var success = config.success;
  var fail = config.fail;
  var complete = config.complete;
  if (showToast) {
    wx.showLoading({
      title: '请稍后'
    })
  }
  var token = getApp().globalData.token;
  var app_key = constant.app_key;
  formData.token = token;
  formData.app_key = app_key;
  if (method == 'GET') {
    header = { 'Content-Type': 'application/json' };
  } else if (method == 'POST') {
    header = { "Content-Type": "application/json" };
  } else {
    header = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    header: header,
    formData: formData,
    dataType: 'json',
    success: function (res) {
      //upload中不自动解析，故需要解析
      var data = JSON.parse(res.data)
      if (data.ret == 0) {
        success(data)
      } else {
        fail(data)
      }
    },
    fail: function (res) {
      wx.showModal({
        title: '提示',
        content: '消息提示',
        showCancel: true,
        confirmText: "确定",
        success: function (res) {
          that.upLoadFile(config);
        }
      });
    },
    complete: function (res) {
      if (showToast) {
        wx.hideLoading();
      }
      if (typeof complete === "function") {
        complete(res);
      }
    },
  })
}

module.exports = {
  app_key: app_key,
  ajax: ajax,
  upLoadFile: upLoadFile,
  authorization: authorization,
  baseInfo: baseInfo,
  company: company,
  banners: banners,
  homepage: homepage,
  services: services,
  cases: cases,
  caseDetail: caseDetail,
  contact: contact,
  adsense: adsense,
  joinContact: joinContact
};

