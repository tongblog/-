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
					<video :src="video | filterImg" @ended="handleEnd" @play="handlePlay" objectFit="cover" controls="true"></video>
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
		<view class="price" v-if="!show">
			<image src="../../../static/images/jingpaibj01.jpg" mode="scaleToFill"></image>
			<view class="price-data">
				距离结束还有:<text>{{hr}}</text>:<text>{{min}}</text>:<text>{{sec}}</text>
			</view>
		</view>
		<view class="price" v-if="show">
			<image src="../../../static/images/jingpaibj02.png" mode="scaleToFill"></image>
			<view class="price-data">
				距离开始还有:<text>{{hr1}}</text>:<text>{{min1}}</text>:<text>{{sec1}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	let timer = null
	import config from '@/api/config.js';
	import {countdown} from "@/api/countdown.js"
	export default{
		props:{
			show:{
				type:Boolean,
				default:false,
			},
			end_time:{
				type:Number
			},
			start_time:{
				type:Number
			},
			imgList:{
				type:Array,
			},
			video:{
				type:String
			}
		},
		watch:{
			start_time(value){
				this.countdowns2(value)
			},
			end_time(value){
				this.countdowns1(value)
			}
			
		},
		data(){
			return{
				num:"1",
				hr:"00",
				min:'00',
				sec:"00",
				hr1:"00",
				min1:'00',
				sec1:"00",
				autoplay:true,
				duration:1000,
				interval:2000,
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
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
		methods:{
			intervalChange(e){
				this.num = e.detail.current + 1
			},
			countdowns1(time){
				const end = new Date(parseInt(time) * 1000)
				clearInterval(timer)
				timer = setInterval(async ()=>{
					let {hr,min,sec} = await countdown(end)
					if(sec){
						this.hr = hr;
						this.min = min;
						this.sec = sec
					}else{
						clearInterval(timer)
					}	  
				},1000)
			},
			countdowns2(time){
				let times = null;
				const end = new Date(parseInt(time) * 1000)
				clearInterval(times)
				times = setInterval(async ()=>{
					let {hr,min,sec} = await countdown(end)
					if(sec){
						this.hr1 = hr;
						this.min1 = min;
						this.sec1 = sec
					}else{
						clearInterval(times)
					}	  
				},1000)
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
				right 23rpx
				top 20rpx
				font-size 28rpx
				color #FFFFFF
				font-weight bold
				text
					display inline-block
					width 42rpx
					background-color #FFFFFF
					border-radius 8rpx
					color #FF7F21
					text-align center
					line-height 42rpx
					font-size 26rpx
					font-weight bold
</style>
