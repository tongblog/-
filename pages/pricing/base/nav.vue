<template>
	<view class="pric-nav">
		<image style="width: 100%;height: 100%;" :src="'upload/applet/yikoubj.png' | filterImg" mode="scaleToFill"></image>
		<view class="uni-flex uni-row" @tap="handleService">
			<view class="flex-item">
				<icon class="iconfont icon-yiquanmianjiance"></icon>
				<text>已全面检测</text>
			</view>
			<view class="flex-item">
				<icon class="iconfont icon-songshouhouzhibao"></icon>
				<text>送售后质保</text>
			</view>
			<view class="flex-item">
				<icon class="iconfont icon-wuyoutuiche"></icon>
				<text>无忧退车</text>
			</view>
			<view class="flex-item">
				<icon class="iconfont icon-wushiguche"></icon>
				<text>无事故车</text>
			</view>
			<view class="flex-item">
				<icon class="iconfont icon-daibanguohu"></icon>
				<text>代办过户</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {goWindow} from "@/api/navigate.js"
	export default{
		data(){
			return{
				
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
			handleService(){
				goWindow("/other_pages/help/index?help_id=",16)
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.pric-nav
		position relative
		width 100%
		height 376rpx
		border-bottom 20rpx #F4F4F4 solid
		.uni-flex
			position absolute
			bottom 20rpx
			left 0
			right 0
			margin auto
			width 702rpx
			height 180rpx
			background-color #FFFFFF
			border-radius 10rpx
			text-align center
			.flex-item
				width 20%
				padding-top 20rpx
				icon
					color #0657A6
					font-size 54rpx
				text
					display block
					font-size 24rpx
					color #0657A6
					line-height 20rpx
</style>
