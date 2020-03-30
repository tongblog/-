<template>
	<view>
		<view class="store-information" v-for="(item,index) in shop_data" :key="index">
			<view class="store-name" @tap="clickShop">
				<text>{{item.shop_name}}</text>
				<icon class="iconfont icon-dianpujiantou"></icon>
			</view>
			<view class="store-label">
				<view class="label">{{item.type_name}}</view>
				<uni-rate disabled="true" margin="2" max="5" size="15" :value="item.shop_servicecredit"></uni-rate>
			</view>
			<view class="discounts" :class="{discou:show}">
				<view class="discounts-item">
					<view class="item-left">店铺优惠:</view>
					<view class="item-right" :class="{itemtap:show}">
						{{item.shop_discount_notice}}
					</view>
				</view>
				<view class="discounts-item">
					<view class="item-left">店铺公告:</view>
					<view class="item-right" :class="{itemtap:show}">
						{{item.shop_notice}}
					</view>
				</view>
				<icon class="iconfont icon-dianpuhuodongjiantou" :class="{icon:show}" @tap="clickIcon"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				show:true,
				nodes:[{
						name: 'p',
						attrs: {
							class: 'p-class',
							style: 'color:#FFFFFF;'
						},
						back:false,
						children: [{
							type: 'text',
							text: '＋关注'
						}]
					}],
			}
		},
		props :{
			shop_data:{
				type:Array,
			}
		},
		watch : {
			shop_data(e){
				
			}
		},
		components:{
			uniRate
		},
		methods:{
			clickIcon(){
			 	this.show = !this.show
			},
			clickAttent(){
				this.nodes[0].attrs.style = "color:#0657A6;"
				this.nodes[0].children[0].text = "已关注"
				this.nodes[0].back = true
			},
			clickShop(){
				goWindow('/other_pages/member/shop/base/ShopDetails')
				
			}
		}
	}
</script>

<style scoped lang="stylus">
	.store-information
		position relative
		padding 25rpx 25rpx 90rpx 25rpx
		background-color #0657A6
		.store-name
			display inline-block
			font-size 36rpx
			color #FFFFFF
			icon
				padding-left 18rpx
				font-size 28rpx
		.attent
			background-color #FFFFFF
		.attention
			display inline-block
			float right
			margin-top 10rpx
			width 97rpx
			border 2rpx solid #FFFFFF
			border-radius 30rpx
			line-height 35rpx
			text-align center
			font-size 22rpx		
		.store-label
			display flex
			.label
				padding 0 11rpx
				margin-right 24rpx
				background-color #FFF2C5
				border-radius 5rpx
				font-size 21rpx
				line-height 34rpx
				color #FF8D28
		.discou
			padding-bottom 20rpx !important
		.discounts
			position absolute
			top 150rpx
			left 0
			right 0
			margin auto
			width 89%
			padding 20rpx 20rpx 50rpx 20rpx
			border-radius 15rpx
			background-color #FFFFFF
			box-shadow 0 0 10rpx 0 #CCCCCC
			.discounts-item:nth-child(2)
				padding-top 10rpx
			.discounts-item
				display flex
				color #444444
				.item-left
					width 18%
					font-size 24rpx
				.itemtap
					height 35rpx
					overflow hidden	
				.item-right	
					width 80%
					font-size 24rpx
					text
						display block
						white-space nowrap
						overflow hidden
						text-overflow ellipsis
			.icon
				text-align right !important
				bottom 30rpx !important
				transform rotate(0deg) !important
			.iconfont
				position absolute
				left 0
				right 0
				bottom -10rpx
				margin auto
				padding 0 20rpx
				transform rotate(180deg)
				font-size 12rpx
				text-align center
		.service
			position fixed
			left 0
			bottom 0
			width 100%
			line-height 88rpx
			background-color #0657A6
			text-align center
			font-size 25rpx
			color #FFFFFF
			icon
				padding-right 15rpx
				font-size 25rpx
</style>
