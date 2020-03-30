(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/gangkouDetails/base/DetailSwiper"],{"0070":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={props:{imgList:{type:Array},video:{type:String}},data:function(){return{num:"1",autoplay:!0,duration:1e3,interval:2e3}},computed:{changeNum:function(){return this.video?this.imgList.length+1:this.imgList.length}},methods:{intervalChange:function(t){this.num=t.detail.current+1},handlePlay:function(t){"play"==t.type&&(this.autoplay=!1)},handleEnd:function(t){"ended"==t.type&&(this.autoplay=!0)}}};n.default=a},"08bd":function(t,n,e){},"0cc7":function(t,n,e){"use strict";var a=e("08bd"),u=e.n(a);u.a},"418e":function(t,n,e){"use strict";e.r(n);var a=e("0070"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=u.a},6514:function(t,n,e){"use strict";e.r(n);var a=e("b523"),u=e("418e");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("0cc7");var r=e("2877"),o=Object(r["a"])(u["default"],a["a"],a["b"],!1,null,"219715a5",null);n["default"]=o.exports},b523:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/gangkouDetails/base/DetailSwiper-create-component',
    {
        'other_pages/gangkouDetails/base/DetailSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6514"))
        })
    },
    [['other_pages/gangkouDetails/base/DetailSwiper-create-component']]
]);                
