<template>
	<view class="release">
		<view class="succes">
			<view class="img"><image src="../../static/images/tijiao.png" mode="scaleToFill"></image></view>
			<view class="font">{{title}}</view>
			<view class="font">
				{{font}}
			</view>
		</view>
	</view>
</template>

<script>
	// 我要卖车发布成功页面
	export default{
		data(){
			return{
				title:"",
				font:"",
			}
		},
		onLoad(option) {
			this.title = option.title;
			this.font = option.font;
		},
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
		position relative
		height 95vh
		.succes
			position absolute
			top 0
			bottom 0
			left 0	
			right 0
			margin auto
			height 600rpx
			text-align center
			.img
				margin auto
				width 217rpx
				height 217rpx
				image
					width 100%
					height 100%
			.font
				font-size 30rpx
				color #444
</style>

