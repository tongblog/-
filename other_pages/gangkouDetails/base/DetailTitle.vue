<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="place">{{introduction}}</view>
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(item,index) in label_arr" :key="index">{{item}}</view>
			</view>	
			<view class="price">
				{{price}}万
			</view>
		</view>
		<view class="security">
			保障<text>已全面检测•送售后质保•无理由退车•无事故车•代办过户</text>
		</view>
	</view>	
</template>

<script>
	export default{
		props:{
			introduction:{
				type:String
			},
			price:{
				type:String
			},
			testing:{
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
		padding 25rpx 22rpx 10rpx 22rpx
		.title
			color #222222
			font-size 30rpx
			line-height 40rpx
			font-weight bold
		.place
			display inline-block
			font-size 26rpx
			line-height 60rpx
			color #444444
		.flex-item
			padding 0 10rpx
			margin-right 25rpx
			border 1rpx #0657A6 solid
			border-radius 10rpx
			font-size 20rpx
			color #0657A6
			text-align center
		.price
			color #FF1A1A
			font-size 62rpx
			line-height 80rpx
</style>
