(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/tebieDetails/base/GoodsNav"],{"47bf":function(t,o,n){"use strict";n.r(o);var e=n("a8ac"),i=n("683d");for(var a in i)"default"!==a&&function(t){n.d(o,t,function(){return i[t]})}(a);n("5981c");var s=n("2877"),r=Object(s["a"])(i["default"],e["a"],e["b"],!1,null,"7aa90685",null);o["default"]=r.exports},"4abd":function(t,o,n){},"5981c":function(t,o,n){"use strict";var e=n("4abd"),i=n.n(e);i.a},"683d":function(t,o,n){"use strict";n.r(o);var e=n("d827"),i=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(o,t,function(){return e[t]})}(a);o["default"]=i.a},a8ac:function(t,o,n){"use strict";var e=function(){var t=this,o=t.$createElement;t._self._c},i=[];n.d(o,"a",function(){return e}),n.d(o,"b",function(){return i})},d827:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=n("5776"),i=n("2e5d"),a=n("971e"),s=function(){return n.e("components/uni-goods-nav/uni-goods-nav").then(n.bind(null,"be67"))},r={props:{goodsId:{type:Number},market_price:{type:String}},data:function(){return{mark:!1,options:[{icon:"/static/images/dianpu.png",text:"店铺"},{icon:"/static/images/shoucang1.png",text:"收藏"},{icon:"/static/images/lipin.png",text:"领礼品"},{icon:"/static/images/kefu.png",text:"客服"}],buttonGroup:[{text:"在线咨询",backgroundColor:"#0657A6",color:"#fff"}]}},components:{uniGoodsNav:s},methods:{handleSrc:function(o){var n=t.getStorageSync("token");1===o.index&&0==this.mark?(this.mark=!this.mark,(0,a.shoucang)(this,n,this.goodsId,this.market_price,"goods",2)):1===o.index&&1==this.mark?(this.mark=!this.mark,(0,a.quxiaosc)(this,n,this.goodsId,"goods")):3===o.index?t.makePhoneCall({phoneNumber:"03515606661"}):2===o.index&&(""!==n?(0,e.goWindow)("/pages/common/getGift"):(0,e.goWindow)("/pages/common/login?id=",this.goodsId))},buttonClick:function(o){var n=this,a=t.getStorageSync("token");0==o.index&&""!==a?(0,i.request)("/member/isbindmobile",{token:t.getStorageSync("token")},"POST").then(function(o){1===o.data.data?(0,i.request)("/order/carOrderCreate",{token:a,goods_id:n.goodsId,group_id:2,payment_type:8},"POST").then(function(o){console.log(o),o.data.code>=0?setTimeout(function(){t.redirectTo({url:"/pages/common/appointment"})},500):n.$c.msg("咨询失败,请联系客服")}):(0,e.goWindow)("/pages/common/phonenumber?id=",n.goodsId)}):(0,e.goWindow)("/pages/common/login?id=",this.goodsId)}}};o.default=r}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/tebieDetails/base/GoodsNav-create-component',
    {
        'other_pages/tebieDetails/base/GoodsNav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("47bf"))
        })
    },
    [['other_pages/tebieDetails/base/GoodsNav-create-component']]
]);                