<template>
	<view class="detail-swiper">
		<swiper 
			class="swiper"
			@change="intervalChange" 
			:autoplay="autoplay" 
			:duration="duration" 
			:interval="interval" 
			circular="true">
			<swiper-item v-if="video !== ''">
				<view class="swiper-item">
					<video :src="video | filterVideo" @ended="handleEnd" @play="handlePlay" objectFit="cover" controls="true"></video>
				</view>
			</swiper-item>
			<swiper-item v-for="(img,index) in imgList" :key="index">
				<view class="swiper-item" @tap="viewImages(index)">
					<image :src="img.pic_cover | filterImg" mode="aspectFill" lazy-load="true"></image>
				</view>
			</swiper-item>
			
		</swiper>
		<view class="num">
			<text>{{num}}</text>/{{changeNum}}
		</view>
		<view class="price">
			<image src="../../../static/images/bj333.jpg" mode="scaleToFill"></image>
			<view class="price-data">
				价格:<text>{{price}}万</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	export default{
		props:{
			imgList:{
				type:Array,
			},
			video:{
				type:String
			},
			price:{
				type:String
			}
		},
		data(){
			return{
				num:"1",
				autoplay:true,
				duration:1000,
				interval:2000,
			}
		},
		computed:{
			changeNum(){
				if(this.video){
					return this.imgList.length + 1
				}else{
					return this.imgList.length
				}
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			},
			filterVideo(value){
				if(value){
					return config.domain + value
				}
			}
		},
		methods:{
			intervalChange(e){
				this.num = e.detail.current + 1
			},
			handlePlay(e){
				if(e.type == "play"){
					this.autoplay = false
				}
			},
			handleEnd(e){
				if(e.type == "ended"){
					this.autoplay = true
				}
			},
			viewImages(index){
				let _this = this;
				let imgArr = [];
				_this.imgList.forEach((img,idx)=>{
					imgArr.push(config.domain + img.pic_cover)
				})
				uni.previewImage({
					current:index,
					urls: imgArr,
					indicator:"default",
					loop:true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style scoped lang="stylus">
	.detail-swiper
		position relative
		.swiper
			width 100%
			height 373rpx
			.swiper-item
				height 100%
				image
					width 100%
					height 100%
				video
					width 100%
					height 100%	
		.num 
			position absolute
			bottom 105rpx
			right 24rpx
			color #FFFFFF
		.price
			position relative
			width 100%
			height 90rpx
			image
				width 100%
				height 100%
			.price-data
				position absolute
				left 185rpx
				top 10rpx
				font-size 26rpx
				color #FFFFFF
				text
					font-size 40rpx
					font-weight bold
</style>
