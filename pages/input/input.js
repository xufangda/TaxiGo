const app=getApp();
const AV = require('../../utils/av-weapp-min.js');
const Order=require('../../model/order');

Page({
  data: {
    Dpart:{
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      error:{}
    },
    Dest: {
      name: "",
      address: "",
      latitude: "",
      longitude: ""
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    departure:"请输入出发地点",
    destination:"请输入到达地点",
  },

  //事件处理函数
  bindDpartTap: function () {
    let that=this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
            })
          }
        }
      });
      wx.chooseLocation({
        type: 'wgs84',
        success: function (res) {
          if (res.name !== "") {
            that.setData({
              Dest: res,
              departure: res.name,
            })
          }
          else if (res.address !== "") {
            that.setData({
              Dest: res,
              departure: res.address,
            })
          }
          else {
            that.setData({
              Dest: res,
              departure: "Your Location",
            })
          }
        }

      })
  },

  bindDestTap: function () {
    let that=this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
          })
        }
      }
    });
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        if(res.name!==""){
        that.setData({
          Dest: res,
          destination: res.name,
        })}
        else if(res.address !== ""){
          that.setData({
            Dest: res,
            destination: res.address,
          })
        }
        else{
          that.setData({
            Dest: res,
            destination: res.latitude+","+res.longitude,
          })
        }
      }
      
    })
  },

  bindLogTap: function () {
    let trip = this.data.departure +"到"+ this.data.destination
    wx.setStorageSync('trip', trip)
    new Order({
      departure: this.data.departure,
      destination: this.data.destination,
      accepted: false,
      done: false
    }).save()
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
});