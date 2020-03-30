<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="shelves">
				上架时间:<text>{{start_time}}</text>
			</view>
			<view class="deadline shelves">
				出价截止:<text>{{end_time}}</text>
			</view>
			<view class="label">
				<text class="install" v-for="(item,index) in label_arr" :key="index">{{item}}</text>
				<text class="rules" @tap="handleRules">交易规则</text>
			</view>
		</view>
		<view class="security">
			车辆上架时间为一周(周日-周六) , 每周六 15:00 公布结果
		</view>
	</view>	
</template>

<script>
	import {goWindow} from "@/api/navigate.js"
	export default{
		props:{
			end_time:{
				type:String
			},
			start_time:{
				type:String
			},
			label_arr:{
				type:Array
			},
			goods_name:{
				type:String
			}
		},
		methods:{
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",13)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.security
		padding 0 22rpx
		background-color #FFF1F3
		font-size 26rpx
		line-height 74rpx
		color #761F2B
	.abstract
		padding 25rpx 22rpx
		.title
			color #222222
			font-size 30rpx
			line-height 40rpx
			font-weight bold
		.shelves
			display inline-block
			font-size 26rpx
			color #AAAAAA
			line-height 50rpx
		.deadline	
			padding-left 20rpx
		.label
			display inline-block
			margin-left 25rpx
			font-size 22rpx
			.install
				padding 8rpx 12rpx
				background-color #FFF2C5
				border-radius 8rpx
				color #FF8D28
			.rules
				padding 10rpx 15rpx
				margin-left 85rpx
				border 1rpx #0657A6 solid
				border-radius 10rpx
				color #0657A6
				
</style>
