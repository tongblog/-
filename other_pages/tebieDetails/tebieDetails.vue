<template>
	<view>
		<scroll-view style="max-height: calc(100vh - 106rpx);" scroll-y="true" >
			<detail-swiper :imgList="imgList" :video="video"></detail-swiper>
			<detail-title 
				:introduction="introduction" 
				:market_price="market_price" 
				:ys_price="ys_price" 
				:goods_name="goods_name"></detail-title>
			<parameter :arr1="arr1" :attribute="attribute"></parameter>
		</scroll-view>
		
		<goods-nav 
			:goodsId="goodsId" 
			:ys_price="ys_price" 
			:storeId="storeId" 
			:state="state"
			:fav_goods="fav_goods"></goods-nav>
	</view>
</template>

<script>
	// 特别推荐商品详情页面
	import {request} from '@/api/reques.js'
	import DetailTitle from './base/DetailTitle.vue'
	import DetailSwiper from './base/DetailSwiper.vue'
	import Parameter from './base/Parameter.vue'
	import GoodsNav from './base/GoodsNav.vue'
	export default{
		data(){
			return{
				imgList:[],
				introduction:"",
				market_price:"",
				ys_price:"",
				attribute:[],
				arr1:[],
				goodsId:0,
				goods_name:"",
				video:"",
				storeId:0,
				state:1,
				fav_goods:0
			}
		},
		onLoad(option) {
			let goodsId = parseInt(option.id);
			this.getTebie(goodsId)
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: '/other_pages/tebieDetails/tebieDetails?id=' + this.goodsId,
				}
			}	    
		},
		components:{
			DetailTitle,
			DetailSwiper,
			Parameter,
			GoodsNav
		},
		methods:{
			getTebie(goodsId){
				let toKen = uni.getStorageSync('token');
				this.goodsId = goodsId;
				request("/goods/goodsCarDetail",{
					token:toKen,
					goods_id:goodsId,
					group_id:2
				},"POST")
				.then((res)=>{
					let data = res.data.data;
					this.imgList = data.img_list  // 轮播数组
					this.video = data.goods_video_address  // 视频地址
					this.introduction = data.introduction //商品简介
					this.market_price = this.$c.changePrice(data.car_info.car_info.group_price_2)  // 厂商指导价
					this.ys_price = this.$c.changePrice(data.car_info.car_info.ys_price) // 预售价格
					this.goods_name = data.goods_name // 名称
					let attribute = data.attribute_arr // 参数
					//console.log(data)
					this.arr1 = attribute.splice(0,2)
					this.attribute = attribute
					this.storeId = data.shop_id // 店铺Id
					this.state = data.state; // 商品状态
					this.fav_goods = data.is_member_fav_goods; // 收藏
				})
			}
		}
	}
</script>

<style>
</style>
