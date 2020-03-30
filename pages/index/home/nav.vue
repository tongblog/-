<template>
	<view class="nav">
		<swiper class="swiper">
			<swiper-item class="swiper-box" @click="pageJump(item)" v-for="(item,index) in navcontent" :key="index" :id="item.id">
				<view class="nav-scroll">
					<img style="width: 82rpx;height: 82rpx;" :src="item.imgsrc" alt="">
					<text>{{item.navstr}}</text>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="service" @tap="clickService" v-if="scrollS">
			联系客服
		</view>
		
	</view>
</template>
 
<script>
	import {request} from '@/api/reques.js'
	import {callPhone} from "@/api/callphone.js"
	import config from '@/api/config.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			scrollS:{
				type:Boolean
			}
		},
		data(){
			return{ 
				navcontent:[{
					id:1,
					imgsrc: config.domain + 'upload/applet/nav1.png',
					pages:'/pages/pricing/index',
					navstr:'一口价'
				},{
					id:2,
					imgsrc: config.domain + 'upload/applet/nav2.png',
					pages:'/pages/unsoldCar/index',
					navstr:'库存车'
				},{
					id:3,
					imgsrc: config.domain + 'upload/applet/nav3.png',
					pages:'/other_pages/special/Special',
					navstr:'港口特价'
				},{
					id:4,
					imgsrc: config.domain + 'upload/applet/nav4.png',
					pages:'/other_pages/huanxin/HuanXin',
					navstr:'以旧换新'
				},{
					id:5,
					imgsrc: config.domain + 'upload/applet/nav5.png',
					pages:'/other_pages/installment/installment',
					navstr:'分期咨询'
				}]
			}
		},
		methods:{
			pageJump(item){
				goWindow(item.pages)
			},
			clickService(){
				callPhone().then((res)=>{
					try{
						uni.makePhoneCall({
						    phoneNumber: res.data.data.value.tel_service_addr
						});
					}catch(err){
						console.log(err)
					}
					
				})
				
			}
			
		},
	}
</script>
<style scoped lang="stylus">
	.service
		position fixed
		right 24rpx
		bottom 100rpx
		margin auto
		z-index 80
		width 60rpx
		height 60rpx
		padding 10rpx
		border-radius 10rpx
		background-color #0657A6
		font-size 24rpx
		text-align center
		line-height 30rpx
		color #FFFFFF
		
	.swiper
		overflow hidden
		width 100vw
		height 150rpx
		padding 16rpx 0rpx
		.swiper-box
			width 19.5% !important
			height 150rpx
			text-align center
			.nav-scroll
				display flex
				flex-wrap wrap
				justify-content center
				padding-top 10rpx
				text
					color #333333
					font-size 24rpx
					margin-top 10rpx
		
</style>
