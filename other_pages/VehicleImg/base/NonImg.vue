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
		<button class="upload" @tap="handleConfirm">确定发布</button>
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
			imgId1:{
				type:String,
			},
			imgId2:{
				type:String,
			},
			imgId3:{
				type:String,
			},
			imgId4:{
				type:String,
			},
			videoSrc:{
				type:String,
				default:"0",
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
				imgId5:"0",
				imgId6:"0",
				imgId7:"0",
				imgId8:"0",
				imgId9:"0",
				imgId10:"0",
				imgId11:"0",
				imgId12:"0",
				imgId13:"0",	
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
					this.imgId5 = res.picture_id
				})
			},
			// 内饰后
			clickAinterior(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl2 = config.domain + res.img_path;
					this.imgId6 = res.picture_id
				})
			},
			// 发动机左上
			tapEngineLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl3 = config.domain + res.img_path;
					this.imgId7 = res.picture_id
				})
			},
			// 发动机右上
			tapEngineRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl4 = config.domain + res.img_path;
					this.imgId8 = res.picture_id
				})
			},
			// 后轮左
			tapRearLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl5 = config.domain + res.img_path;
					this.imgId9 = res.picture_id
				})
			},
			// 后轮右
			tapRearRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl6 = config.domain + res.img_path;
					this.imgId10 = res.picture_id
				})
			},
			// 前轮左
			tapFrontLe(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl7 = config.domain + res.img_path;
					this.imgId11 = res.picture_id
				})
			},
			// 前轮右
			tapFrontRi(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl8 = config.domain + res.img_path;
					this.imgId12 = res.picture_id
				})
			},
			// 车辆重大损伤
			tapDamage(){
				upload("upload/goods/",0).then((res)=>{
					this.imgUrl9 = config.domain + res.img_path;
					this.imgId13 = res.picture_id
				})
			},
			// 确定发布
			handleConfirm(){
				let now = new Date();
				if(now - this.start <= 1500)return
				this.start = now
				if(this.imgId1 !== "" && this.imgId2 !== "" && this.imgId3 !== "" && this.imgId4 !== ""){
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
				let mark = this.newJson.jsonData;
				let _this = this;
				this.newJson.jsonId1 !== undefined ? this.newJson.jsonId1.inspection_record = this.newJson.vehicleDate : "";
				let picture = parseInt(this.imgId1);
				let imgArr = this.imgId1 + ',' + this.imgId2+','+this.imgId3+','+this.imgId4+','+this.imgId5+','+this.imgId6+','+this.imgId7+','+this.imgId8+','+this.imgId9+','+this.imgId10+','+this.imgId11+','+this.imgId12+','+this.imgId13;
				let provId = this.newJson.provId;
				let cityId = this.newJson.cityId;
				let price = this.newJson.price;
				let vehicleJson = JSON.stringify(this.newJson.jsonId1);
				let is_hand = this.newJson.is_hand;
				
				//不带挂
				
				let used_json = {
					carcard_json:vehicleJson,
					card_1:this.newJson.front,
					card_2:this.newJson.behind,
					brands_id:this.newJson.brandId,
					car_type:this.newJson.index + 1,
					system_id:this.newJson.categoryId,
					province_id:this.newJson.provId,
					city_id:this.newJson.cityId,
					synx:this.newJson.issue_date,
					ml_num:this.newJson.sliderData,
					pf_id:this.newJson.index1,
					qd_id:this.newJson.index2,
					bx_id:this.newJson.insurance,
					is_dgcs:this.newJson.hang,
					all_type:this.newJson.genre,
					is_yj:this.newJson.bargain,
					is_btd:this.newJson.archives,
					sale_price:this.newJson.price,
					aip_date:this.newJson.date,
					rl_type:this.newJson.rlId,
					tyre_spec:this.newJson.tyre_spec,
					engine_brand:this.newJson.engine_brand,
				};
				//console.log(used_json)
				let newUsed = JSON.stringify(used_json)
				//带挂
				let daigua = JSON.stringify(this.newJson.guaId1);
				let dg_json = {
					gc_carcard_json:daigua,
					carcard_json:vehicleJson,
					card_1:this.newJson.front,
					card_2:this.newJson.behind,
					brands_id:this.newJson.brandId,
					car_type:this.newJson.index + 1,
					system_id:this.newJson.categoryId,
					province_id:this.newJson.provId,
					city_id:this.newJson.cityId,
					synx:this.newJson.issue_date,
					ml_num:this.newJson.sliderData,
					pf_id:this.newJson.index1,
					qd_id:this.newJson.index2,
					bx_id:this.newJson.insurance,
					is_dgcs:this.newJson.hang,
					all_type:this.newJson.genre,
					is_yj:this.newJson.bargain,
					is_btd:this.newJson.archives,
					sale_price:this.newJson.price,
					gc_brands_id:this.newJson.gc_brandId,
					gc_system_id:this.newJson.gc_categoryId,
					gc_all_type:this.newJson.genre,
					gc_is_yj:this.newJson.bargain,
					card_gua_1:this.newJson.before,
					card_gua_2:this.newJson.after,
					car_gc_zx: parseInt(this.newJson.shaftIdx) + 1,
					car_dg_price:this.newJson.price,
					aip_date:this.newJson.date,
					rl_type:this.newJson.rlId,
					tyre_spec:this.newJson.tyre_spec,
					engine_brand:this.newJson.engine_brand,
				}
				if(is_hand){
					dg_json.carcard_json = daigua
					dg_json.car_type = this.newJson.modelIdx + 1 
					dg_json.synx = this.newJson.gua_date
					dg_json.card_1 = this.newJson.before
					dg_json.card_2 = this.newJson.after
				}
				let newDaigua = JSON.stringify(dg_json)
				if(mark){
									//console.log(this.newJson)
					_this.$c.appletMessageNotify('verify_end', 1).then((res) => {
						request('/goods/applyCarGoods',{
							token:uni.getStorageSync('token'),
							product:JSON.stringify({
								used_car_json:newDaigua,
								description:_this.editorCtx,
								picture:picture,
								imageArray:imgArr,
								city_id:cityId,
								province_id:provId,
								sale_price:price,
								goods_video_address:_this.videoSrc,
								groupArray:_this.newJson.group_idx,
							}),
						},"POST")
						.then((res)=>{
							let goodsId = parseInt(res.data.data);
							if(goodsId > 0){
								uni.reLaunch({
								    url: '/pages/common/release'
								});
							}
						})
					});
				}else{
					_this.$c.appletMessageNotify('verify_end', 1).then((res) => {
						request('/goods/applyCarGoods',{
							token:uni.getStorageSync('token'),
							product:JSON.stringify({
								used_car_json:newUsed,
								description:_this.editorCtx,
								picture:picture,
								imageArray:imgArr,
								province_id:provId,
								city_id:cityId,
								sale_price:price,
								goods_video_address:_this.videoSrc,
								groupArray:_this.newJson.group_idx,
							})
						},"POST")
						.then((res)=>{
							let goodsId = parseInt(res.data.data);
							if(goodsId > 0){
								uni.reLaunch({
								    url: '/pages/common/release'
								});
							}
						})
					})
					
				}
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
