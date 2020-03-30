<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view v-if="data_list.length > 0">
			<view class="list" v-for="(item, index) in data_list" :key="index">
				<view class="list-title">
					<view class="title-left" @tap="handleShop(item.shop_id)">
						<icon v-if="item.belong_type == 1" class="iconfont icon-dianpulianxiren"></icon>
						<icon v-if="item.belong_type == 2" class="iconfont icon-xiangqingzuixiadianpu"></icon>
						<text>{{item.belong_name}}</text>
						<icon v-if="item.belong_type == 2" class="iconfont icon-jiantou"></icon>
					</view>
					<view class="title-right">
						{{item.status_name}}
					</view>
				</view>
				<view v-on:click="handlePric(item.order_id)">
					<view class="list-imgs">
						<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item.order_item_list[0].picture.pic_cover" mode="scaleToFill"></image>
					</view>
					<view 
						class="list-content" 
						:style="item.order_status == 4 ? '' : item.order_status == 5 ? '' : borderBtm">
						<view class="title">{{ item.order_item_list[0].goods_name }}</view>
						<view class="date">{{ item.order_item_list[0].introduction }}</view>
					
						<view class="uni-flex uni-row">
							<view class="flex-item" v-for="(item2, index2) in item.order_item_list[0].label_arr" :key="index2">{{ item2 }}</view>
						</view>
						<view class="price" >
							金额：<text>{{ $c.changePrice(item.order_money) }}万</text> 
						</view>
						
					</view>
				</view>
				<view class="list-action clearfix" v-if="item.order_status == 0 ? true : item.order_status == 101 ? true : false">
					<view class="action-close " @tap="action_close(item.order_id, index)">
						取消预约
					</view>
				</view>
				<view class="list-action clearfix" v-if="item.order_status === 1 ">
					<view class="action-detection" v-if="item.testing_status == 0" @tap="handleDetection(item.order_id)">
						【专业检测】
					</view> 
					<view class="action-close action-testing" @tap="handleCheckcar(item.order_id,index)">
						已验车
					</view>
					<view class="action-close" @tap="handleShow(item.order_id, index)">
						停止交易
					</view>
				</view>
				<view 
					class="list-action clearfix" 
					v-if="item.order_status == 2 ? true : item.order_status == 1202 ? true :false">
					<view 
						class="action-detection" 
						@tap="handlePayment(item.order_id)" 
						v-if="item.order_status == 1201 ? true : item.order_status == 1202 ? true :false">
						【分期付款】
					</view> 
					<view class="action-close action-testing" @tap="downaPyment(item.order_id,index)">
						已付款
					</view>
				</view>
				<view class="list-action clearfix" v-if="item.order_status == 3 ? true : item.order_status == 1301 ? true :false">
					<view class="action-detection" @tap="handleSub(item.order_id)" v-if="item.order_status !== 1301">
						【手续代办】
					</view> 
					<view class="action-close action-testing" @tap="changeName(item.order_id,index)">
						已过户
					</view>
				</view>
			</view>
		</view>
		<view class="data-none" v-else>暂无相关数据!</view>
		
	</scroll-view>
</template>

<script>
// 首页商品
import { request } from '@/api/reques.js';
import * as MemberApi from '@/api/member/member.js';
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import config from '@/api/config.js';
export default {
	data() {
		return {
			data_list: [],
			borderBtm:'border-bottom:1px solid #eee;',
			page_index: 1,
			page_count: 0,
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
	
	methods: {
		// 页面跳转
		handlePric(order_id) {
			goWindow('/other_pages/member/orderdetail/index?order_id=', order_id);
		},
		// 店铺跳转
		handleShop(shop_id){
			if(shop_id == 0)return
			goWindow('/pages/storeDetails/storeDetails?id=',shop_id)
		},
		getData(page_index) {
			let _this = this;
			MemberApi.getOrderList({
				page_index: page_index,
				order_status: _this.status == -1 ? 'all' : _this.status
			}).then(res => {
				uni.showLoading({
					title: '加载中'
				});
				let data = res.data.data;
				for (let index in data) {
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
		// 取消收藏
		action(fav_id) {
			uni.showToast({
				title: '取消收藏成功',
				duration: 2000,
				success: () => {
					setTimeout(() => {
						_this.newMyPath(1);
					}, 2000);
				}
			});
		},
		// 取消订单
		action_close(order_id, index){
			let _this = this
			uni.showLoading({
				title: '取消订单中'
			})
			MemberApi.orderClose({
				order_id : order_id
			}).then( res => {
				uni.hideLoading();
				if(res.data > 0){
					uni.showToast({
						title: '取消订单成功',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 5
							_this.data_list[index].status_name = '订单关闭'
						}
					});
				}else{
					uni.showToast({
						title: '取消订单失败',
						duration: 2000,
						icon: "none",
						success: () => {
							
						}
					});
				}
			})
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
		// 专业检测
		handleDetection(order_id){
			
			/* const address = introduction;
			const proExp = '.+[省]',
				  cityExp = '.+[市]';
			const province = address.match(new RegExp(proExp)); // 省
			const city = address.match(new RegExp(cityExp))[0].replace(province, "") || ""; // 市
			console.log(province,city) */
			goWindow(`/other_pages/detectiont/Detection?id=${order_id}`)
			
		},
		// 停止交易
		handleShow(order_id, index){
			let _this = this;
			uni.showModal({
			    title: '提示',
			    content: '确认停止交易？停止交易后，将关闭订单',
				confirmText:"停止交易",
				confirmColor:"#2E70D2",
			    success: function (res) {
			        if (res.confirm) {
			            _this.action_close(order_id, index)
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		// 已验车
		handleCheckcar(order_id,index){
			let _this = this;
			MemberApi.userOrderCehckCar({
				order_id:order_id
			}).then((res)=>{
				if(res.code > 0){
					uni.showToast({
						title: '已验车',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 2
							_this.data_list[index].status_name = '付定金'
						}
					});
				}
			})
		},
		// 分期付款
		handlePayment(order_id){
			goWindow(`/other_pages/common/installment?id=${order_id}`)
		},
		// 已付定金
		downaPyment(order_id,index){
			let _this = this;
			MemberApi.alreadyDeposit({
				order_id:order_id
			}).then((res)=>{
				if(res.code > 0){
					uni.showToast({
						title: '已付定金',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 3
							_this.data_list[index].status_name = '手续中'
						}
					});
				}
			})
		},
		//过户
		changeName(order_id,index){
			let _this = this;
			MemberApi.userAlreadyGuohu({
				order_id:order_id
			}).then((res)=>{
				if(res.code > 0){
					uni.showToast({
						title: '已过户',
						duration: 2000,
						success: () => {
							_this.data_list[index].order_status = 4
							_this.data_list[index].status_name = '交易完成'
						}
					});
				}else{
					uni.showToast({
						title: '请联系商家过户',
						duration: 2000,
					});
				}
			})
		},
		// 手续代办信息提交成功
		handleSub(order_id){
			let title = '手续代办服务申请提交成功';
			let font = "客服将尽快联系您，请保持电话通畅！"
			let _this = this;
			MemberApi.procedureAgent({
				order_id:order_id
			}).then((res)=>{
				uni.showLoading({
					title: '信息提交中'
				})
				console.log(res)
				if(res.code > 0){
					setTimeout(()=>{
						uni.hideLoading();
						goWindow(`/other_pages/common/subSuccess?title=${title}&font=${font}`)
					},1500)
				}
			})
			
		}
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
	.title-left .icon-xiangqingzuixiadianpu{
		font-size: 24rpx;
	}
	.title-left .icon-dianpulianxiren{
		font-size: 24rpx;
	}
	.title-left text{
		padding: 0 10rpx;
		font-size: 24rpx;
		color: #222222;
	}
	.title-left .icon-jiantou{
		font-size: 20rpx;
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
	.list-content .title {
		color: #222222;
		font-size: 24rpx;
		line-height: 36rpx;
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
