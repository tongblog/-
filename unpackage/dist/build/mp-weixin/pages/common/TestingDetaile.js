(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/TestingDetaile"],{"76fe":function(n,t,e){"use strict";(function(n){e("4a58"),e("921b");a(e("66fd"));var t=a(e("8e75"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"8e75":function(n,t,e){"use strict";e.r(t);var a=e("9ef1"),o=e("d2d0");for(var c in o)"default"!==c&&function(n){e.d(t,n,function(){return o[n]})}(c);e("9cf9");var u=e("2877"),i=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,"1a10025a",null);t["default"]=i.exports},"9cf9":function(n,t,e){"use strict";var a=e("cc15"),o=e.n(a);o.a},"9ef1":function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return o})},cc15:function(n,t,e){},d2d0:function(n,t,e){"use strict";e.r(t);var a=e("df8c"),o=e.n(a);for(var c in a)"default"!==c&&function(n){e.d(t,n,function(){return a[n]})}(c);t["default"]=o.a},df8c:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{show:0,testInfo:[]}},onLoad:function(n){var t=JSON.parse(n.arr);for(var e in this.show=JSON.parse(n.index),t)t[e].child_list.forEach(function(n,t){n.testing_json&&(n.testing_json=JSON.parse(n.testing_json))}),this.testInfo=t},methods:{handleChange:function(n){this.show=n},handleImg:function(t){n.previewImage({urls:["https://api.chinartn.cn/"+t]})}}};t.default=e}).call(this,e("543d")["default"])}},[["76fe","common/runtime","common/vendor"]]]);