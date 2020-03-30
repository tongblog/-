(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/sousuo/base/hotSearch"],{"540d":function(t,e,n){"use strict";var a=n("575f"),c=n.n(a);c.a},"56e8":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return c})},"575f":function(t,e,n){},"8b42":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("5776"),c=n("bec2"),r={data:function(){return{hotSearch:[]}},created:function(){this.getHotSearch()},methods:{getHotSearch:function(){var t=this;(0,c.getHotSearch)().then(function(e){t.hotSearch=e.data})},clickHot:function(t){this.$store.commit("changeHistory",t),this.$store.commit("changeSearch",t),(0,a.goWindow)("/other_pages/SearchDetail/SearchDetail")}}};e.default=r},"9ecb":function(t,e,n){"use strict";n.r(e);var a=n("56e8"),c=n("eac5");for(var r in c)"default"!==r&&function(t){n.d(e,t,function(){return c[t]})}(r);n("540d");var o=n("2877"),u=Object(o["a"])(c["default"],a["a"],a["b"],!1,null,"7075328a",null);e["default"]=u.exports},eac5:function(t,e,n){"use strict";n.r(e);var a=n("8b42"),c=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/sousuo/base/hotSearch-create-component',
    {
        'other_pages/sousuo/base/hotSearch-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9ecb"))
        })
    },
    [['other_pages/sousuo/base/hotSearch-create-component']]
]);                
