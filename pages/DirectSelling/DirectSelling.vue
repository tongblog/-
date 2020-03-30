<template>
	<view>
		<scroll-view style="max-height: calc(100vh - 106rpx);" scroll-y="true" >
			<detail-swiper :imgList="imgList" :video="video"></detail-swiper>
			<detail-title 
				:price="price" 
				:testing="testing" 
				:introduction="introduction" 
				:sale_date="sale_date" 
				:label_arr="label_arr"
				:goods_name="goods_name"></detail-title>
			<certificate :certificate="certificate"></certificate>
			<formalities :certificate="certificate"></formalities>
			<description :description="description"></description>
			<information
				v-if="is_testing"
				:nick_name="nick_name"
				:auth_img="auth_img"
				:testing_desc="testing_desc"
				:remark="remark"
				></information>
			<dection-list v-if="is_testing" :testInfo="testInfo"></dection-list>	
		</scroll-view>
		<goods-nav
			:goodsId="goodsId" 
			:price="price" 
			:storeId="storeId" 
			:state="state"
			:fav_goods="fav_goods"></goods-nav>
		
	</view>
</template>

<script>
	//首页商品详情页面
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import DetailSwiper from './base/DetailSwiper.vue'
	import DetailTitle from './base/DetailTitle.vue'
	import Certificate from './base/certificate.vue'
	import Formalities from './base/formalities.vue'
	import Description from './base/description.vue'
	import Information from './base/information.vue'
	import DectionList from './base/DectionList.vue'
	import GoodsNav from './base/GoodsNav.vue'
	export default{
		data(){
			return{
				imgList:[],
				price:'',
				testing:0,
				introduction:'',
				certificate:[],
				testInfo:[],
				goodsId:0,
				sale_date:0,
				label_arr:[],
				description:"",
				goods_name:"",
				nick_name:"",
				auth_img:"",
				testing_desc:"",
				remark:"",
				video:"",
				storeId:0,
				state:1,
				fav_goods:0,
				is_testing:0
			}
		},
		onLoad(option) {
			let goodsId = parseInt(option.id);
			this.getDirect(goodsId);
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'pages/DirectSelling/DirectSelling?id=' + this.goodsId,
				}
			}	    
		},
		components:{
			DetailSwiper,
			DetailTitle,
			Certificate,
			Formalities,
			Description,
			Information,
			DectionList,
			GoodsNav
		},
		methods:{
			getDirect(goodsId){
				let toKen = uni.getStorageSync('token');
				this.goodsId = goodsId;
				request('/goods/goodsCarDetail',{
					token:toKen,
					goods_id:goodsId,
					group_id:3
				},"POST")
				.then((res)=>{
					let data = res.data.data;
					this.imgList = data.img_list  // 轮播数组
					this.video = data.goods_video_address  // 视频地址
					this.price = this.$c.changePrice(data.car_info.car_info.ys_price) // 价格
					this.testing = data.testing_num // 评分
					this.goods_name = data.goods_name // 名称
					this.introduction = data.introduction // 简介
					this.description = data.description // 描述
					this.sale_date = data.sale_date  // 首次上架时间
					this.label_arr = data.label_arr
					this.nick_name = data.car_info.testing_user_info.nick_name  // 检测师名称
					this.auth_img = config.domain + data.car_info.testing_user_info.testing_auth_img  // 资格证书
					this.testing_desc = data.car_info.testing_user_info.testing_desc // 检测师简介
					this.remark = data.testing_remark // 检测描述
					let baox = data.car_info.car_info.bx_id.split(",");
					this.certificate = [{
						addr:data.car_info.car_info.addr,// 地点
						car_type:data.car_info.car_info.vehicle_type, // 证车辆类型
						synx:data.car_info.car_info.synx, // 使用年限
						ml_num:data.car_info.car_info.ml_num !== 0 ? data.car_info.car_info.ml_num + "匹" : "", // 马力
						pf_name:data.car_info.car_info.pf_name == "请选择排放" ? '' : data.car_info.car_info.pf_name, //排放
						use_character:data.car_info.car_info.use_character, // 使用性质
						rl_name:data.car_info.car_info.rl_name, // 燃料类型
						engine_brand:data.car_info.car_info.engine_brand !== "0" ? data.car_info.car_info.engine_brand : "", // 发动机名称
						tyre_spec:data.car_info.car_info.tyre_spec ,// 轮胎规格
						qd_name:data.car_info.car_info.qd_name == "请选择驱动" ? '' : data.car_info.car_info.qd_name,// 驱动
						dimension:data.car_info.car_info.overall_dimension, //外轮廓尺寸
						is_dgcs_name:parseInt(data.car_info.car_info.is_dgcs) == 1 ? '有' : '无' ,// 是否带挂
						is_btd:parseInt(data.car_info.car_info.is_btd) == 1 ? "是" : "否" ,// 是否包提档
						is_dgcs:parseInt(data.car_info.car_info.is_dgcs) == 1 ? "是" : "否", // 是否带挂
						register_date:data.car_info.car_info.register_date, // 注册日期
						issue_date:data.car_info.car_info.issue_date,// 发证日期
						appproved:data.car_info.car_info.appproved_passenger_capacity, // 核定载人数
						gross_mass:data.car_info.car_info.gross_mass,// 总质量
						unladen_mass:data.car_info.car_info.unladen_mass,// 整备质量
						approved_load:data.car_info.car_info.approved_load,// 核定载质量
						traction_mass:data.car_info.car_info.traction_mass,// 准牵引总质量
						inspection_record:data.car_info.car_info.inspection_record,// 检验有效期
						bx_id:data.car_info.car_info.bx_id == "" ? "无" : "有",// 保险
						bx_name:(data.car_info.car_info.bx_name).join(","),// 保险类型
						aip_date:(data.car_info.car_info.aip_date).split("-").join(""), // 营运证年检期
						model:data.car_info.car_info.model,// 品牌型号
						all_type:parseInt(data.car_info.car_info.all_type) == 1 ? "个人" : parseInt(data.car_info.car_info.all_type) == 2 ? "企业" : "店铺", // 所有人类型
						qiangx:baox.indexOf("0") !== -1 ? "有" : "无",
						dszx:baox.indexOf("1") !== -1 ? "有" : "无",
						csx:baox.indexOf("2") !== -1 ? "有" : "无",
						// 挂车信息
						gc_certificate:[{
							gc_type:data.car_info.gc_info.vehicle_type, // 挂车车辆类型
							gc_addr:data.car_info.gc_info.addr, // 挂车所在地
							gc_character:data.car_info.gc_info.use_character, // 挂车使用性质
							gc_model:data.car_info.gc_info.model ,// 挂车品牌型号
							gc_register:data.car_info.gc_info.register_date, // 注册日期
							gc_issue:data.car_info.gc_info.issue_date,// 发证日期
							gc_synx:data.car_info.gc_info.synx, // 使用年限
							gc_gross:data.car_info.gc_info.gross_mass,// 总质量
							gc_unladen:data.car_info.gc_info.unladen_mass,// 整备质量
							gc_approved:data.car_info.gc_info.approved_load,// 核定载质量
							gc_dimension:data.car_info.gc_info.overall_dimension, //外轮廓尺寸
							gc_inspection:data.car_info.gc_info.inspection_record,// 检验有效期
							gc_zx:data.car_info.gc_info.zx_name, // 挂车轴型
						}],
					}];
					this.testInfo = data.car_info.testing_info.data; // 检测
					this.storeId = data.shop_id; // 店铺Id
					this.state = data.state; // 商品状态
					this.fav_goods = data.is_member_fav_goods; // 收藏
					this.is_testing = data.is_testing; // 是否检测
				})
			}
		},
	}
</script>

<style>
</style>
