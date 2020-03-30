<template>
	<view class="center-body">
		<view class="remind">
			<view class="remind-title">消息提醒</view>
			<view class="remind-data">
				<uni-notice-bar
					background-color="#ffffff"
					color="#444444"
					scrollable="true"
					speed="50"
					single="false" 
					:text="notice"></uni-notice-bar>
			</view>
		</view>
		<view class="uni-flex uni-column">
			<view class="order flex-item">
				<view class="order-title" v-on:click="goWindow('/other_pages/member/orderlist/index?status=-1')">
					<view class="my-oder">我的订单</view>
					<view class="all-oder">
						<text>查看全部订单</text>
						<icon class="iconfont icon-jiantou"></icon>
					</view>
				</view>
				<view class="oder-list uni-flex uni-row">
					<view class="list-nav" v-on:click="goWindow('/other_pages/member/orderlist/index?status=0')">
						<view class="order-num-icon" v-if="member_index_data.order_status[0] > 0">
							{{member_index_data.order_status[0]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/oder1.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">已下单</view>
						
					</view>
					<view class="list-nav" v-on:click="goWindow('/other_pages/member/orderlist/index?status=1')">
						<view class="order-num-icon" v-if="member_index_data.order_status[1] > 0" >
							{{member_index_data.order_status[1]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/oder2.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">待验车</view>
					</view>
					<view class="list-nav" v-on:click="goWindow('/other_pages/member/orderlist/index?status=2')">
						<view class="order-num-icon" v-if="member_index_data.order_status[2] > 0">
							{{member_index_data.order_status[2]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/oder3.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">付定金</view>
					</view>
					<view class="list-nav" v-on:click="goWindow('/other_pages/member/orderlist/index?status=3')">
						<view class="order-num-icon" v-if="member_index_data.order_status[3] > 0">
							{{member_index_data.order_status[3]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/oder4.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">手续中</view>
					</view>
					<view class="list-nav" v-on:click="goWindow('/other_pages/member/orderlist/index?status=4')">
						<view class="order-num-icon" v-if="member_index_data.order_status[4] > 0">
							{{member_index_data.order_status[4]}}
						</view>
						<view class="nav-img">
							<image src="../../../static/images/oder5.png" mode="scaleToFill"></image>
						</view>
						<view class="nav-bar">交易完成</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import { goWindow } from '@/api/navigate.js'  // 页面跳转
	export default {
		props: {
			member_index_data: {
				type: Object,
				// 对象或数组默认值必须从一个工厂函数获取
				default: function() {
					return {};
				}
			},
			notice:{
				type:Array
			}
		},
		components:{
			uniNoticeBar
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		
		methods: {
			goWindow(url){
				console.log(url)
				goWindow(url)
			}
		}
	};
</script>

<style scoped lang="stylus">
	.center-body
		position relative
		padding 25rpx 24rpx
		background-color #F4F4F4
		.remind
			position absolute
			top -30rpx
			display flex
			width 88%
			padding 12rpx 22rpx
			box-shadow 0 0 10rpx 0 #ccc
			background-color #FFFFFF
			border-radius 25rpx
			.remind-title
				font-size 28rpx
				color #222222
				font-weight bold
			.remind-data
				overflow hidden
				margin-left 40rpx
				font-size 26rpx
				color #444444
		
		.uni-flex .flex-item
				height 238rpx
				box-shadow 0 0 10rpx 0 #ccc
				border-radius 25rpx
		.uni-flex .order
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
							top -10rpx
							right 30rpx
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
							width 70rpx
							height 56rpx
							image
								width 100%
								height 100%
						.nav-bar
							width 100%
							text-align center
							line-height 60rpx
							font-size 24rpx
							color #444444
</style>