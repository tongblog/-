<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(item,index) in label_arr" :key="index">{{item}}</view>	
			</view>	
			<view class="label">
				<view class="price" :class="{priclor:show}">
					起购价 <text>{{price}}万</text>
				</view>
				<view class="rules"  @tap="handleRules">交易规则</view>
			</view>
			<view class="flex-list">
				<view class="item">
					抢购人数<text>{{offer}}人</text>
				</view>
				<view class="item">
					围观人数<text>{{person_num}}人</text>
				</view>
				<view class="item">
					设置提醒<text>{{notice}}人</text>
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
			show:{
				type:Boolean
			},
			introduction:{
				type:String
			},
			price:{
				type:String
			},
			label_arr:{
				type:Array
			},
			person_num:{
				type:Number
			},
			goods_name:{
				type:String
			},
			offer:{
				type:Number,
				default:0,
			},
			notice:{
				type:Number,
				default:0,
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",15)
			}
		}
		
	}
</script>

<style scoped lang="stylus">
	.security
		padding 0 22rpx
		border-top 20rpx #F4F4F4 solid
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
		.uni-flex
			padding 10rpx 0
			.flex-item
				padding 0 8rpx
				margin-right 25rpx
				border 1rpx #0657A6 solid
				border-radius 10rpx
				font-size 20rpx
				line-height 32rpx
				color #0657A6
				text-align center
		.label
			display flex
			justify-content space-between
			align-items center
			.priclor
				color #AAAAAA !important
			.price
				font-size 26rpx
				color #FF7E1F
				line-height 72rpx
				text
					font-size 62rpx
					font-weight bold
			.rules
				height 42rpx
				padding 0rpx 15rpx
				border 1rpx #0657A6 solid
				line-height 42rpx
				border-radius 10rpx
				font-size 20rpx
				color #0657A6		
		.flex-list
			display flex
			.item
				width 33%
				color #444444
				font-size 26rpx
				text-align center
				line-height 30rpx
				text
					padding-left 15rpx
			
		
				
</style>
