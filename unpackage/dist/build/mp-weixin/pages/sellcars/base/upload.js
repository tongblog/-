(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sellcars/base/upload"],{"11c3":function(t,n,a){"use strict";var e=a("22ca"),i=a.n(e);i.a},"22ca":function(t,n,a){},"4bf2":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=a("2e5d"),i=a("d9ea"),c={data:function(){return{imgSrc1:"",imgSrc2:"",car1_info:{}}},methods:{handlePositive:function(){var n=this;(0,i.upload)().then(function(a){n.imgSrc1="https://api.chinartn.cn/"+a;var e=a;n.certificate(1,e).then(function(a){-1===parseInt(a.code)?t.showToast({title:"识别错误,请重新上传",icon:"none",duration:4e3}):(n.car1_info=a.data,n.$emit("clickPos",a.data,e),n.isHandCar(a.data))})})},handleNegative:function(){var n=this;(0,i.upload)().then(function(a){n.imgSrc2="https://api.chinartn.cn/"+a;var e=a;n.certificate(2,e).then(function(a){-1===parseInt(a.code)?t.showToast({title:"识别错误,请重新上传",icon:"none",duration:4e3}):n.$emit("clickRev",a.data,e)})})},isHandCar:function(t){var n=this,a=t.plate_num;if(n.$c.showLoading("加载中"),a.includes("挂")){Object.assign(n._data,n._props);var e=n._data;n.index=2,e=JSON.stringify(e),n.$c.goUrl("/other_pages/daiguaSell/SellCars?type=hand&json="+e),n.$c.hideLoading()}else n.$c.hideLoading()},certificate:function(n,a){return new Promise(function(i,c){(0,e.request)("/goods/getCarcardInfo",{token:t.getStorageSync("token"),img_url:a,data_carcard_type:n},"POST").then(function(t){i(t.data)})})}}};n.default=c}).call(this,a("543d")["default"])},"6ddc":function(t,n,a){"use strict";a.r(n);var e=a("4bf2"),i=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(n,t,function(){return e[t]})}(c);n["default"]=i.a},7549:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},i=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return i})},"992f":function(t,n,a){"use strict";a.r(n);var e=a("7549"),i=a("6ddc");for(var c in i)"default"!==c&&function(t){a.d(n,t,function(){return i[t]})}(c);a("11c3");var r=a("2877"),o=Object(r["a"])(i["default"],e["a"],e["b"],!1,null,"1c1aec79",null);n["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/sellcars/base/upload-create-component',
    {
        'pages/sellcars/base/upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("992f"))
        })
    },
    [['pages/sellcars/base/upload-create-component']]
]);                