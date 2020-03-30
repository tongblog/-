<template>
	<view class="information">
		<view class="ifm-title">检测信息</view>
		<view class="ifm-people" v-if="nick_name">
			<view class="people-img">
				<image src="../../../static/images/jiance.png" mode="scaleToFill"></image>
			</view>
			<view class="people-data">
				<view class="pp-name">{{nick_name}}</view>
				<view class="pp-cont">
					{{testing_desc}}<text @tap="handleAuth">【点击查看资格证书】</text>
				</view>
			</view>
		</view>
		<view class="ifm-content" v-if="remark">
			<view class="cont-title">
				<text>经过专业检测,该车:</text>
			</view>
			<view class="uni-flex uni-column">
				<view class="flex-item">
					{{remark}}
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			nick_name:{
				type:String
			},
			auth_img:{
				type:String
			},
			testing_desc:{
				type:String
			},
			remark:{
				type:String
			}
		},
		methods:{
			handleAuth(){
				uni.previewImage({
					urls: [this.auth_img],
					
				});
			}
		}
	}
</script>

<style scoped lang="stylus">
	.information
		padding 28rpx 28rpx 0 28rpx
		border-top 16rpx solid #F4F4F4
		.ifm-title
			width 105rpx
			border-bottom 2rpx #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.ifm-people 
			padding 30rpx 0
			.people-img
				display inline-block
				width 72rpx
				height 72rpx
				image
					width 100%
					height 100%
			.people-data
				display inline-block
				margin-left 32rpx
				.pp-name
					font-size 28rpx
					line-height 45rpx
					color #222222
				.pp-cont
					font-size 22rpx
					color #777777
					text
						color #2E70D2
		.ifm-content 
			padding 10rpx 21rpx
			border-radius 15rpx
			background-color #F4F4F4
			.cont-title
				color #444444
				font-size 24rpx
			.uni-flex .flex-item
				font-size 24rpx
				color #444444
</style>
