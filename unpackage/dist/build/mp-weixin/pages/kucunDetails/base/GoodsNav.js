(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/kucunDetails/base/GoodsNav"],{"3db6":function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},i=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return i})},"5ec7":function(t,n,o){"use strict";o.r(n);var e=o("3db6"),i=o("6144");for(var a in i)"default"!==a&&function(t){o.d(n,t,function(){return i[t]})}(a);o("860b");var s=o("2877"),c=Object(s["a"])(i["default"],e["a"],e["b"],!1,null,"27ceabef",null);n["default"]=c.exports},6144:function(t,n,o){"use strict";o.r(n);var e=o("6194"),i=o.n(e);for(var a in e)"default"!==a&&function(t){o.d(n,t,function(){return e[t]})}(a);n["default"]=i.a},6194:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o("5776"),i=o("2e5d"),a=o("971e"),s=function(){return o.e("components/uni-goods-nav/uni-goods-nav").then(o.bind(null,"be67"))},c={props:{promotion:{type:Object},kcId:{type:Object},price:{type:String}},data:function(){return{mark:!1,options:[{icon:"/static/images/dianpu.png",text:"店铺"},{icon:"/static/images/shoucang1.png",text:"收藏"},{icon:"/static/images/lipin.png",text:"领礼品"},{icon:"/static/images/kefu.png",text:"客服"}],buttonGroup:[{text:"出价",backgroundColor:"#981628",color:"#fff"}]}},components:{uniGoodsNav:s},methods:{handleSrc:function(n){var o=t.getStorageSync("token");1===n.index&&0==this.mark?(this.mark=!this.mark,(0,a.shoucang)(this,o,this.kcId.goodsId,this.price,"goods",1,this.kcId.stockId)):1===n.index&&1==this.mark?(this.mark=!this.mark,(0,a.quxiaosc)(this,o,this.kcId.goodsId,"goods",this.kcId.stockId)):3===n.index?t.makePhoneCall({phoneNumber:"03515606661"}):2===n.index&&(""!==o?(0,e.goWindow)("/pages/common/getGift"):(0,e.goWindow)("/pages/common/login?id=",this.goodsId))},buttonClick:function(n){var o=t.getStorageSync("token"),a=JSON.stringify(this.promotion),s=JSON.stringify(this.kcId);0==n.index&&""!==o?(0,i.request)("/member/isbindmobile",{token:o},"POST").then(function(t){console.log(t.data),1===t.data.data?(0,e.goWindow)("/pages/kucunDetails/base/discounts?id=",a):(0,e.goWindow)("/pages/common/phonenumber?id=",s)}):(0,e.goWindow)("/pages/common/login?id=",s)}}};n.default=c}).call(this,o("543d")["default"])},"860b":function(t,n,o){"use strict";var e=o("eb83"),i=o.n(e);i.a},eb83:function(t,n,o){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/kucunDetails/base/GoodsNav-create-component',
    {
        'pages/kucunDetails/base/GoodsNav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5ec7"))
        })
    },
    [['pages/kucunDetails/base/GoodsNav-create-component']]
]);                
