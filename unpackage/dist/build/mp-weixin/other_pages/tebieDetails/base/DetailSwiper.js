(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/tebieDetails/base/DetailSwiper"],{"27f8":function(t,e,n){"use strict";n.r(e);var a=n("fe4d"),i=n("48fb");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("99f1");var r=n("2877"),o=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"6c9527aa",null);e["default"]=o.exports},"48fb":function(t,e,n){"use strict";n.r(e);var a=n("b62e"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},"4e78":function(t,e,n){},"99f1":function(t,e,n){"use strict";var a=n("4e78"),i=n.n(a);i.a},b62e:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{imgList:{type:Array},video:{type:String}},data:function(){return{num:"1",autoplay:!0,duration:1e3,interval:2e3}},computed:{changeNum:function(){return this.video?this.imgList.length+1:this.imgList.length}},methods:{intervalChange:function(t){this.num=t.detail.current+1},handlePlay:function(t){"play"==t.type&&(this.autoplay=!1)},handleEnd:function(t){"ended"==t.type&&(this.autoplay=!0)}}};e.default=a},fe4d:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/tebieDetails/base/DetailSwiper-create-component',
    {
        'other_pages/tebieDetails/base/DetailSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("27f8"))
        })
    },
    [['other_pages/tebieDetails/base/DetailSwiper-create-component']]
]);                
