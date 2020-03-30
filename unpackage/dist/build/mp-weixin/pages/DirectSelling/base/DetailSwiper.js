(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/DirectSelling/base/DetailSwiper"],{"20e7":function(t,e,n){"use strict";n.r(e);var a=n("e88c"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},"51f3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},ae90:function(t,e,n){},d3e2:function(t,e,n){"use strict";var a=n("ae90"),i=n.n(a);i.a},e259:function(t,e,n){"use strict";n.r(e);var a=n("51f3"),i=n("20e7");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("d3e2");var r=n("2877"),o=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"3af66ffc",null);e["default"]=o.exports},e88c:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{imgList:{type:Array},video:{type:String}},data:function(){return{num:"1",autoplay:!0,duration:1e3,interval:2e3}},computed:{changeNum:function(){return this.video?this.imgList.length+1:this.imgList.length}},methods:{intervalChange:function(t){this.num=t.detail.current+1},handlePlay:function(t){"play"==t.type&&(this.autoplay=!1)},handleEnd:function(t){"ended"==t.type&&(this.autoplay=!0)}}};e.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/DirectSelling/base/DetailSwiper-create-component',
    {
        'pages/DirectSelling/base/DetailSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e259"))
        })
    },
    [['pages/DirectSelling/base/DetailSwiper-create-component']]
]);                
