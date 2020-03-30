<template>
	<view class="release">
		<view class="succes">
			<view class="img"><image src="../../static/images/gift.png" mode="scaleToFill"></image></view>
		</view>
		<button type="primary" @tap="clickHome">返回上一页</button>
	</view>
</template>

<script>
	// 我要卖车发布成功页面
	export default{
		methods:{
			clickHome(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="stylus">
	.release
		padding 0 35rpx
		.succes
			text-align center
			.img
				margin 158rpx auto 46rpx
				width 544rpx
				height 604rpx
				image
					width 100%
					height 100%
		button
			margin-top 215rpx
			background-color #F1652E
</style>
