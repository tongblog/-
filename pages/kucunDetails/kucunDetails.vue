<template>
	<view>
		<scroll-view style="max-height: calc(100vh - 106rpx);" scroll-y="true" >
			<detail-swiper :imgList="imgList" :price="price" :video="video"></detail-swiper>
				<detail-title 
					:introduction='introduction' 
					:start_time="start_time" 
					:end_time="end_time" 
					:label_arr="label_arr"
					:goods_name="goods_name"></detail-title>
				<parameter :arr1="arr1" :attribute="attribute"></parameter>
		</scroll-view>
		<goods-nav
			:promotion="promotion" 
			:kcId="kcId" 
			:price="price" 
			:storeId="storeId" 
			:state="state"
			:fav_goods="fav_goods"></goods-nav>
	</view>	
</template>

<script>
	// 库存车商品详情页面
	import {request} from '@/api/reques.js'
	import DetailTitle from './base/DetailTitle.vue'
	import DetailSwiper from './base/DetailSwiper.vue'
	import Parameter from './base/Parameter.vue'
	import GoodsNav from './base/GoodsNav.vue'
	export default{
		data(){
			return{
				imgList:[],
				price:'',
				introduction:'', // 简介
				start_time:"00",
				end_time:"00",
				promotion:{},
				attribute:[],
				arr1:[],
				label_arr:[],
				kcId:{},
				goods_name:"",
				video:"",
				storeId:0,
				state:1,
				fav_goods:0
			}
		},
		components:{
			DetailTitle,
			DetailSwiper,
			Parameter,
			GoodsNav
		},
		onLoad(option) {
			let kcId = JSON.parse(option.id);
			this.kcId = kcId;
			this.getDirect(kcId.goodsId,kcId.stockId);
			//console.log(kcId.goodsId,kcId.stockId)
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'pages/kucunDetails/kucunDetails?id=' + JSON.stringify(this.kcId)
				}
			}
			    
		},
		methods:{
			getDirect(goodsId,stockId){
				//this.goodsId = goodsId;
				let toKen = uni.getStorageSync('token');
				request('/goods/goodsCarDetail',{
					token:toKen,
					goods_id:goodsId,
					group_id:1,
					promotion_id:stockId,
				},"POST")
				.then((res)=>{
					let data = res.data.data;
					this.imgList = data.img_list  // 轮播数组
					this.video = data.goods_video_address  // 视频地址
					this.goods_name = data.goods_name // 名字
					this.price = this.$c.changePrice(data.car_info.car_info.ys_price) // 价格
					this.introduction = data.introduction // 描述
					this.label_arr = data.label_arr;
					let baox = data.car_info.car_info.bx_id.split(",");
					this.start_time = this.transferTime(data.promotion_info.start_time);
					this.end_time = this.transferTime(data.promotion_info.end_time);
					this.promotion = data.promotion_info;
					
					let attribute = data.attribute_arr; // 参数
					this.arr1 = attribute.splice(0,2);
					this.attribute = attribute;
					this.storeId = data.shop_id; // 店铺Id
					this.state = data.state;
					this.fav_goods = data.is_member_fav_goods; // 收藏
					this.is_testing = data.is_testing; // 是否检测
				})
			},
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = m+ "-" +d;
				return newDate
			}
		}
	}
</script>

<style>
</style>
