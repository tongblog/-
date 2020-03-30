(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/kucunDetails/base/DetailSwiper"],{"17c2":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$c.changePrice(t.price));t.$mp.data=Object.assign({},{$root:{g0:e}})},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},"48b3":function(t,n,e){"use strict";e.r(n);var a=e("17c2"),i=e("f8ca");for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);e("d97a");var r=e("2877"),c=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"0ffbe1e6",null);n["default"]=c.exports},6682:function(t,n,e){},d97a:function(t,n,e){"use strict";var a=e("6682"),i=e.n(a);i.a},f530:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={props:{imgList:{type:Array},price:{type:String},video:{type:String}},data:function(){return{num:"1",autoplay:!0,duration:1e3,interval:2e3}},computed:{changeNum:function(){return this.video?this.imgList.length+1:this.imgList.length}},methods:{intervalChange:function(t){this.num=t.detail.current+1},handlePlay:function(t){"play"==t.type&&(this.autoplay=!1)},handleEnd:function(t){"ended"==t.type&&(this.autoplay=!0)}}};n.default=a},f8ca:function(t,n,e){"use strict";e.r(n);var a=e("f530"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/kucunDetails/base/DetailSwiper-create-component',
    {
        'pages/kucunDetails/base/DetailSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("48b3"))
        })
    },
    [['pages/kucunDetails/base/DetailSwiper-create-component']]
]);                
