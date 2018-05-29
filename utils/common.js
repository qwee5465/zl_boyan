const network = require("network.js");

/**
 * 格式化日期
 */
function dateFormat(date, str) {
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  str = str.replace(/yyyy|YYYY/, date.getFullYear());
  str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
  str = str.replace(/MM/, date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
  str = str.replace(/M/g, date.getMonth() + 1);
  str = str.replace(/w|W/g, Week[date.getDay()]);
  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
  str = str.replace(/d|D/g, date.getDate());
  str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
  str = str.replace(/h|H/g, date.getHours());
  str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
  str = str.replace(/m/g, date.getMinutes());
  str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
  str = str.replace(/s|S/g, date.getSeconds());
  return str;
}

/**
 * 参数返回
 */
function returnResult(config) {
  var ret = config.ret || 0;
  var msg = config.msg || '';
  var data = config.data || [];
  var result = {
    ret: ret,
    msg: msg,
    data: data
  }
  return result;
}

/**
 * 公用的.js方法
 */
function stopPullDownRefresh() {
  setTimeout(function () {
    wx.stopPullDownRefresh();
  }, 500)
}


/**
 * 显示上拉加载框
 */
function setShowBloading(config) {
  var that = config.that;
  if (typeof that.data.bloading === 'undefined') {
    var onHide = that.onHide;
    var onUnload = that.onUnload;
    that.onHide = function () {
      bloadingInit(that);
      clearTimeout(that.data.bloadingTimer);
      onHide();
    }
    that.onUnload = function () {
      clearTimeout(that.data.bloadingTimer);
      onUnload();
    }
  }
  if (!that.data.notData) {
    that.data.bloading = {
      marginTop: config.marginTop || '',
      isShowBloading: true
    }
    that.setData({
      bloading: that.data.bloading
    })
  }
}

/**
 * 隐藏上拉加载框
 */
function setHideBloading(config) {
  var that = config.that;
  var time = config.time || 500;
  if (that.data.bloading) {
    that.data.bloading = {
      isShowBloading: false
    }
    that.data.bloadingTimer = setTimeout(function () {
      if (typeof config.done === 'function') {
        config.done();
      }
      that.setData({
        bloading: that.data.bloading
      })
    }, time);

  } else {
    if (typeof config.done === 'function') {
      config.done();
    }
  }
}

/**
 * 初始化上拉加载相关数据
 */
function bloadingInit(that, callBack) {
  if (typeof that.data.bloading === 'undefined') {
    if (typeof callBack === 'function') {
      callBack()
    }
  } else {
    clearTimeout(that.data.bloadingTimer);
    that.setData({
      bloading: null
    })
    if (typeof callBack === 'function') {
      callBack()
    }
  }

}


/**
 * toast提示框
 */
function toast(config) {
  var that = config.that;
  that.data.toastInfo = {
    isShow: true,
    title: config.title,
  }
  if (config.icon) {
    that.data.toastInfo.icon = config.icon;
  }
  var time = config.time || 2000;
  that.setData({
    toastInfo: that.data.toastInfo
  })
  setTimeout(function () {
    that.data.toastInfo.isShow = false;
    that.setData({
      toastInfo: that.data.toastInfo
    })
    if (typeof config.done == 'function')
      config.done();
  }, time);
}

/**
 * 隐藏页面加载遮罩层
 */
function hideLoading(that) {
  that.data.loadData = {};
  that.data.loadData.animate = true;
  that.setData({
    loadData: that.data.loadData
  });
  setTimeout(function () {
    that.setData({
      'loadData.hide': true
    })
  }, 350);
}

/**
 * 显示页面加载遮罩层
 */
function showLoading(that) {
  that.data.loadData = {};
  that.data.loadData.animate = true;
  that.data.loadData.hide = false;
  that.setData({
    loadData: that.data.loadData
  });
}


module.exports = {
  hideLoading: hideLoading,
  showLoading: showLoading,
  toast: toast,
  stopPullDownRefresh: stopPullDownRefresh,
  setShowBloading: setShowBloading,
  setHideBloading: setHideBloading,
  bloadingInit: bloadingInit,
  returnResult: returnResult,
  dateFormat: dateFormat
};