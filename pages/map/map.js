// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {

    tar_latitude: 23.099994,
    tar_mylongitude: 113.324520,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      iconPath: "/imgs/location-marker.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '/imgs/location-marker.png',
      position: {
        left: 150,
        top: 120,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type);
    let that=this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          tar_latitude: res.latitude,
          tar_longitude: res.longitude,
        })
      }
    })
  },
  onLoad: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
          })
        }
        wx.chooseLocation({
          type: 'wgs84',
          success: function (res) {
            this.setData({
              latitude: res.latitude,
              longitude: res.longitude,
            })
          }
        })
      }
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    });
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'FAKBZ-T5YRK-YUJJ2-AQJQV-WU3J6-YZB6D'
    });
  },
  onShow: function () {
    // 调用接口
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})

