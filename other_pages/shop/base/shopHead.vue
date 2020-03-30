<template>
	<view class="shop-head">
		<view class="shop-bj">
			<image src="../../../static/images/shopbj.png" mode="scaleToFill"></image>
		</view>
		<view class="abstract">
			<view class="abstract-con" v-for="(item,index) in shopData" :key="index">
				<view class="shop-log">
					<image :src="item.shop_img5 | filterImg" mode="scaleToFill"></image>
				</view>
				<view class="shop-name">
					{{item.shop_name}}
				</view>
				<view class="shop-label">
					<view class="nature">
						{{item.type_name}}
						
					</view>
					<uni-rate class="rate" disabled="true" margin="2" max="5" size="15" :value="item.shop_servicecredit"></uni-rate>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			shopData:{
				type:Array
			}
		},
		data(){
			return{
				
			}
		},
		components:{
			uniRate
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			},
		},
		computed:{
			
		},
		methods:{
		
		}
	}
</script>

<style scoped lang="stylus">
	.shop-head
		position relative
		.shop-bj
			width 100vw
			height 170rpx
			image
				width 100%
				height 100%
		.abstract
			position absolute
			left 0
			right 0
			bottom -83rpx
			padding 0 24rpx
			.abstract-con
				height 166rpx
				border-radius 15rpx
				background-color #FFFFFF
				box-shadow 0 0 10rpx #CCCCCC
				.shop-log
					position absolute
					overflow hidden
					left 0
					right 0
					top -50rpx
					margin auto
					width 100rpx
					height 100rpx
					border-radius 50%
					image
						width 100%
						height 100%
				.shop-name
					padding-top 50rpx
					font-size 28rpx
					color #222222
					text-align center
					font-weight bold
				.shop-label	
					width 308rpx
					margin auto
					.nature
						display inline-block
						padding 0 10rpx
						margin-right 15rpx
						background-color #FFF2C5
						color #FF8D28
						font-size 20rpx
						border-radius 5rpx
					.rate
						display inline-block
						
					
					
		
		
		
</style>
