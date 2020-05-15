<template>
	<view>
		<view class="list" @tap="handleDetail">
			<view class="list-title">
				<view class="title-left">
					<image 
						v-if="data.user_info.user_headimg"
						class="touxiang" 
						:src="data.user_info.user_headimg | filiterImg" 
						mode="scaleToFill"></image>
					<text>{{data.user_info.nick_name}}</text>
				</view>
				<view class="title-right">
					{{data.status_name}}
				</view>
			</view>
			<view class="list-imgs" >
				<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="data.order_goods[0].picture_info.pic_cover" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{ data.order_goods[0].goods_name }}</view>
				<view class="date">{{ data.order_goods[0].introduction }}</view>

				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(item2, index2) in data.order_goods[0].label_arr" :key="index2">{{ item2 }}</view>
				</view>
				<view class="price" >
					金额：<text>{{ data.order_money }}元</text>
				</view>
				<!-- <view class="cancel-fav" v-on:click="cancelFavorites(item.fav_id)">取消收藏</view> -->
			</view>
		</view>
		<!-- 约看记录 -->
		<view class="pay-info" v-if="data.group_id == 3">
			<view class="info-title">
				<text class="title-left"></text>约看记录
				<text class="title-right" v-if="data.order_status == 0 ? true : data.order_status == 101 ? true : false">待确认</text>
				<text class="title-right"  v-if="data.order_status == 1">已确认</text>
				<text class="title-right"  v-if="data.order_status == 1001">拒绝预约</text>
			</view>
			<view class="info-item">
				<view class="item-left">
					预约看车时间：
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.reserv_time | transferTime}}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 卖家信息 -->
		<view class="order-info">
			<view class="info-title">
				<text class="title-left"></text>买家信息
			</view>
			<view class="info-item">
				<view class="item-left">
					买家名称:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.user_info.nick_name}}</text>
				</view>
			</view>
			<view class="info-item" v-if="data.order_status == 0 ? true : data.order_status !== 101 ? true : false">
				<view class="item-left">
					联系方式:
				</view>
				<view class="item-right">
					<text class="item-txt" style="color: #006BB3;">{{data.user_info.user_tel}}</text>
					<text class="call-phone" @tap="callPhone(data.shop_info.shop_phone)">拨打电话</text>
				</view>
			</view>
		</view>
		<!-- 卖家信息 -->
		<view class="order-info" v-if="false">
			<view class="info-title">
				<text class="title-left"></text>付款记录
			</view>
			<view class="info-item">
				<view class="item-left">
					服务费:
				</view>
				<view class="item-right">
					<text class="item-txt">2000元</text>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					付款时间:
				</view>
				<view class="item-right">
					<text class="item-txt">2020-01-15 17:37</text>
				</view>
			</view>
		</view>
		
		
		
		<!-- 我要优惠 -->
		<view class="pay-info" v-if="data.payment_type == 7">
			<view class="info-title">
				<text class="title-left"></text>购买方式
			</view>
			<view class="info-item">
				<view class="item-left">
					我要优惠：
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.discount_money}}元</text>
				</view>
			</view>
			
		</view>
		<!-- 全款购 -->
		<view class="pay-info" v-if="data.payment_type == 8">
			<view class="info-title">
				<text class="title-left"></text>购买方式
			</view>
			<view class="info-item">
				<view class="item-left">
					全款购:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.order_money}}元</text>
				</view>
			</view>
		</view>
		<!-- 分期购 -->
		<view class="pay-info" v-if="data.payment_type == 9">
			<view class="info-title">
				<text class="title-left"></text>购买方式
			</view>
			<view class="info-item">
				<view class="item-left">
					分期金额:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.order_money}}</text>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					分期首付:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.stages_info.down_pay}}%</text>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					分期期限:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.stages_info.loan_period}}个月</text>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					月供:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.stages_info.month_money}}元</text>
				</view>
			</view>
		</view>
		
		<view class="order-info">
			<view class="info-title">
				<text class="title-left"></text>订单信息
			</view>
			<view class="info-item">
				<view class="item-left">
					订单编号:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.order_no}}</text>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					订单创建时间:
				</view>
				<view class="item-right">
					<text class="item-txt">{{data.create_time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 订单详情页
import { request } from '@/api/reques.js';
import * as MemberApi from '@/api/member/member.js';
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import config from '@/api/config.js';
export default {
	data() {
		return {
			data: []
		};
	},
	props: {
		order_id: {
			type: String,
			default: '0'
		},
		shop_id:{
			type: String,
			default: '0'
		}
	},
	watch: {
		order_id(e){
			this.getData()
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
		filiterImg(value){
			if(value){
				return config.domain + value
			}
		}
	},
	methods: {
		
		handleDetail(){
			let goods_id = this.data.order_goods[0].goods_id;
			let group_id = this.data.group_id;
			let promotion_id = this.data.promotion_id;
			this.$c.detailsJump(goods_id,group_id,promotion_id)
		},

		getData() {
			let _this = this;
			uni.showLoading({
				title: '加载中'
			});
			MemberApi.carOrderDetail({
				order_id: _this.order_id,
				shop_id: _this.shop_id,
				get_type: 2,
			}).then(res => {
				console.log(res)
				let code = Number(res.code);
				if(res.code >= 0){
					let data = res.data;
					data.create_time = _this.$c.timeStampTurnTime(data.create_time)
					data.order_goods[0].picture_info.pic_cover = config.domain + data.order_goods[0].picture_info.pic_cover
					
					setTimeout(() => {
						this.data = data;
						console.log(this.data)
						uni.hideLoading();
					}, 300);
				}else{
					_this.$c.msg(res.message)
					uni.hideLoading();
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1
						});
					},1000)
				}
				
			}).catch(err=>{
				console.log(err)
			})
		},
		
		handleErr(e, index) {
			if (e.type == 'error') {
				this.data.order_goods[0].picture_info.pic_cover = '/static/images/list.jpg';
			}
		},
		handleReport(){
			goWindow("/other_pages/common/testReport")
		},
		// 联系买家
		callPhone(phone){
			console.log(phone)
			uni.makePhoneCall({
			    phoneNumber: phone
			});
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
	background: #fff;
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
	border-radius: 10rpx;
	vertical-align: middle;
}
.list .list-content {
	display: inline-block;
	width: 418rpx;
	margin-left: 3%;
	position: relative;
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
.pay-info,.order-info{
	border-top: 16rpx solid #f4f4f4;
	padding: 18rpx 24rpx;
	background: #fff;
}
.info-title{
	/* text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-color: #0657A6; */
	color: #222222;
	font-size: 24rpx;
}
.info-title .title-left{
	display: inline-block;
	width: 4rpx;
	height: 26rpx;
	background-color: #006BB3;
	margin-right: 15rpx;
	vertical-align: middle;
}
.info-title .title-right{
	float: right;
	color: #006BB3;
}
.info-item{
	width: 100%;
	display: block;
}
.info-item .item-left{
	width:30%;
	display: inline-block;
	font-size: 22rpx;
	color: #444444;
	vertical-align: middle
}
.info-item .item-lf{
	color: #006BB3;
	font-size: 24rpx;
}
.info-item .item-right{
	width: 58%;
	display: inline-block;
	vertical-align: middle
}
.info-item .item-right .item-txt{
	font-size: 22rpx;
	line-height: 50rpx;
	color: #444444;
}
.info-item .item-right .call-phone{
	display: inline-block;
	padding: 0px 15rpx;
	margin-left: 18rpx;
	border: 1rpx #444 solid;
	color: #444;
	font-size: 18rpx;
	border-radius: 20rpx;
	line-height: 30rpx;
	vertical-align: middle;
}
.info-item .item-right .refund{
	float: right;
	padding: 0px 25rpx;
	margin-top: 5rpx;
	border: 1rpx #AAAAAA solid;
	color: #AAAAAA;
	font-size: 22rpx;
	border-radius: 20rpx;
	line-height: 40rpx;
	vertical-align: middle;
}
.category{
	
}
	
.category .plan-category{
	width:33%;
	padding:10rpx 0;
	text-align: center;
	color: #777777;
	font-size: 25rpx;
}
.plan-category .item-con{
	color: #FF2727;
	font-weight: bold;
	font-size: 26rpx;
}
		
.clearfix:after{
		display:block;
		clear:both;
		content:"";
		visibility:hidden;
		height:0
	}
</style>
