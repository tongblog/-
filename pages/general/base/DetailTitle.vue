<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="place">{{introduction}}</view>
			<view class="score">
				综合评分:<text>{{testing}}</text>
			</view>
			<view>
				<view class="shelves">
					首次上架时间:<text>{{transferTime(sale_date)}}</text>
				</view>
				<view class="label">
					<text class="install">可分期</text>
					<text class="rules" @tap="handleRules">交易规则</text>
				</view>
			</view>
		</view>
		<view class="security">
			保障<text>已全面检测•送售后质保•无理由退车•无事故车•代办过户</text>
		</view>
	</view>	
</template>

<script>
	import {goWindow} from "@/api/navigate.js"
	export default{
		props:{
			introduction:{
				type:String
			},
			testing:{
				type:Number
			},
			sale_date:{
				type:Number
			},
			label_arr:{
				type:Array
			},
			goods_name:{
				type:String
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let y = date.getFullYear();
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = y+ "-" +m+ "-" +d;
				return newDate
			},
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",12)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.security
		padding 0 22rpx
		border-top 20rpx #F4F4F4 solid
		border-bottom 20rpx #F4F4F4 solid
		font-size 26rpx
		line-height 60rpx
		color #777777
		text
			display inline-block
			margin-left 30rpx
			font-size 25rpx
			color #444444
	.abstract
		padding 25rpx 22rpx
		.title
			color #222222
			font-size 30rpx
			line-height 40rpx
			font-weight bold
		.place
			display inline-block
			max-width 70%
			overflow hidden
			text-overflow ellipsis
			white-space nowrap
			font-size 26rpx
			color #444444
		.score
			display inline-block
			overflow hidden
			margin-left 30rpx
			font-size 26rpx
			color #444444
		.shelves
			display inline-block
			font-size 26rpx
			color #444444
		.label
			display inline-block
			margin-left 30rpx
			font-size 22rpx
			.install
				padding 8rpx 12rpx
				background-color #FFF2C5
				border-radius 8rpx
				color #FF8D28
			.rules
				padding 10rpx 15rpx
				margin-left 155rpx
				border 1rpx #0657A6 solid
				border-radius 10rpx
				color #0657A6
				
</style>
