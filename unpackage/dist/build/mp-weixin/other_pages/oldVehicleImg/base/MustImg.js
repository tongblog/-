(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/oldVehicleImg/base/MustImg"],{"4c5a":function(t,n,a){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},e=[];a.d(n,"a",function(){return i}),a.d(n,"b",function(){return e})},8234:function(t,n,a){"use strict";a.r(n);var i=a("4c5a"),e=a("9971");for(var o in e)"default"!==o&&function(t){a.d(n,t,function(){return e[t]})}(o);a("f8ad");var c=a("2877"),r=Object(c["a"])(e["default"],i["a"],i["b"],!1,null,"1adee401",null);n["default"]=r.exports},"8e1c":function(t,n,a){},"930c":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a("a7cc"),e=a("8b3a"),o={data:function(){return{imgSrc1:"",imgSrc2:"",imgSrc3:"",imgSrc4:"",videoSrc:"",show:!1}},methods:{handleLeft:function(){var t=this;(0,i.upload)("upload/goods/",0).then(function(n){console.log(n),t.imgSrc1="https://api.chinartn.cn/"+n.img_path,t.$emit("handleLeft",n.img_path)})},handleRight:function(){var t=this;(0,i.upload)("upload/goods/",0).then(function(n){t.imgSrc2="https://api.chinartn.cn/"+n.img_path,t.$emit("handleRight",n.img_path)})},handleLafter:function(){var t=this;(0,i.upload)("upload/goods/",0).then(function(n){t.imgSrc3="https://api.chinartn.cn/"+n.img_path,t.$emit("handleLafter",n.img_path)})},handleRafter:function(){var t=this;(0,i.upload)("upload/goods/",0).then(function(n){t.imgSrc4="https://api.chinartn.cn/"+n.img_path,t.$emit("handleRafter",n.img_path)})},handleVideo:function(){var t=this;(0,e.uploadVideo)("upload/video/").then(function(n){t.videoSrc="https://api.chinartn.cn/"+n,t.show=!0,t.$emit("handleVideo",n)})}}};n.default=o},9971:function(t,n,a){"use strict";a.r(n);var i=a("930c"),e=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(n,t,function(){return i[t]})}(o);n["default"]=e.a},f8ad:function(t,n,a){"use strict";var i=a("8e1c"),e=a.n(i);e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/oldVehicleImg/base/MustImg-create-component',
    {
        'other_pages/oldVehicleImg/base/MustImg-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8234"))
        })
    },
    [['other_pages/oldVehicleImg/base/MustImg-create-component']]
]);                