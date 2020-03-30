<template>
	<view class="non-img">
		<view class="non-title">
			<text>车辆照片</text>
			上传照片越多,产品的成交率越高
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" @tap="clickBinterior">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆内饰前部图片</text>
				</view>
				<image :src="imgUrl1" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="clickAinterior">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆内饰后部图片</text>
				</view>
				<image :src="imgUrl2" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="tapEngineLe">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆发动机左上图片</text>
				</view>
				<image :src="imgUrl3" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="tapEngineRi">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆发动机右上图片</text>
				</view>
				<image :src="imgUrl4" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="tapRearLe">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆后轮左45°图片</text>
				</view>
				<image :src="imgUrl5" mode="scaleToFill"></image>
			</view>
			<view class="flex-item"  @tap="tapRearRi">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆后轮右45°图片</text>
				</view>
				<image :src="imgUrl6" mode="scaleToFill"></image>
			</view>
			<view class="flex-item" @tap="tapFrontLe">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆前轮左45°图片</text>
				</view>
				<image :src="imgUrl7" mode="scaleToFill"></image>
			</view>
			<view class="flex-item"  @tap="tapFrontRi">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆前轮右45°图片</text>
				</view>
				<image :src="imgUrl8" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="non-damage">
			<view class="damage" @tap="tapDamage">
				<icon class="iconfont icon-paizhaotianjia"></icon>
				<view class="item-botm">
					<icon class="iconfont icon-paizhao"></icon>
					<text>拍摄车辆重大损伤图片</text>
				</view>
				<image :src="imgUrl9" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="describe">
			<view class="describe-title">
				车辆描述
				<text class="down">(必填)</text>
			</view>
			<editor id="editor" class="ql-container" :placeholder="placeholder" @input="onInput"></editor>
		</view>
		<button class="upload" @tap="handleConfirm">置换</button>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import {upload} from "@/api/uploadFile.js"
	import {goWindow} from '@/api/navigate.js'
	export default{
		props:{
			newJson:{
				type:Object
			},
			imgSrc1:{
				type:String
			},
			imgSrc2:{
				type:String
			},
			imgSrc3:{
				type:String
			},
			imgSrc4:{
				type:String
			},
			videoSrc:{
				type:String
			},
		},
		data(){
			return{
				placeholder: '请填写车辆重大损伤及车辆用途的一些说明(限100字)',
				editorCtx:'',
				imgUrl1:'',
				imgUrl2:'',
				imgUrl3:'',
				imgUrl4:'',
				imgUrl5:'',
				imgUrl6:'',
				imgUrl7:'',
				imgUrl8:'',
				imgUrl9:'',
				imgSrc5:"0",
				imgSrc6:"0",
				imgSrc7:"0",
				imgSrc8:"0",
				imgSrc9:"0",
				imgSrc10:"0",
				imgSrc11:"0",
				imgSrc12:"0",
				imgSrc13:"0",	
				start:new Date(),
			}
		},
		methods:{
			// 重大描述
			onInput(e) {
				this.editorCtx = e.detail.text
			},
			// 内饰前
			clickBinterior(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl1 = config.domain + res.img_path;
					this.imgSrc5 = res.img_path
				})
			},
			// 内饰后
			clickAinterior(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl2 = config.domain + res.img_path;
					this.imgSrc6 = res.img_path
				})
			},
			// 发动机左上
			tapEngineLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl3 = config.domain + res.img_path;
					this.imgSrc7 = res.img_path
				})
			},
			// 发动机右上
			tapEngineRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl4 = config.domain + res.img_path;
					this.imgSrc8 = res.img_path
				})
			},
			// 后轮左
			tapRearLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl5 = config.domain + res.img_path;
					this.imgSrc9 = res.img_path
				})
			},
			// 后轮右
			tapRearRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl6 = config.domain + res.img_path;
					this.imgSrc10 = res.img_path
				})
			},
			// 前轮左
			tapFrontLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl7 = config.domain + res.img_path;
					this.imgSrc11 = res.img_path
				})
			},
			// 前轮右
			tapFrontRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl8 = config.domain + res.img_path;
					this.imgSrc12 = res.img_path
				})
			},
			// 车辆重大损伤
			tapDamage(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl9 = config.domain + res.img_path;
					this.imgSrc13 = res.img_path
				})
			},
			// 置换
			handleConfirm(){
				let now = new Date();
				if(now - this.start <= 1000)return
				this.start = now;
				if(this.imgSrc1 !== "" && this.imgSrc2 !== "" && this.imgSrc3 !== "" && this.imgSrc4 !== ""){
					if(this.editorCtx !== ""){
						this.confirmData()
					}else{
						this.$c.msg("请填写车辆描述")
					}
				}else{
					this.$c.msg("请上传必填照片")
				}
				
				
			},
			confirmData(){
				let _this = this;
				console.log(this.newJson)
				let price = this.newJson.price;   // 预售价格
				let posData = JSON.stringify(this.newJson.posData); // 行驶证数据
				let posImg = this.newJson.posImg;  // 正面地址
				let revImg = this.newJson.revImg;  // 反面地址
				let brands = this.newJson.brandId; // 品牌id
				let carType = parseInt(this.newJson.index) + 1; // 车型
				//图片地址
				let imgStr = this.imgSrc1 + ',' + this.imgSrc2+','+this.imgSrc3+','+this.imgSrc4+','+this.imgSrc5+','+this.imgSrc6+','+this.imgSrc7+','+this.imgSrc8+','+this.imgSrc9+','+this.imgSrc10+','+this.imgSrc11+','+this.imgSrc12+','+this.imgSrc13;
				request('/order/createChangeCarOrder',{
					token:uni.getStorageSync('token'),
					ys_price:price,
					car_json:posData,
					card_1:posImg,
					card_2:revImg,
					car_type:carType,
					brands_id:brands,
					car_desc:_this.editorCtx,
					img_json:imgStr,
					video_src:_this.videoSrc,
				},"POST")
				.then((res)=>{
					let data = parseInt(res.data.data);
					if(data > 0){
						uni.showModal({
						    title: '提示',
						    content: '车辆审核中,经销商将尽快与您联系,请耐心等待!',
							showCancel: false,
							confirmColor:"#0657A6",
						    success(res) {
						        if (res.confirm) {
						           uni.reLaunch({
						               url: "/pages/index/index"
						           });
						        }
						    }
						});
					}else{
						uni.showToast({
						    title: '信息填写有误,请重新填写',
							icon:"none",
						    duration: 3000,
							mask:true,	
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.non-title
		padding 10rpx 20rpx
		background-color #F4F4F4
		font-size 28rpx
		color #222222
		text
			padding-right 15rpx
			font-weight bold
		.on
			color #FF1A1A
			font-size 20rpx
	.uni-flex
		padding 24rpx 18rpx
		flex-wrap wrap
		justify-content space-between
		.flex-item:last-child
			margin-bottom 0
		.flex-item:nth-last-child(2)
			margin-bottom 0
		.flex-item
			position relative
			overflow hidden
			width 48.5%
			height 213rpx
			background-color #E1EEFF
			border-radius 10rpx
			margin-bottom 20rpx
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
	.non-damage
		padding 0 18rpx 20rpx 18rpx
		.damage
			position relative
			overflow hidden
			width 100%
			height 413rpx
			background-color #E1EEFF
			border-radius 15rpx
			text-align center
			image
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
	.describe
		padding 0 18rpx
		margin-bottom 120rpx
		.describe-title
			font-size 33rpx
			color #444444
			.down
				font-size 28rpx
				color #FF1A1A
		.ql-container
			min-height 0!important
			height 268rpx
			border 1rpx #EEEEEE solid
	.upload
		position fixed
		bottom 0
		left 0
		z-index 1
		width 100%
		height 86rpx
		border-radius 0
		background-color #0657A6
		line-height 89rpx
		text-align center
		font-size 30rpx
		color #FFFFFF
		
</style>
