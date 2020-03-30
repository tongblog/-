<template>
	<view class="results">
		<view class="res-con">
			<view class="results-tittle">
				<text class="title-left">审核结果</text>
				<text class="title-right">未通过</text>
			</view>
			<view class="results-content">
				<view class="cont-text">
					您的车源“<text>{{goods_name}}</text>”，信息审核未通过。请修改后重新提交。
				</view>
				<view class="cont-title">
					未通过原因:
				</view>
				<view class="cont-why">
					{{refuse_desc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			goods_name:{
				type:String,
			},
			refuse_desc:{
				 type:String,
			},
		}
	}
</script>

<style scoped lang="stylus">
	.results
		padding 20rpx 20rpx 15rpx 20rpx
		.res-con
			box-shadow 0 0 20rpx 0 #ccc
			border-radius 10rpx
			.results-tittle
				padding 6rpx 10rpx
				border-bottom 1rpx #EEEEEE solid
				.title-left
					display inline-block
					width 50%
					font-size 26rpx
					font-weight bold
				.title-right
					display inline-block
					width 50%
					text-align right
					font-size 24rpx
					color #FF1A1A
			.results-content
				padding 6rpx 10rpx
				.cont-text
					font-size 24rpx
					color #444444
				.cont-title
					color #FF1A1A
					font-size 24rpx
					font-weight bold
				.cont-why
					font-size 24rpx
					color #444444
</style>
