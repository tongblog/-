<template>
	<view class="must-img">
		<view class="must-title">
			<text>车辆照片</text><text class="on">*</text>
			为了买家更好的了解车况, 请上传图片
			<text class="down">(必传)</text>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" @tap="handleLeft">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆左前45°图片</text>
				</view>
				<image :src="imgSrc1" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="handleRight">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆右前45°图片</text>
				</view>
				<image :src="imgSrc2" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="handleLafter">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆左后45°图片</text>
				</view>
				<image :src="imgSrc3" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="handleRafter">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆左后45°图片</text>
				</view>
				<image :src="imgSrc4" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="must-title">
			<text style="padding-right: 15rpx;">车辆视频</text>
			一键上传车况视频
		</view>
		<view class="upload-video">
			<view class="video" @tap="handleVideo">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-shipin"></icon>
					<text>一键上传车况视频</text>
				</view>
				<video v-if="show" :src="videoSrc" autoplay="true" loop="true" controls="true" show-progress="true" objectFit="cover"></video>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {upload} from "@/api/uploadFile.js"
	import {uploadVideo} from "@/api/uploadVideo.js"
	export default{
		data(){
			return{
				imgSrc1:'',
				imgSrc2:'',
				imgSrc3:'',
				imgSrc4:'',
				videoSrc:'',
				show:false,
			}
		},
		methods:{
			// 左前
			handleLeft(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc1 = config.domain + res.img_path;
					this.$emit("handleLeft",res.picture_id)
				})
			},
			// 右前
			handleRight(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc2 = config.domain + res.img_path;
					this.$emit("handleRight",res.picture_id)
				})
			},
			// 左后
			handleLafter(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc3 = config.domain + res.img_path;
					this.$emit("handleLafter",res.picture_id)
				})
			},
			// 右后
			handleRafter(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc4 = config.domain + res.img_path;
					this.$emit("handleRafter",res.picture_id)
				})
			},
			// 上传视频
			handleVideo(){
				uploadVideo("upload/video/").then((res)=>{
					this.videoSrc = config.domain + res;
					this.show = true;
					this.$emit("handleVideo",res)
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.must-title
		padding 10rpx 20rpx
		background-color #F4F4F4
		font-size 28rpx
		color #222222
		text
			font-weight bold
		.on
			color #FF1A1A
			font-size 20rpx
		.down
			color #FF1A1A
			font-size 28rpx
	.uni-flex
		padding 24rpx 18rpx
		flex-wrap wrap
		justify-content space-between
		.flex-item:nth-child(1)
			margin-bottom 20rpx
		.flex-item:nth-child(2)
			margin-bottom 20rpx	
		.flex-item
			position relative
			overflow hidden
			width 48.5%
			height 213rpx
			background-color #E1EEFF
			border-radius 10rpx
			text-align center
			image
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			icon
				margin-top 15rpx
				font-size 62rpx
				color #0657A6
			.item-botm icon
				font-size 30rpx
			.item-botm text
				padding-left 15rpx
				font-size 24rpx
				color #0657A6
	.upload-video
		padding 20rpx 18rpx
		.video
			position relative
			overflow hidden
			width 100%
			height 413rpx
			background-color #E1EEFF
			border-radius 15rpx
			text-align center
			video
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			icon
				margin-top 150rpx
				font-size 62rpx
				color #0657A6
			.item-botm
				padding 80rpx 18rpx 0 18rpx
				text-align left
				icon
					margin-top 0
					font-size 30rpx
				text
					padding-left 15rpx
					font-size 24rpx
					color #0657A6
</style>
