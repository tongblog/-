<template>
	<view class="shop-body">
		<view class="uni-flex uni-column">
			<view class="order flex-item">
				<!-- v-on:click="goWindow('/other_pages/shopList/shopList?status=-1') -->
				<view class="order-title" data-status="-1" @tap="goShopList">
					<view class="my-oder">我的订单</view>
					<view class="all-oder">
						<text>查看全部订单</text>
						<icon class="iconfont icon-jiantou"></icon>
					</view>
				</view>
				<view class="oder-list uni-flex uni-row">
					<view class="list-nav" data-status="0" @tap="goShopList">
						<view class="order-num-icon" v-if="orderNum[0] > 0">
							{{orderNum[0]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/dian1.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">已下单</view>
						
					</view>
					<view class="list-nav" data-status="1" @tap="goShopList">
						<view class="order-num-icon" v-if="orderNum[1] > 0" >
							{{orderNum[1]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/dian2.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">待验车</view>
					</view>
					<view class="list-nav" data-status="2" @tap="goShopList">
						<view class="order-num-icon" v-if="orderNum[2] > 0">
							{{orderNum[2]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/dian3.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">付定金</view>
					</view>
					<view class="list-nav" data-status="3" @tap="goShopList">
						<view class="order-num-icon" v-if="orderNum[3] > 0">
							{{orderNum[3]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/dian4.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">手续中</view>
					</view>
					<view class="list-nav" data-status="4" @tap="goShopList">
						<view class="order-num-icon" v-if="orderNum[4] > 0">
							{{orderNum[4]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/dian5.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">交易完成</view>
					</view>
				</view>
			</view>
			<view class="after-sales flex-item uni-flex uni-column">
				<view class="after-item flex-item" @tap="handleSellCar">
					<text>发布车辆</text>
					<icon class="iconfont icon-jiantou"></icon>
				</view>
				<view class="after-item flex-item" @tap="handleShop">
					<text>店铺预览</text>
					<icon class="iconfont icon-jiantou"></icon>
				</view>
				<view class="after-item flex-item" @tap="handleNotice">
					<text>店铺公告</text>
					<icon class="iconfont icon-jiantou"></icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { goWindow } from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				
			}
		},
		props:{
			shopId:{
				type:Number,
			},
			orderNum:{
				type:Array,
			}
		},
		methods: {
			goShopList(e){
				let status = e.currentTarget.dataset.status;
				let query = `status=${status}&id=${this.shopId}`
				goWindow(`/other_pages/shopList/shopList?`,query)
			},
			// goWindow(url){
			// 	goWindow(url)
			// },
			handleShop(){
				goWindow("/other_pages/member/shop/index")
			},
			handleSellCar(){
				this.$c.goUrl("/pages/sellcars/SellCars",2)
			},
			// 跳转店铺公告
			handleNotice(){
				goWindow(`/other_pages/shopSet/shopSet?id=${this.shopId}`)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.shop-body
		padding 0 24rpx
		margin-top 70rpx
		.uni-flex .order
				padding-bottom 15rpx
				box-shadow 0 0 10rpx 0 #ccc
				border-radius 25rpx
				margin-top 42rpx
				background-color #FFFFFF
				.order-title
					display flex
					justify-content space-between
					padding 0 21rpx
					border-bottom 2rpx #EEEEEE solid
					.my-oder
						font-size 28rpx
						line-height 70rpx
						color #222222
						font-weight bold
					.all-oder
						font-size 0
						line-height 40rpx
						text
							padding-right 10rpx
							font-size 24rpx
							color #777777
							vertical-align 2%
						icon
							font-size 10px
							color #777777
							vertical-align 6%
				.oder-list 
					padding-top 30rpx
					.list-nav
						display flex
						flex-wrap wrap
						justify-content center
						width 20%
						position relative
						.order-num-icon{
							position absolute
							top -5rpx
							right 18rpx
							background #fff
							border 1px solid #FF2828
							width 30rpx
							height 30rpx
							border-radius 50%
							text-align center
							line-height 30rpx
							font-size 24rpx
							color #FF2828
						}
						.nav-img
							width 80rpx
							height 80rpx
							image
								width 100%
								height 100%
						.nav-bar
							width 100%
							text-align center
							line-height 60rpx
							font-size 24rpx
							color #444444
		.after-sales
			box-shadow 0 0 10rpx 0 #ccc
			border-radius 25rpx
			padding 0 24rpx
			margin-top 30rpx
			background-color #FFFFFF
			.after-item
				border-bottom 2rpx #EEEEEE solid
				color #222222
				font-size 26rpx
				line-height 86rpx
				icon
					float right
					color #777777
					font-size 22rpx					
</style>
