<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view v-if="data_list.length > 0">
			<view class="list" v-for="(item,index) in data_list" :key="index">
				<view class="list-title">
					<view class="title-left" v-if="item.buyer_info">
						<image 
							class="touxiang" :src="item.buyer_info.user_headimg" 
							mode="scaleToFill"></image>
						<text>{{item.buyer_info.nick_name}}</text>
					</view>
					<view v-if="item.status_name" class="title-right">
						{{item.status_name}}
					</view>
				</view>
				<view v-on:click="handlePric(item.order_id,item.shop_id)">
					<view class="list-imgs">
						<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item.order_item_list[0].picture.pic_cover" mode="scaleToFill"></image>
					</view>
					<view 
						class="list-content" 
						:class="{content: item.order_status == 101 || 4 || 3 || 1302 }">
						<view class="title">{{ item.order_item_list[0].goods_name }}</view>
						<view class="about-time" v-if="item.order_status == 101 && item.group_id == 3">
							约看时间：<text>{{item.reserv_time | transferTime}}</text>
						</view>
						<view class="date" v-if="item.group_id != 3">{{ item.order_item_list[0].introduction }}</view>
						
						<view class="uni-flex uni-row" v-if="item.order_status != 101">
							<view class="flex-item" v-for="(item2, index2) in item.order_item_list[0].label_arr" :key="index2">{{ item2 }}</view>
						</view>
						<view class="price" >
							金额：<text>{{ $c.changePrice(item.order_money) }}万</text> 
						</view>
						
					</view>
				</view>
				<view v-if="item.group_id == 3">
					<view class="list-action clearfix" v-if="item.order_status == 101 ">
						<view class="action-close action-testing" @tap="handleConfirm(item.order_id,index)">
							确认
						</view>
						<view class="action-close" @tap="handleRefused(item.order_id,index)">
							拒绝
						</view>
					</view>
					<view class="list-action clearfix" v-if="item.order_status == 3 ? true : item.order_status == 1302 ? true : false">
						<view class="action-close action-testing" @tap="handleDeal(item.order_id,index)">
							已过户
						</view>
					</view>
					<view class="list-action clearfix" v-if="item.order_status == 4 ">
						<view class="action-close action-testing" @tap="handleSub(item.order_id)">
							支付服务费
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="data-none" v-else>暂无相关数据!</view>
		
	</scroll-view>
</template>

<script>
// 首页商品
let _this
import { request } from '@/api/reques.js';
import * as MemberApi from '@/api/member/member.js';
import * as PayApi from "@/api/pay/pay.js"
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import config from '@/api/config.js';
export default {
	data() {
		return {
			data_list: [],
			page_index: 1,
			page_count: 0,
			openid:'',
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
			type: String,
			default: -1
		},
		shopId:{
			type:Number,
		}
	},
	watch: {
		status(e){
			let _this = this
			_this.page_idnex = 1
			_this.status = e
			_this.getData(_this.page_idnex)
		}
	},
	filters:{
		transferTime(time){
			var date = new Date(parseInt(time) * 1000);
			let y = date.getFullYear();
			let m = date.getMonth()+1;
			m = m < 10 ? ('0' + m) : m;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			let h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			let min = date.getMinutes();
			min = min < 10 ? ('0' + min) : min;
			let newDate = y+ "-" +m+ "-" +d+ " " +h + ":" +min;
			return newDate
		},
		
	},
	created() {
		_this = this;
		// 获取会员信息
		MemberApi.getMemberInfo().then( res => {
			_this.openid = res.data.user_info.wx_openid
		})
	},
	methods: {
		// 页面跳转
		handlePric(order_id,shop_id) {
			console.log(order_id,shop_id)
			goWindow(`/other_pages/shopDetail/index?order_id=${order_id}&shop_id=${shop_id}`);
		},
		getData(page_index) {
			let _this = this;
			MemberApi.getOrderList({
				page_index: page_index,
				order_status: _this.status == -1 ? 'all' : _this.status,
				shop_id:_this.shopId,
				get_type:2,
			}).then(res => {
				uni.showLoading({
					title: '加载中'
				});
				let data = res.data.data;
				for (let index in data) {
					if(data[index].buyer_info){
						data[index].buyer_info.user_headimg  = config.domain + data[index].buyer_info.user_headimg;
					}
					for(let index2 in data[index].order_item_list)
					data[index].order_item_list[index2].picture.pic_cover = config.domain + data[index].order_item_list[index2].picture.pic_cover;
				}
				if (page_index > 1) {
					data = this.data_list.concat(data);
				}
				setTimeout(() => {
					this.data_list = data;
					console.log(this.data_list)
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
				this.data_list[index].order_item_list[0].picture.pic_cover = '/static/images/list.jpg';
			}
		},
		
		// 确定
		handleConfirm(order_id,index){
			let _this = this;
			uni.showLoading({
				title: '同意预约中'
			})
			MemberApi.agreeReserv({
				order_id:order_id,
			})
			.then(res=>{
				uni.hideLoading();
				if(res.code > 0){
					uni.showToast({
						title: '预约成功',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 1
							_this.data_list[index].status_name = '代验车'
						}
					});
				}else{
					_this.$c.msg(res.message)
					// uni.showToast({
					// 	title: '预约失败',
					// 	duration: 2000,
					// 	icon: "none",
					// 	success: () => {
							
					// 	}
					// });
				}
			})
		},
		//拒绝
		handleRefused(order_id,index){
			let _this = this;
			uni.showLoading({
				title: '取消预约中'
			})
			MemberApi.cencelReserv({
				order_id:order_id
			})
			.then(res => {
				uni.hideLoading();
				if(res.code > 0){
					uni.showToast({
						title: '拒绝预约成功',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 1001
							_this.data_list[index].status_name = '拒绝预约'
						}
					});
				}else{
					uni.showToast({
						title: '拒绝预约失败',
						duration: 2000,
						icon: "none",
						success: () => {
							
						}
					});
				}
			})
		},
		// 店铺已过户
		handleDeal(order_id,index){
			MemberApi.transDeal({
				order_id:order_id,
			})
			.then(res => {
				uni.hideLoading();
				if(res.code > 0){
					uni.showToast({
						title: '确认过户成功',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 4
							_this.data_list[index].status_name = '交易完成'
						}
					});
				}else{
					uni.showToast({
						title: '拒绝预约失败',
						duration: 2000,
						icon: "none",
						success: () => {
							
						}
					});
				}
				console.log(res)
			})
		},
		
		// 支付服务费
		handleSub(order_id){
			let _this = this;
			_this.$c.showLoading('创建支付订单中！');
			// 创建服务费外部交易号 
			PayApi.getOrderServicesOutTrandeNo().then(res=>{
				let out_trade = res.data;
				if(out_trade == null || out_trade == undefined){
					_this.$c.hideLoading()
					_this.$c.msg('创建外部交易流水号失败')
					return
				}
				// 创建服务费充值订单
				PayApi.createServicesMoneyOrder({
					testing_uid:_this.uid,
					out_trade_no:out_trade,
					order_id:order_id
				}).then(res=>{
					let is_success = res.data
					if(is_success == 0 || is_success == null){
						_this.$c.hideLoading()
						_this.$c.msg('创建服务费充值订单失败')
						return 
					}
					_this.$c.hideLoading()
					_this.$c.showLoading('支付中！');
					// 微信统一下单
					PayApi.appletWechatPay({
						out_trade_no : out_trade,
						openid : _this.openid
					}).then(res=>{
						let wx_order_data = res.data
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp: String(wx_order_data.timestamp),
						    nonceStr: wx_order_data.nonce_str,
						    package: "prepay_id=" + wx_order_data.prepay_id,
						    signType: 'MD5',
						    paySign: wx_order_data.PaySign,
						    success: function (res) {
								_this.$c.hideLoading()
								_this.$c.msg('支付成功')
								
						    },
						    fail: function (err) {
								_this.$c.hideLoading()
								_this.$c.msg('支付失败')
						    }
						});
					})
				})
			})
		},
	}
};
</script>

<style scoped>
	scroll-view {
		height: 95vh;
		
	}
	.data-none {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
	}
	.list {
		width: 93%;
		background: #fff;
		margin: 8px auto 0;
		border-radius: 10px;
		padding:0 10rpx 10rpx;
	}
	.list .list-title {
		font-size: 24rpx;
	}
	.list .list-title .title-left{
		display: inline-block;
		width: 60%;
		line-height: 60rpx;
		vertical-align: middle;
	}
	.title-left .touxiang{
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		vertical-align: middle;
	}
	.title-left text{
		padding: 0 10rpx;
		font-size: 24rpx;
		color: #222222;
	}
	
	.list .list-title .title-right{
		display: inline-block;
		width: 40%;
		text-align: right;
		color: #006BB3;
		font-size: 24rpx;
		line-height: 60rpx;
	}
	.list .list-imgs {
		overflow: hidden;
		display: inline-block;
		width: 166rpx;
		height: 166rpx;
		vertical-align: middle;
		border-radius: 10rpx;
	}
	.list .list-content {
		position: relative;
		display: inline-block;
		width: 418rpx;
		margin-left: 3%;
		vertical-align: middle;
	}
	.list .content {
		border-bottom: 1rpx solid #eee;
	}
	.list-content .title {
		color: #222222;
		font-size: 24rpx;
		line-height: 36rpx;
	}
	.list-content .about-time{
		font-size: 24rpx;
		color: #222;
	}
	
	.list-content .date {
		font-size: 22rpx;
		color: #888888;
		line-height: 40rpx;
	}
	.list-content .uni-flex .flex-item {
		padding:6rpx;
		margin-right:15rpx;
		height: 20rpx;
		border:1rpx #0657A6 solid;
		border-radius:10rpx;
		font-size:20rpx;
		color:#0657A6;
		text-align:center;	
		line-height: 18rpx;
	}

	.list-content .price {
		font-size: 24rpx;
		color: #444;
		text-align: right;
	}
	.list-content .price text{
		font-size: 24rpx;
		color: #FF1A1A;
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
		padding: 10rpx 0;
	}
	.list .list-action .action-close{
		float: right;
		border: 1px solid #AAA;
		color: #444;
		border-radius: 50rpx;
		font-size: 24rpx;
		width: 20%;
		display: inline-block;
		text-align: center;
	}
	.list .list-action .action-testing{
		margin-left: 20rpx;
		border: 1px solid #006BB3;
		color: #006BB3;
	}
	.list .list-action .action-detection{
		display: inline-block;
		font-size: 24rpx;
		color: #006BB3;
		vertical-align: top;
	}
	.clearfix:after{
		display:block;
		clear:both;
		content:"";
		visibility:hidden;
		height:0
	}
</style>
