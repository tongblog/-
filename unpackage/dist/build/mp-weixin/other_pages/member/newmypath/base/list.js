(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/member/newmypath/base/list"],{5276:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("2e5d");var o=r(n("200a")),a=n("5776"),i=c(n("92ba"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){var o=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(t,n):{};o.get||o.set?Object.defineProperty(e,n,o):e[n]=t[n]}return e.default=t,e}var u={data:function(){return{goodsList:[],page_index:1,page_count:0}},props:{options:{type:Object,default:function(){return{}}}},created:function(){this.newMyPath(this.page_index)},methods:{handlePric:function(t,e){(0,a.goWindow)("/pages/general/details?id=",t)},newMyPath:function(e){var n=this;o.newMyPath({page_index:e}).then(function(o){t.showLoading({title:"加载中"});var a=o.data.data;for(var c in a)console.log(a[c].goods_info.picture_img),a[c].goods_info.picture_img=i.default.domain+a[c].goods_info.picture_img;e>1&&(a=n.shop_list.concat(a)),setTimeout(function(){n.goodsList=a,n.page_count=o.data.page_count,t.hideLoading()},500)})},cancelFavorites:function(e){var n=this;o.cancelFavorites({fav_id:e,fav_type:"goods"}).then(function(e){console.log(e),e.data>0?t.showToast({title:"取消收藏成功",duration:2e3,success:function(){setTimeout(function(){n.newMyPath(1)},2e3)}}):t.showToast({title:"取消收藏失败",icon:"none",duration:2e3,success:function(){}})})},loadData:function(t){var e=this;e.page_index<e.page_count&&(e.page_index++,e.newMyPath(e.page_index))},handleErr:function(t,e){"error"==t.type&&(this.goodsList[e].goods_info.picture_img="/static/images/list.jpg")}}};e.default=u}).call(this,n("543d")["default"])},"56ec":function(t,e,n){"use strict";n.r(e);var o=n("5276"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"6df3":function(t,e,n){"use strict";var o=n("ae7c"),a=n.n(o);a.a},ae7c:function(t,e,n){},c2c9:function(t,e,n){"use strict";n.r(e);var o=n("c48c"),a=n("56ec");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("6df3");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"6263a0d0",null);e["default"]=r.exports},c48c:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/member/newmypath/base/list-create-component',
    {
        'other_pages/member/newmypath/base/list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c2c9"))
        })
    },
    [['other_pages/member/newmypath/base/list-create-component']]
]);                
