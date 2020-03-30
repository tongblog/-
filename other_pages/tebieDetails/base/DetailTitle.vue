<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="label">
				<text class="install">厂商指导价: {{market_price}}万</text>
				<text class="rules" @tap="handleRules">交易规则</text>
			</view>
			<view class="price">
				<text>{{ys_price}}</text>万开回家
			</view>
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
			market_price:{
				type:String
			},
			ys_price:{
				type:String
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
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",17)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.detail-title
		border-bottom 20rpx #F4F4F4 solid
		.abstract
			padding 25rpx 22rpx
			.title
				color #222222
				font-size 30rpx
				line-height 40rpx
				font-weight bold
			.price
				font-size 26rpx
				color #FF1A1A
				text
					font-size 62rpx
					line-height 62rpx
					font-weight bold
			.label
				display flex
				justify-content space-between
				.install
					padding 8rpx 0
					font-size 26rpx
					color #AAAAAA
				.rules
					height 42rpx
					padding 0 15rpx
					border 1rpx #0657A6 solid
					border-radius 10rpx
					line-height 42rpx
					font-size 20rpx
					color #0657A6
					
</style>
