<template>
	<view style="width: 100vw;">
		<view class="bidding uni-flex uni-row">
			<view class="bidding-left flex-item" @click="handleLeft">
				<view class="left-content">
					<view class="left-title">路运抢购</view>
					<view class="countdown" v-if="action_time">
						剩 <text style="margin-left: 10rpx;">{{hr}}</text>:<text>{{min}}</text>:<text>{{sec}}</text>
						<icon class="iconfont icon-jiantou"></icon>
					</view>
					<view class="slogan">品质好货等你来</view>
				</view>
				<view class="bidding-img uni-flex uni-row">
					<view class="flex-item">
						<image style="width: 100%; height: 100%;" :src="'upload/applet/jiaoban.png' | filterImg" mode=""></image>
						<view>搅拌车</view>
					</view>
					<view class="flex-item">
						<image style="width: 100%; height: 100%;" :src="'upload/applet/qianyin.png' | filterImg" mode=""></image>
						<view>牵引车</view>
					</view>
				</view>
				
			</view>
			<view class="bidding-right flex-item uni-flex uni-column">
				<view class="flex-item" style="background-color: #F4F4F4;">
					<view class="right-title">路运估车</view>
					<view class="assess">立即评估<icon class="iconfont icon-jiantou"></icon></view>
					<view class="slogan">海量真实交易数据</view>
					<view class="img">
						<image style="width: 100%; height: 100%;" :src="'upload/applet/list.jpg' | filterImg" mode=""></image>
					</view>
				</view>
				<view class="flex-item" @click="handleRight">
					<view class="right-title">特别推荐</view>
					<view class="assess" style="border-color: #2878F0;color: #2878F0;">最新车源<icon class="iconfont icon-jiantou"></icon></view>
					<view class="slogan" style="color: #2878F0;">省事 &nbsp;省心 &nbsp;省钱</view>
					<view class="img">
						<image style="width: 100%; height: 100%;" :src="'upload/applet/che.jpg' | filterImg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let timer = null;
	import config from '@/api/config.js';
	import {getIndexData} from '@/api/home/home.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {countdown} from "@/api/countdown.js"
	export default{
		data(){
			return{
				hr:'00',
				min:'00',
				sec:'00',
				action_time:0
			}
		},
		created() {
			this.getIndexData()
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		methods:{
			getIndexData(){
				getIndexData().then((res)=>{
					this.action_time = res.data.action_start_time
					this.countdowns(this.action_time)
				});
			},
			handleLeft(){
				goWindow('/pages/bidding/Bidding');
			},
			handleRight(){
				goWindow('/other_pages/recommend/Recommend')
			},
			countdowns(time){
				const end = new Date(parseInt(time) * 1000);
				clearInterval(timer)
				timer = setInterval(async ()=>{
					let {hr,min,sec} = await countdown(end)
					if(sec){
						this.hr = hr;
						this.min = min;
						this.sec = sec
					}else{
						clearInterval(timer)
					}
					  
				},1000)
			},
		}
	}
</script>

<style scoped lang="stylus">
	.bidding
		width 702rpx
		height 288rpx
		margin 0 auto 30rpx
		box-shadow 0 0 10rpx 0 #ccc
		.bidding-right
			width 49%
			.flex-item
				width 100%
				padding 8rpx 0 0 10rpx
				.right-title
					display inline-block
					padding-left 8rpx
					margin-right 10rpx
					vertical-align middle
					font-size 32rpx
					color #111111
				.assess
					display inline-block
					padding 0 10rpx 0 10rpx
					border 1px solid #967B53
					border-radius 20rpx
					vertical-align middle
					font-size 20rpx
					line-height 30rpx
					color #967B53
					icon
						font-size 20rpx
						margin-left 5rpx
						margin-top -35%
				.slogan
					display inline-block
					padding-left 8rpx
					font-size 25rpx
					color #967B53
				.img
					float right
					width 120rpx
					height 80rpx
		.bidding-left
			width 45%
			padding 18rpx
			border-right 1rpx #F4F4F4 solid
			.left-title
				display inline-block
				margin-right 10rpx
				font-size 32rpx
				color #111111
			.countdown
				display inline-block
				padding 2rpx 2rpx 0rpx 10rpx
				border 1px solid #FF2530
				border-radius 20rpx
				font-size 20rpx
				line-height 30rpx
				color #FF2530
				icon
					font-size 20rpx
					margin-left 5rpx
					margin-top -23%
					line-height 0
			.slogan
				font-size 25rpx
				color #FF2530
		.bidding-left .bidding-img
			margin-top 15rpx
			justify-content space-between
			text-align center
			
			.flex-item
				width 46%
				view
					font-size 24rpx
					color #333333

		
</style>
