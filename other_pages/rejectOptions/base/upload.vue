<template>
	<view class="upload">
		<view class="upload-title">
			车辆上传
		</view>
		<view class="uni-flex uni-row">
			<!-- @click="handlePositive" -->
			<view class="flex-item">
				<view class="add">+</view>
				<view class="front">
					上传<text>行驶证正本</text>
				</view>
				<image :src="car_info.card_1 | filterImg" mode="scaleToFill"></image>
			</view>
			<!-- @click="handleNegative" -->
			<view class="flex-item">
				<view class="add">+</view>
				<view class="front">
					上传<text>行驶证副本</text>
				</view>
				<image :src="car_info.card_2 | filterImg" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import {upload} from '@/api/upload.js'
	export default {
		props:{
			car_info:{
				type:Object
			}
		},
		data(){
			return{
				imgSrc1:"",
				imgSrc2:"",
				car1_info:{}
			}
		},
		filters:{
			filterImg(url){
				if(url){
					return config.domain + url
				}
			}
		},
		methods:{
			// 行驶证正面
			// handlePositive(){
			// 	let _this = this;
			// 	upload().then((res)=>{
			// 		console.log(res)
			// 		if(res){
			// 			_this.car_info.card_1 = res;
			// 		}
			// 		let imgUrl1 = res;
			// 		this.certificate(1,imgUrl1).then((posRes)=>{
			// 			if(parseInt(posRes.code) === -1){
			// 				uni.showToast({
			// 				    title: '识别错误,请重新上传',
			// 					icon:'none',
			// 				    duration: 4000
			// 				});
			// 			}else{
			// 				this.car1_info = posRes.data
			// 				this.$emit("clickPos",_this.car_info.card_1,posRes.data)
			// 				this.isHandCar(posRes.data)
			// 			}
			// 		})
			// 	})
			// },
			// // 行驶证反面
			// handleNegative(){
			// 	let _this = this;
			// 	upload().then((res)=>{
			// 		if(res){
			// 			_this.car_info.card_2 = res;
			// 		}
			// 		let imgUrl2 = res;
			// 		this.certificate(2,imgUrl2).then((revRes)=>{
			// 			if(parseInt(revRes.code) === -1){
			// 				uni.showToast({
			// 				    title: '识别错误,请重新上传',
			// 					icon:'none',
			// 				    duration: 4000
			// 				});
			// 			}else{
			// 				this.$emit("clickRev",_this.car_info.card_2,revRes)
			// 			}
			// 		})
			// 	})
			// },
			// isHandCar(param){
			// 	let _this = this
			// 	let plate_num = param.plate_num
			// 	_this.$c.showLoading('加载中')
			// 		if(plate_num.includes('挂')){
			// 			Object.assign(_this._data,_this._props)
			// 			let jsonObj = _this._data;
			// 			_this.index = 2
			// 			jsonObj = JSON.stringify(jsonObj);
			// 			_this.$c.goUrl('/other_pages/daiguaSell/SellCars?type=hand&json=' + jsonObj)
			// 			_this.$c.hideLoading()
			// 		}else{
			// 			_this.$c.hideLoading()
			// 		}
			// },
				
			// certificate(num,imgUrl){
			// 	return new Promise((resolve,reject)=>{
			// 		request('/goods/getCarcardInfo',{
			// 			token: uni.getStorageSync('token'),
			// 			img_url: imgUrl,
			// 			data_carcard_type:num
			// 		},"POST").then((res)=>{
			// 			resolve(res.data)
			// 		})
			// 	})
			// }
		}
	}
</script>

<style scoped lang="stylus">
	.upload-title
		padding 0 23rpx
		font-size 26rpx
		font-weight bold
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
