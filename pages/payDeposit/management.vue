<template>
	<view class="management">
		<view class="man-header">
			<view class="top">
				<view class="left">保证金</view>
				<view class="right"><text>¥</text>{{bail_money + freeze_money}}</view>
			</view>
			<view class="content">
				<view class="frozen" @tap="handleFrozen">
					<view class="on">冻结金额</view>
					<view class="down">¥ {{freeze_money}}</view>
				</view>
				<view class="frozen" @tap="handleNotFrozen">
					<view class="on">已解冻金额</view>
					<view class="down">¥ {{bail_money}}</view>
				</view>
			</view>	
		</view>
		<view class="bottom">
			<icon class="iconfont icon-jiancefengxian"></icon>
			<view class="txt">
				点击已解冻金额,前往退款。
			</view>
		</view>
		<!-- <view class="btn">
			<button type="primary" v-on:click="bailRefund()" :disabled="is_refund > 0 ? true : false  ">退款</button>
			<button type="primary" v-on:click="investBail()" :disabled="is_need == 1 ? false : true ">充值{{need_money > 0 ? '(' + need_money +')' : ''}}</button>
		</view> -->
	</view>
</template>

<script>
	import {goWindow} from "@/api/navigate.js"
	import * as MemberApi from "@/api/member/member.js"
	import * as PayApi from "@/api/pay/pay.js"
	export default{
		data(){
			return{
				bail_money : 0,
				openid : '',
				freeze_money : 0
			}
		},
		onLoad() {
			
		},
		
		onShow() {
			let _this = this;
			_this.getData();
		},
		methods:{
			getData(){
				let _this = this;
				// 获取会员信息
				MemberApi.getMemberInfo().then( res => {
					_this.openid = res.data.user_info.wx_openid
					_this.bail_money = parseFloat(res.data.bail_money)
					_this.freeze_money = parseFloat(res.data.freeze_bail_money)
				})
				
			},
			
			// 冻结金额
			handleFrozen(){
				goWindow("/pages/payDeposit/amountFrozen?num=",this.freeze_money)
			},
			// 已解冻金额
			handleNotFrozen(){
				goWindow("/pages/payDeposit/refund?num=",this.bail_money)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.management
		position relative
		padding 30rpx 24rpx
		height 95vh
		.man-header
			box-shadow 0 0 5rpx 0 #CCCCCC
			background-color #FF7E1F
			border-radius 5rpx
			.top
				display flex
				height 244rpx
				justify-content space-between
				text-align center
				.left
					width 45%
					font-size 38rpx
					line-height 244rpx
					color #FFFFFF
				.right
					width 45%
					font-size 90rpx
					line-height 244rpx
					color #FFFFFF
					text
						font-size 32rpx
			.content
				display flex
				border-top 1rpx #FFFFFF solid
				.frozen:nth-child(1)
					border-right 1rpx #FFFFFF solid
				.frozen
					width 50%
					padding 10rpx 0
					text-align center
					.on
						color #FFFFFF
						font-size 24rpx
					.down
						color #FFFFFF
						font-size 40rpx
						line-height 50rpx
		.bottom
			padding 8rpx 5rpx
			icon
				color #FF7E1F
			.txt
				display inline-block
				margin-left 15rpx
				color #444444
				font-size 28rpx
				text
					color #2579CB
		.btn
			position absolute
			display flex
			bottom 30rpx
			left 34rpx
			right 34rpx
			justify-content space-between
			button
				width 45%
				background-color #FF7E1F
</style>
