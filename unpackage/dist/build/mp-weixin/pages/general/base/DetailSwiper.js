(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/general/base/DetailSwiper"],{"0af5":function(t,n,e){"use strict";e.r(n);var a=e("1201"),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n["default"]=i.a},1201:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={props:{imgList:{type:Array},video:{type:String},price:{type:String}},data:function(){return{num:"1",autoplay:!0,duration:1e3,interval:2e3}},computed:{changeNum:function(){return this.video?this.imgList.length+1:this.imgList.length}},methods:{intervalChange:function(t){this.num=t.detail.current+1},handlePlay:function(t){"play"==t.type&&(this.autoplay=!1)},handleEnd:function(t){"ended"==t.type&&(this.autoplay=!0)}}};n.default=a},"29da":function(t,n,e){},"555f":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$c.changePrice(t.price));t.$mp.data=Object.assign({},{$root:{g0:e}})},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},ed85:function(t,n,e){"use strict";e.r(n);var a=e("555f"),i=e("0af5");for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e("f6a6");var u=e("2877"),c=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,"69c72b6a",null);n["default"]=c.exports},f6a6:function(t,n,e){"use strict";var a=e("29da"),i=e.n(a);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/general/base/DetailSwiper-create-component',
    {
        'pages/general/base/DetailSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ed85"))
        })
    },
    [['pages/general/base/DetailSwiper-create-component']]
]);                
