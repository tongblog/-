(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sellcars/base/VehicleData"],{3699:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=i("2e5d"),r=i("5776"),c={props:{jsonId1:{type:Object},front:{type:String},behind:{type:String},issue_date:{type:Number}},data:function(){var t=this.getDate({format:!0}),e=this.getVehicleDate({format:!0});return{array:[],index:0,array1:[],index1:0,array2:[],index2:0,date:t,vehicleDate:e,slider:!1,sliderData:0,multiArray:[[],["台湾省"]],multiindex:[0,0],provList:[],citysList:[],provId:0,cityId:0,province:"",citys:"",carName:"",brandId:0,categoryId:0,insurance:[],genre:1,archives:1,hang:0,bargain:1,price:0}},computed:{startDate:function(){return this.getDate("start")},endDate:function(){return this.getDate("end")},startVehicle:function(){return this.getVehicleDate("start")},endVehicle:function(){return this.getVehicleDate("end")}},created:function(){n=this,this.getProvince(),this.getModels()},watch:{"$store.state.cars":function(t){console.log(t),n.carName=t.brandName+" "+t.categoryName,n.brandId=t.brandId,n.categoryId=t.categoryId}},methods:{bindPickerChange2:function(t){this.index2=parseInt(t.target.value)},bindPickerChange1:function(t){this.index1=parseInt(t.target.value)},bindPickerChange:function(t){var e=this.index;if(this.index=parseInt(t.target.value),1==t.target.value)return this.$c.msg("发布挂车请先上传挂车行驶证！"),void(this.index=e)},clickBrand:function(){(0,r.goWindow)("/pages/common/brand")},bindDateChange:function(t){this.date=t.target.value},getDate:function(t){var e=new Date,i=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return"start"===t?i-=20:"end"===t&&(i+=5),n=n>9?n:"0"+n,a=a>9?a:"0"+a,"".concat(i,"-").concat(n,"-").concat(a)},bindVehicleChange:function(t){this.vehicleDate=t.target.value},getVehicleDate:function(t){var e=new Date,i=e.getFullYear(),n=e.getMonth()+1;return"start"===t?i-=20:"end"===t&&(i+=5),n=n>9?n:"0"+n,"".concat(i,"-").concat(n)},sliderChange:function(t){this.sliderData=t.detail.value,this.slider=!1},changeCheck:function(t){this.insurance=t.detail.value},changeType:function(t){this.genre=parseInt(t.detail.value)},changeArchives:function(t){this.archives=parseInt(t.detail.value)},handleHang:function(t){this.hang=parseInt(t.detail.value)},changeBargain:function(t){this.bargain=parseInt(t.detail.value)},changePrice:function(t){this.price=parseInt(t.detail.value)},clickSlider:function(){this.slider=!0},getPhone:function(e){var i=this;if(!i.validata(e.detail.value))return!1;var n=t.getStorageSync("token");""!==n?(0,a.request)("/member/isbindmobile",{token:n},"POST").then(function(t){1===t.data.data?i.judge():(0,r.goWindow)("/pages/common/phonenumber")}):(0,r.goWindow)("/pages/common/login")},judge:function(){var e=this;(0,a.request)("/member/isBindId",{token:t.getStorageSync("token")},"POST").then(function(i){1!==i.data.data?t.showModal({title:"提示",content:"请先完成实名认证!",confirmColor:"#0657A6",success:function(t){t.confirm?(0,r.goWindow)("/other_pages/RealName/RealName"):t.cancel&&console.log("用户点击取消")}}):e.pageJump()})},validata:function(t){var e="",i=this;return""==t.car_type&&""==e&&(e="车辆类型不能为空"),""==t.province&&""==e&&(e="请选择所在城市"),""==t.brands&&""==e&&(e="请选择品牌"),""==t.aip_date&&""==e&&(e="请选择年检期时间"),""==t.vehicle_date&&""==e&&(e="请选择行驶证检验有效期"),""==t.ml_num&&""==e&&(e="请选择马力"),""==t.car_type&&""==e&&(e="车辆类型不能为空"),""==t.pf_id&&""==e&&(e="请选择排放"),""==t.qd_id&&""==e&&(e="请选择驱动"),t.bx_id.length<=0&&""==e&&(e="请选择保险"),""==t.all_type&&""==e&&(e="请选择所有人"),t.ys_price<=0&&""==e&&(e="请填写车辆预售价格"),""==e||(i.$c.msg(e),!1)},pageJump:function(){Object.assign(this._data,this._props);var t=this._data;delete t.array,delete t.array1,delete t.array2,delete t.slider,delete t.multiArray,delete t.multiindex,delete t.provList,delete t.citysList,delete t.province,delete t.citys,delete t.carName,delete t.show,""!==t.behind&&""!==t.front?(t=JSON.stringify(t),0==this.hang?(0,r.goWindow)("/other_pages/VehicleImg/VehicleImg?json=",t):1==this.hang&&(0,r.goWindow)("/other_pages/daiguaSell/SellCars?json=",t)):this.$c.msg("请上传行驶证")},bindPickerCity:function(t){this.multiindex[0]=t.detail.value[0],this.multiindex[1]=t.detail.value[1],this.province=this.multiArray[0][this.multiindex[0]],this.citys=this.multiArray[1][this.multiindex[1]],this.province=this.province+","+this.citys},getProvince:function(){var t=this;(0,a.request)("/index/getProvince",{},"POST").then(function(e){var i=e.data.data;i.forEach(function(e,i){t.provList.push({province_name:e.province_name,province_id:e.province_id}),t.multiArray[0]=t.provList.map(function(t){return t.province_name})})})},columnchange:function(t){if(console.log(t),0==t.detail.column){var e=this.provList[t.detail.value].province_id;this.provId=e,this.getCitys(e)}else 1==t.detail.column&&(this.cityId=this.citysList[t.detail.value].city_id,console.log(this.cityId))},getCitys:function(t){var e=this;(0,a.request)("/index/getCity",{province_id:this.provId},"POST").then(function(t){e.citysList=[];var i=t.data.data;i.forEach(function(t,i){e.citysList.push({city_name:t.city_name,city_id:t.city_id}),e.cityId=e.citysList[0].city_id,e.multiArray[1]=e.citysList.map(function(t){return t.city_name})}),console.log(e.cityId)})},getModels:function(){var t=this;(0,a.request)("/index/getSearchCondition",{},"GET").then(function(e){var i=e.data.data.car_type,n=e.data.data.pf_type,a=e.data.data.qd_type;t.array=i.slice(1),t.array1=n.slice(1),t.array2=a.slice(1)})}}};e.default=c}).call(this,i("543d")["default"])},5472:function(t,e,i){"use strict";var n=i("935c"),a=i.n(n);a.a},"5f51":function(t,e,i){"use strict";i.r(e);var n=i("3699"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e["default"]=a.a},"75fd":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"935c":function(t,e,i){},da4a:function(t,e,i){"use strict";i.r(e);var n=i("75fd"),a=i("5f51");for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);i("5472");var c=i("2877"),s=Object(c["a"])(a["default"],n["a"],n["b"],!1,null,"2ae4bda0",null);e["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/sellcars/base/VehicleData-create-component',
    {
        'pages/sellcars/base/VehicleData-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("da4a"))
        })
    },
    [['pages/sellcars/base/VehicleData-create-component']]
]);                
