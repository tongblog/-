<template>
	<view class="upload">
		<view class="upload-title">
			<text>旧车信息</text>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" @click="handlePositive">
				<view class="add">+</view>
				<view class="front">
					上传<text>行驶证正本</text>
				</view>
				<image :src="imgSrc1" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @click="handleNegative">
				<view class="add">+</view>
				<view class="front">
					上传<text>行驶证副本</text>
				</view>
				<image :src="imgSrc2" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import {upload} from '@/api/upload.js'
	export default{
		data(){
			return{
				imgSrc1:'',
				imgSrc2:''
			}
		},
		methods:{
			// 行驶证正面
			handlePositive(){
				upload().then((res)=>{
					this.imgSrc1 = config.domain + res;
					
					let imgUrl1 = res;
					this.certificate(1,imgUrl1).then((posRes)=>{
						//console.log(posRes)
						if(parseInt(posRes.code) === -1){
							uni.showToast({
							    title: '识别错误,请重新上传',
								icon:'none',
							    duration: 4000
							});
						}else{
							this.$emit("clickPos",posRes.data,imgUrl1)
						}
					})
				})
			},
			// 行驶证反面
			handleNegative(){
				upload().then((res)=>{
					this.imgSrc2 = config.domain + res;
					let imgUrl2 = res;
					this.certificate(2,imgUrl2).then((revRes)=>{
						if(parseInt(revRes.code) === -1){
							uni.showToast({
							    title: '识别错误,请重新上传',
								icon:'none',
							    duration: 4000
							});
						}else{
							this.$emit("clickRev",revRes.data,imgUrl2)
						}
					})
				})
			},
			certificate(num,imgUrl){
				return new Promise((resolve,reject)=>{
					request('/goods/getCarcardInfo',{
						token: uni.getStorageSync('token'),
						img_url: imgUrl,
						data_carcard_type:num
					},"POST").then((res)=>{
						resolve(res.data)
					})
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.upload-title
		background-color #F4F4F4
		line-height 77rpx 
		font-size 29rpx
		font-weight bold
		color #222222!important
		text-align center
	.uni-flex
		padding 20rpx
		justify-content space-between
		.flex-item
			position relative
			width 48%
			height 180rpx
			border 2rpx #0657A6 dashed
			font-size 22rpx
			color #0657A6
			text-align center
			image
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			.add
				padding-top 30rpx
				font-size 30rpx
				font-weight bold
			.front
				font-size 25rpx
				text
					color #FF3232
				
</style>
