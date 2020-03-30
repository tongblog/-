<template>
	<view class="upload">
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
	export default {
		data(){
			return{
				imgSrc1:'',
				imgSrc2:'',
				car1_info:{}
			}
		},
		methods:{
			// 行驶证正面
			handlePositive(){
				upload().then((res)=>{
					this.imgSrc1 = config.domain + res;
					let imgUrl1 = res;
					this.certificate(1,imgUrl1).then((posRes)=>{
						if(parseInt(posRes.code) === -1){
							uni.showToast({
							    title: '识别错误,请重新上传',
								icon:'none',
							    duration: 4000
							});
						}else{
							this.car1_info = posRes.data
							this.$emit("clickPos",posRes.data,imgUrl1)
							this.isHandCar(posRes.data)
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
			isHandCar(param){
				let _this = this
				let plate_num = param.plate_num
				_this.$c.showLoading('加载中')
					if(plate_num.includes('挂')){
						Object.assign(_this._data,_this._props)
						let jsonObj = _this._data;
						_this.index = 2
						jsonObj = JSON.stringify(jsonObj);
						_this.$c.goUrl('/other_pages/daiguaSell/SellCars?type=hand&json=' + jsonObj)
						_this.$c.hideLoading()
					}else{
						_this.$c.hideLoading()
					}
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
	.uni-flex
		padding 20rpx
		background-color #F4F4F4
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
