(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/login"],{2354:function(e,n,t){"use strict";(function(e){t("4a58"),t("921b");o(t("66fd"));var n=o(t("dca2"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"4ddc":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"5bb2":function(e,n,t){},"9f20":function(e,n,t){"use strict";var o=t("5bb2"),a=t.n(o);a.a},a0a3:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("2e5d"),a={data:function(){return{isCanUse:e.getStorageSync("isCanUse")||!0,encrypted:"",iv:"",sessionKey:"",openId:"",token:"",option:{}}},methods:{wxGetUserInfo:function(){this.login()},login:function(){var n=this;e.showLoading({title:"登录中..."}),e.login({provider:"weixin",success:function(t){(0,o.request)("/login/getWechatInfo",{code:t.code},"POST").then(function(t){n.sessionKey=JSON.parse(t.data.data).session_key,e.setStorageSync("sessionKey",n.sessionKey),e.getUserInfo({provider:"weixin",success:function(t){n.encrypted=t.encryptedData,n.iv=t.iv;try{e.setStorageSync("isCanUse",!1),n.updateUserInfo()}catch(o){}},fail:function(n){e.showModal({title:"提示",content:"您已拒绝授权,请重新点击并授权!",showCancel:!1,confirmColor:"#0657A6",success:function(e){e.confirm&&console.log("用户点击确定")}})}}),e.hideLoading()})}})},updateUserInfo:function(){var n=this;(0,o.request)("/login/getWechatInfos",{sessionKey:n.sessionKey,encryptedData:n.encrypted,iv:n.iv},"POST").then(function(t){n.openId=JSON.parse(t.data.data).openId,(0,o.request)("/login/wechatLogin",{wx_info:t.data.data,openid:n.openId},"POST").then(function(t){n.token=t.data.data.token;try{if(e.setStorageSync("token",n.token),"success"==t.data.message){var o=getCurrentPages();wx.navigateBack({success:function(){o[o.length-2].onLoad(n.option)}})}}catch(a){}})})},tapGetback:function(){e.navigateBack({delta:1})}},onLoad:function(n){this.option=n;var t=e.getStorageSync("token");""!==t&&e.navigateBack({delta:1})}};n.default=a}).call(this,t("543d")["default"])},dca2:function(e,n,t){"use strict";t.r(n);var o=t("4ddc"),a=t("f4ea");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("9f20");var c=t("2877"),s=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"beff2598",null);n["default"]=s.exports},f4ea:function(e,n,t){"use strict";t.r(n);var o=t("a0a3"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a}},[["2354","common/runtime","common/vendor"]]]);