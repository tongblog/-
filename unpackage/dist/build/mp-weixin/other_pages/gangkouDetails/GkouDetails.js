(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["other_pages/gangkouDetails/GkouDetails"],{2613:function(n,i,e){"use strict";(function(n){e("4a58"),e("921b");a(e("66fd"));var i=a(e("976d"));function a(n){return n&&n.__esModule?n:{default:n}}n(i.default)}).call(this,e("543d")["createPage"])},"67d2":function(n,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e("2e5d"),o=function(){return e.e("other_pages/gangkouDetails/base/DetailSwiper").then(e.bind(null,"6514"))},r=function(){return e.e("other_pages/gangkouDetails/base/DetailTitle").then(e.bind(null,"ea3c"))},t=function(){return e.e("other_pages/gangkouDetails/base/certificate").then(e.bind(null,"c044"))},c=function(){return e.e("other_pages/gangkouDetails/base/formalities").then(e.bind(null,"006a"))},_=function(){return e.e("other_pages/gangkouDetails/base/description").then(e.bind(null,"e8d0"))},s=function(){return e.e("other_pages/gangkouDetails/base/information").then(e.bind(null,"1b30"))},f=function(){return e.e("other_pages/gangkouDetails/base/DectionList").then(e.bind(null,"d857"))},d=function(){return Promise.all([e.e("common/vendor"),e.e("other_pages/gangkouDetails/base/GoodsNav")]).then(e.bind(null,"ec2a"))},g={data:function(){return{imgList:[],price:"",testing:0,introduction:"",certificate:[],testInfo:[],goodsId:0,label_arr:[],description:"",goods_name:"",nick_name:"",auth_img:"",testing_desc:"",remark:"",video:""}},onLoad:function(n){var i=parseInt(n.id);this.getDirect(i)},components:{DetailSwiper:o,DetailTitle:r,Certificate:t,Formalities:c,Description:_,Information:s,DectionList:f,GoodsNav:d},methods:{getDirect:function(n){var i=this;this.goodsId=n,(0,a.request)("/goods/goodsCarDetail",{goods_id:n,group_id:4},"POST").then(function(n){var e=n.data.data;console.log(e),i.imgList=e.img_list,i.video=e.goods_video_address,i.price=i.$c.changePrice(e.car_info.car_info.ys_price),i.testing=e.testing_num,i.goods_name=e.goods_name,i.introduction=e.introduction,i.label_arr=e.label_arr,i.description=e.description,i.nick_name=e.car_info.testing_user_info.nick_name,i.auth_img="https://api.chinartn.cn/"+e.car_info.testing_user_info.testing_auth_img,i.testing_desc=e.car_info.testing_user_info.testing_desc,i.remark=e.testing_remark;var a=e.car_info.car_info.bx_id.split(",");i.certificate=[{addr:e.car_info.car_info.addr,car_type:e.car_info.car_info.vehicle_type,synx:e.car_info.car_info.synx,ml_num:e.car_info.car_info.ml_num,pf_name:e.car_info.car_info.pf_name,use_character:e.car_info.car_info.use_character,rl_name:e.car_info.car_info.rl_name,aip_date:e.car_info.car_info.aip_date.split("-").join(""),engine_brand:e.car_info.car_info.engine_brand,tyre_spec:e.car_info.car_info.tyre_spec,qd_name:e.car_info.car_info.qd_name,dimension:e.car_info.car_info.overall_dimension,is_dgcs_name:1==parseInt(e.car_info.car_info.is_dgcs)?"有":"无",is_btd:1==parseInt(e.car_info.car_info.is_btd)?"是":"否",is_dgcs:1==parseInt(e.car_info.car_info.is_dgcs)?"是":"否",register_date:e.car_info.car_info.register_date,issue_date:e.car_info.car_info.issue_date,appproved:e.car_info.car_info.appproved_passenger_capacity,gross_mass:e.car_info.car_info.gross_mass,unladen_mass:e.car_info.car_info.unladen_mass,approved_load:e.car_info.car_info.approved_load,traction_mass:e.car_info.car_info.traction_mass,inspection_record:e.car_info.car_info.inspection_record,bx_id:""==e.car_info.car_info.bx_id?"无":"有",bx_name:e.car_info.car_info.bx_name.join(","),model:e.car_info.car_info.model,all_type:1==parseInt(e.car_info.car_info.all_type)?"个人":2==parseInt(e.car_info.car_info.all_type)?"企业":"店铺",qiangx:-1!==a.indexOf("0")?"有":"无",dszx:-1!==a.indexOf("1")?"有":"无",csx:-1!==a.indexOf("2")?"有":"无",gc_certificate:[{gc_type:e.car_info.gc_info.vehicle_type,gc_addr:e.car_info.gc_info.addr,gc_character:e.car_info.gc_info.use_character,gc_model:e.car_info.gc_info.model,gc_register:e.car_info.gc_info.register_date,gc_issue:e.car_info.gc_info.issue_date,gc_synx:e.car_info.gc_info.synx,gc_gross:e.car_info.gc_info.gross_mass,gc_unladen:e.car_info.gc_info.unladen_mass,gc_approved:e.car_info.gc_info.approved_load,gc_dimension:e.car_info.gc_info.overall_dimension,gc_inspection:e.car_info.gc_info.inspection_record,gc_zx:e.car_info.gc_info.zx_name}]}],i.testInfo=e.car_info.testing_info.data})}}};i.default=g},"976d":function(n,i,e){"use strict";e.r(i);var a=e("9884"),o=e("f0bb");for(var r in o)"default"!==r&&function(n){e.d(i,n,function(){return o[n]})}(r);var t=e("2877"),c=Object(t["a"])(o["default"],a["a"],a["b"],!1,null,null,null);i["default"]=c.exports},9884:function(n,i,e){"use strict";var a=function(){var n=this,i=n.$createElement;n._self._c},o=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return o})},f0bb:function(n,i,e){"use strict";e.r(i);var a=e("67d2"),o=e.n(a);for(var r in a)"default"!==r&&function(n){e.d(i,n,function(){return a[n]})}(r);i["default"]=o.a}},[["2613","common/runtime","common/vendor"]]]);