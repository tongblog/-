<template>
	<view>
		<view class="data-none" v-if="goodsList.length == 0">
			<image
				class="img" 
				lazy-load="true" 
				:src="'upload/applet/data-good-none.png' | filterImg" 
				mode="widthFix"></image>
		</view>
		<view class="list" @tap="clickDetails(item.goods_id)" v-for="(item,index) in goodsList" :key='index'>
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" @error="handleErr($event,index)" :src="item.pic_cover" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{item.goods_name}}</view>
				<view class="date">厂商指导价:{{$c.changePrice(item.group_price_2)}}万</view>
				<view class="price">
					{{$c.changePrice(item.ys_price)}}<text>万开回家</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _this = this
	import config from '@/api/config.js'
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js' // 页面跳转
	export default{
		data(){
			return{
				goodsList: [],
				page_count: 0,
			}
		},
		props:{
			num:{
				type:String
			},
			carId:{
				type:String
			},
			brandId:{
				type:String
			},
			priceIndex:{
				type:Number
			},
			min:{
				type:String
			},
			max:{
				type:String
			},
			gather:{
				type:Boolean
			},
			pfId:{
				type:String
			},
			qdId:{
				type:String
			},
			min_ml:{
				type:String
			},
			max_ml:{
				type:String
			}
			
		},
		created() {
			_this = this
			this.getGoodsList()
		
		},
		watch:{
			num(num){
				_this.getGoodsList()
			},
			carId(id){
				_this.getGoodsList()
			},
			brandId(){
				_this.getGoodsList()
			},
			priceIndex(id){
				_this.getGoodsList();
				id = "";
			},
			gather(bool){
				if(bool){
					_this.getGoodsList();
					this.$emit("handleGather",false)
				}
			}
		},
		filters:{
			filterImg(src){
				if(src){
					return config.domain + src
				}
			}
		},
		methods:{
			clickDetails(goodsId){
				goWindow('/other_pages/tebieDetails/tebieDetails?id=',goodsId)
			},
			// 获取商品列表
			getGoodsList(page_index = 1) {
				let _this = this;
				this.$store.commit("changeGroup",2) 
				request("/index/getUsedCarGoodsList", {
						page_index: page_index,
						page_size: 10,
						group_id:2,
						ai_sort:this.num,
						car_type:this.carId,
						brands_id:this.brandId,
						min_price:this.min,
						max_price:this.max,
						pf_id:this.pfId,
						qd_id:this.qdId,
						min_ml:this.min_ml,
						max_ml:this.max_ml,
					}, "GET")
					.then((res) => {
						this.$c.showLoading("加载中")
						let data = res.data.data.data
						if(page_index > 1){
							data = this.goodsList.concat(data)
						}
						this.goodsList = data;
						this.page_count = res.data.data.page_count;
						this.$emit("changePage",page_index,this.page_count)
						setTimeout(() => {
							uni.hideLoading();
						}, 300);
					})
			},
			handleErr(e, index) {
				if (e.type == 'error') {
					this.goodsList[index].pic_cover = "../../../static/images/list.jpg"
				}
			}
		}
	}
</script>
	
<style scoped>
	.data-none{
		padding: 10rpx 0;
		border-bottom: 10rpx #F4F4F4 solid;
		text-align: center;
		color: #222;
	}
	.data-none .img{
		width: 40%;
	}
	.list{
		padding: 24rpx;
		height: 140;
		border-bottom: 10rpx #F4F4F4 solid;
	}
	.list .list-imgs{
		overflow: hidden;
		display: inline-block;
		width: 256rpx;
		height: 218rpx;
		vertical-align: middle;
		border-radius: 10rpx;
	}
	.list .list-content{
		display: inline-block;
		width: 418rpx;
		height: 100%;
		vertical-align: middle;
		margin-left: 3%;
	}
	.list-content .title {
		line-height: 42rpx;
		color: #222222;
	}
	
	.list-content .date{
		padding: 30rpx 0;
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .price{
		font-size: 26rpx;
		color: #FF1A1A;
		font-weight: bold;
	}
	.price text{
		font-size: 23rpx;
		color: #FF1A1A;
		font-weight: normal;
	}
		
			
</style>
