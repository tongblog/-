(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/huanxin/base/upload"],{"40d0":function(t,n,e){"use strict";e.r(n);var a=e("5295"),i=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,function(){return a[t]})}(c);n["default"]=i.a},"4b11":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},"4f90":function(t,n,e){"use strict";var a=e("fc12"),i=e.n(a);i.a},5295:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("2e5d"),i=e("d9ea"),c={data:function(){return{imgSrc1:"",imgSrc2:""}},methods:{handlePositive:function(){var n=this;(0,i.upload)().then(function(e){n.imgSrc1="https://api.chinartn.cn/"+e;var a=e;n.certificate(1,a).then(function(e){-1===parseInt(e.code)?t.showToast({title:"识别错误,请重新上传",icon:"none",duration:4e3}):n.$emit("clickPos",e.data,a)})})},handleNegative:function(){var n=this;(0,i.upload)().then(function(e){n.imgSrc2="https://api.chinartn.cn/"+e;var a=e;n.certificate(2,a).then(function(e){-1===parseInt(e.code)?t.showToast({title:"识别错误,请重新上传",icon:"none",duration:4e3}):n.$emit("clickRev",e.data,a)})})},certificate:function(n,e){return new Promise(function(i,c){(0,a.request)("/goods/getCarcardInfo",{token:t.getStorageSync("token"),img_url:e,data_carcard_type:n},"POST").then(function(t){i(t.data)})})}}};n.default=c}).call(this,e("543d")["default"])},f193:function(t,n,e){"use strict";e.r(n);var a=e("4b11"),i=e("40d0");for(var c in i)"default"!==c&&function(t){e.d(n,t,function(){return i[t]})}(c);e("4f90");var o=e("2877"),r=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"c0ee5072",null);n["default"]=r.exports},fc12:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/huanxin/base/upload-create-component',
    {
        'other_pages/huanxin/base/upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f193"))
        })
    },
    [['other_pages/huanxin/base/upload-create-component']]
]);                