<template>
	<view class="release">
		<view class="succes">
			<view class="img"><image src="../../static/images/fabu.png" mode="scaleToFill"></image></view>
			<view class="font">发布成功,等待审核</view>
		</view>
		<button type="primary" @tap="clickHome">返回首页</button>
	</view>
</template>

<script>
	// 我要卖车发布成功页面
	export default{
		methods:{
			clickHome(){
				uni.reLaunch({
				    url: '/pages/index/index'
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
				margin 170rpx auto 46rpx
				width 280rpx
				height 295rpx
				image
					width 100%
					height 100%
			.font
				font-size 36rpx
				color #666666
		button
			margin-top 215rpx
			background-color #0657A6
</style>
