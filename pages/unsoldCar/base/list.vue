<template>
	<view>
		<view class="data-none" v-if="goodsList.length == 0">
			<image
				class="img" 
				lazy-load="true" 
				:src="'upload/applet/data-good-none.png' | filterImg" 
				mode="widthFix"></image>
		</view>
		<view class="list" @tap="handleDetails(item.goods_id,item.stock_id)" v-for="(item,index) in goodsList" :key='index'>
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event,index)" :src="item.pic_cover"
				 mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{item.goods_name}}</view>
				<view class="date">上架时间:{{transferTime(item.start_time)}} 出价截止:{{transferTime(item.end_time)}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(label,idx) in item.label_arr" :key="idx" v-if="idx < 4">{{label}}</view>
				</view>
				<view class="price">
					<text class="fixed-price">市场价</text>
					{{$c.changePrice(item.ys_price)}}万
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js' // 页面跳转
	export default {
		props:{
			carId:{
				type:Number
			},
			brandId:{
				type:Number
			}
		},
		data() {
			return {
				goodsList: [],
				page_count:0,
			}
		},
		watch:{
			carId(id){
				_this.getGoodsList();
			},
			brandId(id){
				_this.getGoodsList();
			}
		},
		created() {
			this.getGoodsList();
			_this = this;
		},
		filters:{
			filterImg(src){
				if(src){
					return config.domain + src
				}
			}
		},
		methods: {
			handleDetails(goodsId,stockId) {
				//console.log(goodsId,stockId)
				let kcId = {
					goodsId:goodsId,
					stockId:stockId
				}
				goWindow('/pages/kucunDetails/kucunDetails?id=',JSON.stringify(kcId))
			},
			// 获取商品列表
			getGoodsList(page_index = 1) {
				let _this = this;
				uni.showLoading({
					title: '加载中'
				});
				request("/index/getStockGoodsList", {
						page_index: page_index,
						page_size: 10,
						car_type: _this.carId,
						brands_id: _this.brandId
					}, "GET")
					.then((res) => {
						let data = res.data.data.data
						if(page_index > 1){
							data = this.goodsList.concat(data)
						}
						this.goodsList = data;
						this.page_count = res.data.data.page_count;
						this.$emit("changePage",page_index,this.page_count)
						setTimeout(() => {
							uni.hideLoading();
						}, 500);
					})
			},
			handleErr(e, index) {
				if (e.type == 'error') {
					this.goodsList[index].pic_cover = "../../../static/images/list.jpg"
				}
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

<style scoped>
	.data-none{
		border-bottom: 10rpx #F4F4F4 solid;
		padding: 10rpx 0;
		text-align: center;
		color: #222;
	}
	.data-none .img{
		width: 40%;
	}
	.list {
		padding: 24rpx;
		height: 140;
		border-bottom: 10rpx #F4F4F4 solid;
	}

	.list .list-imgs {
		overflow: hidden;
		display: inline-block;
		width: 256rpx;
		height: 218rpx;
		vertical-align: middle;
		border-radius: 10rpx;
	}

	.list .list-content {
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

	.list-content .date {
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .uni-flex{
		margin-top: 15rpx;
	}
	.list-content .flex-item {
		padding: 0 10rpx;
		margin-right: 25rpx;
		border: 1rpx #0657A6 solid;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #0657A6;
		text-align: center;
	}

	.list-content .price {
		font-size: 26rpx;
		color: #FF1A1A;
		font-weight: bold;
	}

	.price .fixed-price {
		display: inline-block;
		padding: 5rpx 10rpx;
		margin-right: 15rpx;
		line-height: 30rpx;
		text-align: center;
		color: #777777;
		font-size: 22rpx;
	}
</style>
