<template>
	<view class="uploading">
		<view class="upload-title">请拍摄并上传你的身份证照片</view>
		<view class="uni-flex uni-row">
			<view class="flex-item">
				<view class="item-top" @tap="clickPositive">
					<view class="img">
						<image :src="imgUrl1 | filterImg1" mode="scaleToFill"></image>
					</view>
				</view>
				<view class="item-btm">
					拍摄正面
				</view>
			</view>
			<view class="flex-item">
				<view class="item-top" @tap="clickReverse">
					<view class="img">
						<image :src="imgUrl2 | filterImg2" mode="scaleToFill"></image>
					</view>
				</view>
				<view class="item-btm">
					拍摄反面
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {upload} from '@/api/upload.js'
	export default{
		data(){
			return{
				imgUrl1:"",
				imgUrl2:""
			}
		},
		filters:{
			filterImg1(img){
				if(img){
					return config.domain + img;
				}else{
					return '../../../static/images/shenfen2.png'
				}
			},
			filterImg2(img){
				if(img){
					return config.domain + img;
				}else{
					return '../../../static/images/shenfen1.png'
				}
			}
		},
		methods:{
			clickPositive(){
				upload().then((res)=>{
					this.imgUrl1 = res;
					let imgSrc1 = res;
					this.certificate(1,res).then((posRes)=>{
						if(parseInt(posRes.code) === -1){
							uni.showToast({
							    title: '识别错误,请重新上传',
								icon:'none',
							    duration: 4000
							});
						}else{
							this.$emit("clickPos",posRes.data,imgSrc1)
						}
						
					})
				})
			},
			clickReverse(){
				upload().then((res)=>{
					this.imgUrl2 = res;
					let imgSrc2 = res;
					this.certificate(0,res).then((revRes)=>{
						if(parseInt(revRes.code) === -1){
							uni.showToast({
							    title: '识别错误,请重新上传',
								icon:'none',
							    duration: 4000
							});
						}else{
							this.$emit("clickRev",revRes.data,imgSrc2)
						}
						
					})
				})
			},
			async certificate(num,imgRes){
				return await new Promise((resolve,reject)=>{
					uni.request({
					    url: config.domain + 'api.php?s=/member/getIdCardInfo',
						method: 'POST',
					    data: {
					        token: uni.getStorageSync('token'),
							img_url: imgRes,
							data_carcard_type:num,
					    },
					    header: {
					        'content-type': 'application/json'
					    },
					    success(res){
							resolve(res.data)
					    }
					});
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.uploading
		padding 0 24rpx 30rpx 24rpx
		border-bottom 24rpx #F4F4F4 solid
		background-color #FFFFFF
		.upload-title
			padding 15rpx 0
			font-size 30rpx
			color #222222
			font-weight 600
			
		.uni-flex 
			justify-content space-between
			.flex-item
				overflow hidden
				width 47%
				border-radius 10rpx
				.item-top
					position relative
					width 100%
					height 219rpx
					background-color #F4F8FE
					.img
						position absolute
						top 0
						bottom 0
						left 0
						right 0
						margin auto
						width 237rpx
						height 156rpx
						image
							width 100%
							height 100%
				.item-btm
					background-color #0657A6
					color #FFFFFF
					line-height 60rpx
					font-size 28rpx
					text-align center
				
		
</style>
