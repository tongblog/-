<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view v-if="data_list.length > 0">
			<view 
				class="list" 
				@tap="handleDetail(item.group_id,item.promotion_id,item.goods_id,item.promotion_info.start_time,item.promotion_info.end_time)"
				v-for="(item, index) in data_list" 
				:key="index">
				<view class="list-imgs">
					<image 
						style="width: 100%; height: 100%;" 
						lazy-load="true" 
						@error="handleErr($event, index)" 
						:src="item.goods_info.pic_cover" 
						mode="scaleToFill"></image>
				</view>
				<view class="list-content" :class="{borderbtm:status == -1}">
					<view class="title">{{ item.goods_info.goods_name }}</view>
					<view class="date">{{ item.goods_info.introduction }}</view>

					<view class="uni-flex uni-row">
						<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{ item2 }}</view>
					</view>
					<view class="price1 price" v-if="status !== -1">
						<text>{{item.group_id == 1 ? '市场价' : '最高出价'}}:</text>
						{{ item.group_id == 1 ? $c.changePrice(item.promotion_info.price) : $c.changePrice(item.max_offer_price) }} 万
					</view>
					<view class="price1 price" v-if="status == -1">
						<text>价格:</text>
						{{$c.changePrice(item.goods_info.price)}} 万
					</view>
					
					<view class="price" v-if="status !== -1">
						<text>{{status == 1 ? '最终出价' : '最新出价'}}:</text>{{$c.changePrice(item.self_max_offer_price)}} 万
						<view class="status_name" v-if="status == 1 && item.group_id == 1">
							{{item.status == 2 ? '竞拍失败' : '竞拍成功'}}
						</view>
						<view class="status_name" v-if="status == 1 && item.group_id == 5">
							{{item.status == 2 ? '交易失败' : '交易成功'}}
						</view>
					</view>
					<view class="price" v-if="status == -1">
						<text>申请优惠车价:</text>{{$c.changePrice(item.offer_price)}} 万
						
					</view>
					<!-- <view class="cancel-fav" v-on:click="cancelFavorites(item.fav_id)">取消收藏</view> -->
				</view>
				<view 
					class="accept" 
					v-if="status == -1" 
					@tap.stop="placeOrder(item.goods_id,item.group_id,item.id,item.offer_price)">我要看车</view>
			</view>
		</view>
		<view class="data-none" v-else>暂无相关数据!</view>
		<orderTime
			v-if="order_time" 
			@handleClose="handleClose"
			@handleDate="handleDate"></orderTime>
	</scroll-view>
</template>

<script>
// 首页商品
import * as MemberApi from '@/api/member/member.js';
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import orderTime from "@/pages/common/orderTime.vue"
import config from '@/api/config.js';
export default {
	data() {
		return {
			order_time:false,
			data_list: [],
			page_index: 1,
			page_count: 0,
			goodsJson:{},
		};
	},
	props: {
		options: {
			type: Object,
			default: () => {
				return {};
			}
		},
		status: {
			type: Number,
			default: -1
		},
	},
	watch: {
		status(e){
			let _this = this
			_this.page_idnex = 1
			_this.status = e
			_this.getData(_this.page_idnex)
		}
	},
	components:{
		orderTime
	},
	created() {
		
	},

	methods: {
		// 页面跳转
		handleDetail(group_id,action_id,goods_id){
			let auction = {
				action_id,
				goods_id,
			};
			let kcId = {
				goodsId:goods_id,
				stockId:action_id
			};
			if(group_id == 1){
				goWindow('/pages/kucunDetails/kucunDetails?id=',JSON.stringify(kcId))
			}else if(group_id == 5){
				goWindow('/pages/auctionDetails/auctionDetails?json=',JSON.stringify(auction))
			}else if(group_id == 3){
				goWindow('/pages/DirectSelling/DirectSelling?id=',goods_id)
			}
			
		},

		getData(page_index) {
			let _this = this;
			this.data_list = [];
			MemberApi.getMemberPromotionOfferRecords({
				page_index: page_index,
				status: _this.status == -1 ? "" : _this.status,
				get_type: _this.status == -1 ? 3 : 0,
			}).then(res => {
				uni.showLoading({
					title: '加载中'
				});
				let data = res.data.data;
				
				for (let index in data) {
					data[index].goods_info.pic_cover = config.domain + data[index].goods_info.pic_cover;
					
				}
				if (page_index > 1) {
					data = _this.data_list.concat(data);
				}
				setTimeout(() => {
					this.data_list = data;
					//console.log(this.data_list)
					this.page_count = res.data.page_count;
					uni.hideLoading();
				}, 500);
			});
		},
		loadData(e) {
			let _this = this;
			if (_this.page_index < _this.page_count) {
				_this.page_index++;
			} else {
				return;
			}
			_this.getData(_this.page_index);
		},
		handleErr(e, index) {
			if (e.type == 'error') {
				this.data_list[index].goods_info.pic_cover = '/static/images/list.jpg';
			}
		},
		goUrl(url){
			let _this = this;
			_this.$c.goUrl(url)
		},
		// 议价我要看车
		placeOrder(goods_id,group_id,id,offer_price){
			let _this = this;
			_this.order_time = true;
			_this.goodsJson.goods_id = goods_id;
			_this.goodsJson.group_id = group_id;
			_this.goodsJson.id = id;
			_this.goodsJson.offer_price = offer_price;
		},
		handleClose(bool){
			this.order_time = bool;
		},
		// 我要看车
		handleDate(date){
			let _this = this;
			_this.order_time = false;
			uni.showLoading({
				title: '加载中'
			});
			MemberApi.carOrderCreate({
				goods_id: _this.goodsJson.goods_id,
				group_id: _this.goodsJson.group_id,
				payment_type:7,
				discount_money: _this.goodsJson.offer_price,
				reserv_date:date,
				offer_id: _this.goodsJson.id,
			})
			.then(res => {
				if(res.code >= 0){
					uni.hideLoading();
					_this.$c.msg("下单成功");
				}else {
					_this.$c.msg("商家暂未同意议价");
				}
				//console.log(res)
			})
		}
	}
};
</script>

<style scoped>
scroll-view {
	height: 100vh;
	
}
.data-none {
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
}
.list {
	overflow: auto;
	background: #fff;
	padding: 10rpx;
	border-bottom: 10rpx solid #F4F4F4;
}
.list .list-title {
	width: 100%;
	display: block;
	font-size: 24rpx;
	margin-bottom: 7rpx;
}
.list .list-title .title-left{
	display: inline-block;
	width: 70%;
	font-size: 24rpx;
}
.list .list-title .title-right{
	display: inline-block;
	width: 28%;
	text-align: right;
	color: #EE9900;
	font-size: 24rpx;
}
.list .list-imgs {
	overflow: hidden;
	display: inline-block;
	width: 256rpx;
	height: 218rpx;
	vertical-align: middle;
	border-radius: 10rpx;
}
.list .accept{
	float: right;
	margin: 20rpx 25rpx 0 0;
	width: 140rpx;
	border: 1px solid #006BB3;
	border-radius: 20rpx;
	color: #006BB3;
	font-size: 24rpx;
	text-align: center;
}
.list .borderbtm {
	border-bottom: 1rpx solid #ccc;
}
.list .list-content {
	display: inline-block;
	width: 418rpx;
	margin-left: 3%;
	position: relative;
	vertical-align: middle;
}
.list-content .title {
	height: 100rpx;
	color: #222222;
}

.list-content .date {
	font-size: 22rpx;
	color: #888888;
}
.list-content .uni-flex .flex-item {
	padding: 0 10rpx;
	margin-right: 25rpx;
	border: 1rpx #0657a6 solid;
	border-radius: 10rpx;
	font-size: 20rpx;
	color: #0657a6;
	text-align: center;
}

.list-content .price {
	font-size: 28rpx;
	color: #FF1A1A;
	text-align: right;
	font-weight: bold;
}
.list-content .price1 {
	color: #777777;
}
.list-content .price .status_name{
	line-height: 22rpx;
}
.list-content .price text{
	margin-right: 20rpx;
	font-size: 24rpx;
	color: #777777;
	font-weight: normal;
	text-align: right;
}
.price .fixed-price {
	padding: 5rpx 8rpx;
	margin-right: 10rpx;
	background-color: #ff2727;
	border-radius: 4rpx;
	font-size: 22rpx;
	color: #ffffff;
}
.list-content .cancel-fav {
	border: 1px solid #ccc;
	border-radius: 10rpx;
	padding: 4rpx 12rpx;
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 21rpx;
	color: #ccc;
}
.list .list-action{
	width: 100%;
}
.list .list-action .action-close{
	border: 1px solid #ccc;
	color: #ccc;
	border-radius: 50rpx;
	font-size: 24rpx;
	margin-left: 78%;
	width: 20%;
	display: inline-block;
	text-align: center;
}
</style>
