<template>
	<view>
		<view class="wrap" v-if="isShow">
			<view class="dialog">
				<view class="text">{{isSuccess?'订单支付成功':'订单付款失败'}}</view>
				<view class="back">返回APP<button open-type="launchApp" class="btn" :plain='true'></button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { goWindow } from '@/api/navigate.js'  // 页面跳转
	export default {
		data() {
			return {
				token:'',//用户标识
				pay_type:'',// 1.订单 2.充值
				source_domain:'',//来源域名 http://test.chinartn.com
				source_id:'',//支付订单id
				source_token:'',//来源token
				isShow:false,
				isSuccess:false
			}
		},
		onLoad(option) {
			this.pay_type = option.pay_type || 1
			this.source_domain = option.source_domain || 'http://test.chinartn.com'
			this.source_id = option.source_id || 324
			this.source_token = option.source_token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIzODgiLCJleHAiOjE1OTI5ODQyOTMsInBsYXRmb3JtIjoid3gifQ.aYNxjo-ncUccwMUWfAtNMPk5mLKDHhsbX1rIcDolfGw'
			this.token = uni.getStorageSync('token') || 'MDAwMDAwMDAwMJjcemKSuIGetZ54Z4CdqJrHiGjel6p-ppBmt8eai4HOgs1yag'
			if(this.token == ""){
				goWindow("/pages/common/login")
			}
		},
		onShow(){
			this.token = uni.getStorageSync('token') || 'MDAwMDAwMDAwMJjcemKSuIGetZ54Z4CdqJrHiGjel6p-ppBmt8eai4HOgs1yag'
			if(this.token != "" && this.isShow==false){
				this.pay()
			}
		},
		methods: {
			pay() {
				uni.showLoading({
					title:'检测支付环境...'
				})
				uni.request({
				    url: 'https://api.chinartn.cn/api.php?s=/pay/h5AppPay',
				    data: {
						token:this.token,
						pay_type:this.pay_type,
						source_domain:this.source_domain,
						source_id:this.source_id,
						source_token:this.source_token
					},
					method:'POST',
					header: {
					  'content-type':'application/x-www-form-urlencoded'
					},
				    success: (res) => {
				        this.wxPay(res.data.data.data)
				    },
					fail: (err) => {
						
					}
				})
			},
			// 微信支付
			wxPay(val) {
				val = JSON.parse(val)
				uni.getProvider({
				    service: 'payment',
				    success: (res) => {
						uni.hideLoading();
				        uni.requestPayment({
				            provider: res.provider[0],
				            orderInfo: 'orderInfo', //微信、支付宝订单数据
							"timeStamp":val.timeStamp, //时间戳，自1970年以来的秒数
							"nonceStr":val.nonceStr, //随机串     
							"package":val.package,     
							"signType":val.signType,         //微信签名方式：     
							"paySign":val.paySign, //微信签名 
				            success: (res) => {
				                console.log('success:' + JSON.stringify(res));
								this.isShow = true
								this.isSuccess = true
				            },
				            fail: (err) => {
				                console.log('fail:' + JSON.stringify(err));
								this.isShow = true
								this.isSuccess = false
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.wrap
		height 100vh
		background-color rgba(0,0,0,.5)
		display flex
		align-items center
		justify-content center
		.dialog
			width 300rpx
			background-color #fff
			padding 30rpx
			.text
				line-height 80rpx
				text-align center
			.back
				position relative
				width 200rpx
				height 60rpx
				line-height 60rpx
				text-align center
				margin 0 auto
				font-size 28rpx
				color #fff
				background-color #ea0000
				border-radius 4rpx
				.btn
					position absolute
					top 0
					left 0
					width 100%
					height 100%
					opacity 0
</style>
