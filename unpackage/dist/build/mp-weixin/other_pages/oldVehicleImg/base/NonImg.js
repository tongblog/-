(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/oldVehicleImg/base/NonImg"],{1089:function(i,t,n){"use strict";var r=function(){var i=this,t=i.$createElement;i._self._c},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},"5fca":function(i,t,n){"use strict";var r=n("7310"),a=n.n(r);a.a},6055:function(i,t,n){"use strict";n.r(t);var r=n("d856"),a=n.n(r);for(var c in r)"default"!==c&&function(i){n.d(t,i,function(){return r[i]})}(c);t["default"]=a.a},7310:function(i,t,n){},9539:function(i,t,n){"use strict";n.r(t);var r=n("1089"),a=n("6055");for(var c in a)"default"!==c&&function(i){n.d(t,i,function(){return a[i]})}(c);n("5fca");var o=n("2877"),e=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,"81090dfe",null);t["default"]=e.exports},d856:function(i,t,n){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2e5d"),a=n("a7cc"),c=(n("5776"),{props:{newJson:{type:Object},imgSrc1:{type:String},imgSrc2:{type:String},imgSrc3:{type:String},imgSrc4:{type:String},videoSrc:{type:String}},data:function(){return{placeholder:"请填写车辆重大损伤及车辆用途的一些说明(限100字)",editorCtx:"",imgUrl1:"",imgUrl2:"",imgUrl3:"",imgUrl4:"",imgUrl5:"",imgUrl6:"",imgUrl7:"",imgUrl8:"",imgUrl9:"",imgSrc5:"0",imgSrc6:"0",imgSrc7:"0",imgSrc8:"0",imgSrc9:"0",imgSrc10:"0",imgSrc11:"0",imgSrc12:"0",imgSrc13:"0"}},methods:{onInput:function(i){this.editorCtx=i.detail.text},clickBinterior:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl1="https://api.chinartn.cn/"+t.img_path,i.imgSrc5=t.img_path})},clickAinterior:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl2="https://api.chinartn.cn/"+t.img_path,i.imgSrc6=t.img_path})},tapEngineLe:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl3="https://api.chinartn.cn/"+t.img_path,i.imgSrc7=t.img_path})},tapEngineRi:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl4="https://api.chinartn.cn/"+t.img_path,i.imgSrc8=t.img_path})},tapRearLe:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl5="https://api.chinartn.cn/"+t.img_path,i.imgSrc9=t.img_path})},tapRearRi:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl6="https://api.chinartn.cn/"+t.img_path,i.imgSrc10=t.img_path})},tapFrontLe:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl7="https://api.chinartn.cn/"+t.img_path,i.imgSrc11=t.img_path})},tapFrontRi:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl8="https://api.chinartn.cn/"+t.img_path,i.imgSrc12=t.img_path})},tapDamage:function(){var i=this;(0,a.upload)("upload/goods/",0).then(function(t){i.imgUrl9="https://api.chinartn.cn/"+t.img_path,i.imgSrc13=t.img_path})},handleConfirm:function(){""!==this.imgSrc1&&""!==this.imgSrc2&&""!==this.imgSrc3&&""!==this.imgSrc4?""!==this.editorCtx?this.confirmData():this.$c.msg("请填写车辆描述"):this.$c.msg("请上传必填照片")},confirmData:function(){var t=this;console.log(this.newJson);var n=this.newJson.price,a=JSON.stringify(this.newJson.posData),c=this.newJson.posImg,o=this.newJson.revImg,e=this.newJson.brandId,s=parseInt(this.newJson.index)+1,g=this.imgSrc1+","+this.imgSrc2+","+this.imgSrc3+","+this.imgSrc4+","+this.imgSrc5+","+this.imgSrc6+","+this.imgSrc7+","+this.imgSrc8+","+this.imgSrc9+","+this.imgSrc10+","+this.imgSrc11+","+this.imgSrc12+","+this.imgSrc13;(0,r.request)("/order/createChangeCarOrder",{token:i.getStorageSync("token"),ys_price:n,car_json:a,card_1:c,card_2:o,car_type:s,brands_id:e,car_desc:t.editorCtx,img_json:g,video_src:t.videoSrc},"POST").then(function(t){var n=parseInt(t.data.data);n>0?i.showModal({title:"提示",content:"车辆审核中,经销商将尽快与您联系,请耐心等待!",showCancel:!1,confirmColor:"#0657A6",success:function(t){t.confirm&&i.reLaunch({url:"/pages/index/index"})}}):i.showToast({title:"信息填写有误,请重新填写",icon:"none",duration:3e3,mask:!0})})}}});t.default=c}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/oldVehicleImg/base/NonImg-create-component',
    {
        'other_pages/oldVehicleImg/base/NonImg-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9539"))
        })
    },
    [['other_pages/oldVehicleImg/base/NonImg-create-component']]
]);                