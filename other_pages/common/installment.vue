<template>
	<view class="plan">
		<view class="plan-title">
			分期方案<text>（请选择分期方案）</text>
		</view>
		<view class="plan-item uni-flex uni-column">
			<radio-group @change="handleChange">
				<view class="category flex-item uni-flex uni-row" v-for="(item,index) in stages" :key="index">
					<view class="plan-category flex-item">
						<label class="radio"><radio color="#FF2727" style="transform: scale(0.5)" :value="item.class_id"/>{{item.class_name}}</label>
					</view>
					<view class="plan-category flex-item">
						<view class="on">首付</view>
						<view class="item-con on">{{item.down_pay}}%</view>
						<!-- <view class="item-con">10%</view> -->
					</view>
					<view class="plan-category flex-item">
						<view class="on">月供</view>
						<view class="item-con on">{{item.month_money}}元</view>
						<!-- <view class="item-con">8220元</view> -->
					</view>
					<view class="plan-category flex-item">
						<view class="on">>贷款期限</view>
						<view class="item-con on">{{item.loan_period}}个月</view>
						<!-- <view class="item-con">6个月</view> -->
					</view>
				</view>
				
			</radio-group>			
		</view>
		<view class="btn">
			<button type="primary" @tap="handleSub">确定</button>
		</view>
	</view>
</template>

<script>
	import { goWindow } from '@/api/navigate.js'; // 页面跳转
	import {request} from '@/api/reques.js'
	import * as MemberApi from '@/api/member/member.js';
	export default{
		data(){
			return{
				plan:'',
				orderId:0,
				stages:[],
			}
		},
		onLoad(option) {
			this.orderId = option.id;
			this.getStagesList()
		},
		methods:{
			getStagesList(){
				let token = uni.getStorageSync('token');
				if(token !== ""){
					request("/order/getStagesList",{
						token:token,
						goods_money:"100000"
					},"POST")
					.then((res)=>{
						this.stages = res.data.data
						console.log(this.stages)
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			handleChange(e){
				this.plan = e.detail.value
			},
			// 提交分期方案
			handleSub(){
				let title = '信息提交成功';
				let font = "客服将尽快联系您，请保持电话通畅！"
				let _this = this;
				uni.showLoading({
					title: '提交方案中'
				})
				MemberApi.stagesPay({
					order_id:_this.orderId,
					stages_id:_this.plan,
				}).then((res)=>{
					if(res.code > 0){
						uni.hideLoading();
						setTimeout(()=>{
							goWindow(`/other_pages/common/subSuccess?title=${title}&font=${font}`)
						},1000)
					}
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.plan
		padding 0
		.plan-title
			padding 0 24rpx
			background-color #F4F4F4
			line-height 66rpx
			color #222222
			text
				font-size 24rpx
				color #444444
		.plan-item
			padding 22rpx 22rpx 0 22rpx
			.category
				margin-bottom 20rpx
				border-radius 15rpx
				box-shadow 0 0 10rpx #CCCCCC
				.plan-category
					width 25%
					padding 10rpx 0
					text-align center
					color #777777
					font-size 23rpx
					.on
						margin 20rpx 0
					.item-con
						color #FF2727
						font-weight bold
						font-size 30rpx
					.radio
						line-height 155rpx
						font-size 28rpx
						font-weight bold
						color #222
		.btn
			padding 0 22rpx
			margin-top 100rpx
			button
				background-color #006BB3
				
</style>

