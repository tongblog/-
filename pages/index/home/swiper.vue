<template>
	<view class="swiper-list">
		<view class="swiper-box">
			<image class="img" :src="'upload/applet/bj02.png' | filterImg" mode="scaleToFill"></image>
			<view class="swiper-content">
				<swiper class="swiper" :circular="circular" :autoplay="autoplay" :interval="interval" :duration="duration">
				    <swiper-item class="item" v-for="(adv,index) in advList" :key="index">
				        <view class="swiper-item">
							<image :src="adv.adv_image | filterImg" mode="scaleToFill"></image>
						</view>
				    </swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	export default{
		props:{
			advList:{
				type:Array,
			}
		},
		data(){
			return{
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				circular: true,
				duration: 1000,
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		methods:{
			
		},
		computed:{
	
		}
	}
</script>

<style scoped lang="stylus">
	.swiper-list
		background-color #8A6DE9
		margin-top 70rpx
		.swiper-box
			position relative
			width 100vw
			height 314rpx
			background-color #f4f4f4
			.img
				width 100%
				height 60%
				
			.swiper-content
				overflow hidden
				position absolute
				top 0
				bottom 0
				left 0
				right 0
				margin auto
				width 94%
				height 90%
				border-radius 30rpx
				.swiper
					height 100%
					.swiper-item
						width 100%
						height 100%
						image
							width 100%
							height 100%
</style>
