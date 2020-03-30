(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/general/base/DetailTitle"],{"44a5":function(e,t,n){"use strict";var a=n("f8f8"),r=n.n(a);r.a},"4c81":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.transferTime(e.sale_date));e.$mp.data=Object.assign({},{$root:{m0:n}})},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},"69b9":function(e,t,n){"use strict";n.r(t);var a=n("4c81"),r=n("8c40");for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);n("44a5");var i=n("2877"),o=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,"39e73cb1",null);t["default"]=o.exports},"8c40":function(e,t,n){"use strict";n.r(t);var a=n("a81f"),r=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);t["default"]=r.a},a81f:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("5776"),r={props:{introduction:{type:String},testing:{type:Number},sale_date:{type:Number},label_arr:{type:Array},goods_name:{type:String}},data:function(){return{}},methods:{transferTime:function(e){var t=new Date(1e3*parseInt(e)),n=t.getFullYear(),a=t.getMonth()+1;a=a<10?"0"+a:a;var r=t.getDate();r=r<10?"0"+r:r;var u=n+"-"+a+"-"+r;return u},handleRules:function(){(0,a.goWindow)("/other_pages/help/index?help_id=",12)}}};t.default=r},f8f8:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/general/base/DetailTitle-create-component',
    {
        'pages/general/base/DetailTitle-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("69b9"))
        })
    },
    [['pages/general/base/DetailTitle-create-component']]
]);                
