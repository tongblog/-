(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/VehicleImg/base/NonImg"],{"6fb6":function(i,n,t){"use strict";var s=t("f6bb"),e=t.n(s);e.a},"9b6f":function(i,n,t){"use strict";var s=function(){var i=this,n=i.$createElement;i._self._c},e=[];t.d(n,"a",function(){return s}),t.d(n,"b",function(){return e})},b69b:function(i,n,t){"use strict";t.r(n);var s=t("9b6f"),e=t("cf2d");for(var o in e)"default"!==o&&function(i){t.d(n,i,function(){return e[i]})}(o);t("6fb6");var d=t("2877"),a=Object(d["a"])(e["default"],s["a"],s["b"],!1,null,"976d3432",null);n["default"]=a.exports},cf2d:function(i,n,t){"use strict";t.r(n);var s=t("edbc"),e=t.n(s);for(var o in s)"default"!==o&&function(i){t.d(n,i,function(){return s[i]})}(o);n["default"]=e.a},edbc:function(i,n,t){"use strict";(function(i){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=t("2e5d"),e=t("a7cc"),o=t("5776"),d={props:{newJson:{type:Object},imgId1:{type:String},imgId2:{type:String},imgId3:{type:String},imgId4:{type:String},videoSrc:{type:String,default:"0"}},data:function(){return{placeholder:"请填写车辆重大损伤及车辆用途的一些说明(限100字)",editorCtx:"",imgUrl1:"",imgUrl2:"",imgUrl3:"",imgUrl4:"",imgUrl5:"",imgUrl6:"",imgUrl7:"",imgUrl8:"",imgUrl9:"",imgId5:"0",imgId6:"0",imgId7:"0",imgId8:"0",imgId9:"0",imgId10:"0",imgId11:"0",imgId12:"0",imgId13:"0"}},methods:{onInput:function(i){this.editorCtx=i.detail.text},clickBinterior:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl1="https://api.chinartn.cn/"+n.img_path,i.imgId5=n.picture_id})},clickAinterior:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl2="https://api.chinartn.cn/"+n.img_path,i.imgId6=n.picture_id})},tapEngineLe:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl3="https://api.chinartn.cn/"+n.img_path,i.imgId7=n.picture_id})},tapEngineRi:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl4="https://api.chinartn.cn/"+n.img_path,i.imgId8=n.picture_id})},tapRearLe:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl5="https://api.chinartn.cn/"+n.img_path,i.imgId9=n.picture_id})},tapRearRi:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl6="https://api.chinartn.cn/"+n.img_path,i.imgId10=n.picture_id})},tapFrontLe:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl7="https://api.chinartn.cn/"+n.img_path,i.imgId11=n.picture_id})},tapFrontRi:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl8="https://api.chinartn.cn/"+n.img_path,i.imgId12=n.picture_id})},tapDamage:function(){var i=this;(0,e.upload)("upload/goods/",0).then(function(n){i.imgUrl9="https://api.chinartn.cn/"+n.img_path,i.imgId13=n.picture_id})},handleConfirm:function(){""!==this.imgId1&&""!==this.imgId2&&""!==this.imgId3&&""!==this.imgId4?""!==this.editorCtx?this.confirmData():this.$c.msg("请填写车辆描述"):this.$c.msg("请上传必填照片")},confirmData:function(){this.newJson.jsonId1.inspection_record=this.newJson.vehicleDate;var n=this.newJson.jsonData,t=this,e=parseInt(this.imgId1),d=this.imgId1+","+this.imgId2+","+this.imgId3+","+this.imgId4+","+this.imgId5+","+this.imgId6+","+this.imgId7+","+this.imgId8+","+this.imgId9+","+this.imgId10+","+this.imgId11+","+this.imgId12+","+this.imgId13,a=this.newJson.provId,r=this.newJson.cityId,c=this.newJson.price,h=JSON.stringify(this.newJson.jsonId1),g=this.newJson.is_hand,p={carcard_json:h,card_1:this.newJson.front,card_2:this.newJson.behind,brands_id:this.newJson.brandId,car_type:this.newJson.index+1,system_id:this.newJson.categoryId,province_id:this.newJson.provId,city_id:this.newJson.cityId,synx:this.newJson.issue_date,ml_num:this.newJson.sliderData,pf_id:this.newJson.index1+1,qd_id:this.newJson.index2+1,bx_id:this.newJson.insurance,is_dgcs:this.newJson.hang,all_type:this.newJson.genre,is_yj:this.newJson.bargain,is_btd:this.newJson.archives,sale_price:this.newJson.price,aip_date:this.newJson.date},u=JSON.stringify(p),_=JSON.stringify(this.newJson.guaId1),m={gc_carcard_json:_,carcard_json:h,card_1:this.newJson.front,card_2:this.newJson.behind,brands_id:this.newJson.brandId,car_type:this.newJson.index+1,system_id:this.newJson.categoryId,province_id:this.newJson.provId,city_id:this.newJson.cityId,synx:this.newJson.issue_date,ml_num:this.newJson.sliderData,pf_id:this.newJson.index1+1,qd_id:this.newJson.index2+1,bx_id:this.newJson.insurance,is_dgcs:this.newJson.hang,all_type:this.newJson.genre,is_yj:this.newJson.bargain,is_btd:this.newJson.archives,sale_price:this.newJson.price,gc_brands_id:this.newJson.gc_brandId,gc_system_id:this.newJson.gc_categoryId,gc_all_type:this.newJson.genre,gc_is_yj:this.newJson.bargain,card_gua_1:this.newJson.before,card_gua_2:this.newJson.after,car_gc_zx:parseInt(this.newJson.shaftIdx)+1,car_dg_price:this.newJson.price,aip_date:this.newJson.date};g&&(m.carcard_json=_,m.car_type=this.newJson.modelIdx+1,m.synx=this.newJson.gua_date,m.card_1=this.newJson.before,m.card_2=this.newJson.after);var l=JSON.stringify(m);n?t.$c.appletMessageNotify("verify_end",1).then(function(n){(0,s.request)("/goods/applyCarGoods",{token:i.getStorageSync("token"),product:JSON.stringify({used_car_json:l,description:t.editorCtx,picture:e,imageArray:d,city_id:r,province_id:a,sale_price:c,goods_video_address:t.videoSrc})},"POST").then(function(i){var n=parseInt(i.data.data);n>0&&(0,o.goWindow)("/pages/common/release")})}):t.$c.appletMessageNotify("verify_end",1).then(function(n){(0,s.request)("/goods/applyCarGoods",{token:i.getStorageSync("token"),product:JSON.stringify({used_car_json:u,description:t.editorCtx,picture:e,imageArray:d,province_id:a,city_id:r,sale_price:c,goods_video_address:t.videoSrc})},"POST").then(function(i){var n=parseInt(i.data.data);n>0&&(0,o.goWindow)("/pages/common/release")})})}}};n.default=d}).call(this,t("543d")["default"])},f6bb:function(i,n,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'other_pages/VehicleImg/base/NonImg-create-component',
    {
        'other_pages/VehicleImg/base/NonImg-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b69b"))
        })
    },
    [['other_pages/VehicleImg/base/NonImg-create-component']]
]);                
