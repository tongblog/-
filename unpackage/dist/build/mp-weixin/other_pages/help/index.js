(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/help/index"],{1520:function(e,t,n){"use strict";n.r(t);var a=n("eeeb"),o=n("f179");for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);var r=n("2877"),u=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,null,null);t["default"]=u.exports},"1cfa":function(e,t,n){"use strict";(function(e){n("4a58"),n("921b");a(n("66fd"));var t=a(n("1520"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},eeeb:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o})},ef50:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("6546")),o=i(n("92ba"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}var u={data:function(){return{info:{},help_id:0,help_url:""}},components:{},onLoad:function(e){var t=this,n=e.help_id||0;t.help_url=o.default.domain+"wap/help/index?help_id="+n,t.help_id=n,console.log(t.help_url),t.getData()},methods:{getData:function(){var t=this;a.getHelpContent({help_id:t.help_id}).then(function(n){t.$c.showLoading("加载中"),void 0==n.data||null==n.data?(t.$c.msg("信息错误"),setTimeout(function(){t.$c.hideLoading(),t.$c.goUrl("",3)},1500)):(e.setNavigationBarTitle({title:n.data.title}),t.article=n.data.content,setTimeout(function(){t.$c.hideLoading(),t.info=n.data},500))})},preview:function(e,t){},navigate:function(e,t){}}};t.default=u}).call(this,n("543d")["default"])},f179:function(e,t,n){"use strict";n.r(t);var a=n("ef50"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=o.a}},[["1cfa","common/runtime","common/vendor"]]]);