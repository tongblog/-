<template>
	<view class="payment">
		<view class="pay-content">
			<view class="pay-title">保证金金额</view>
			<view class="price">¥2000</view>
			<view class="bottom">
				<radio-group @change="tapChange" style="display: inline-block; width: 60rpx;">
					<label class="radio"><radio value="1" style="transform: scale(0.6)" color="#0657A6"/></label>
				</radio-group>
				<view class="txt">
					我已阅读并同意<text @tap="handleText">保证金相关协议</text>
				</view>
			</view>
		</view>
		<view class="btn">
			<button 
				:class="{button:show}" 
				@click="investBail()"
				:disabled="!show" 
				type="primary">缴纳保证金</button>
		</view>
	</view>
</template>

<script>
	import * as MemberApi from "@/api/member/member.js"
	import * as PayApi from "@/api/pay/pay.js"
	import {goWindow} from "@/api/navigate.js"
	export default{
		data(){
			return{
				show:false,
				is_need : 1,
				openid : '',
				goodsId : 0,
				promotionId : 0,
			}
		},
		onLoad(option) {
			let _this = this;
			let {goods_id,promotion_id} = (JSON.parse(option.json))
			this.goodsId = goods_id;
			this.promotionId = promotion_id;
			_this.getData();
		},
		/* onShow() {
			let _this = this;
			_this.getData();
		}, */
		methods:{
			tapChange(e){
				let num = parseInt(e.detail.value)
				if(num == 1){
					this.show = true
				}
			},
			handleText(){
				/* goWindow("/pages/payDeposit/agreement") */
				goWindow("/other_pages/help/index?help_id=",18)
			},
			getData(){
				let _this = this;
				// 获取会员信息
				MemberApi.getMemberInfo().then( res => {
					_this.openid = res.data.user_info.wx_openid
					_this.bail_money = res.data.bail_money
				})
				// 会员是否需要交保证金
				MemberApi.memberIsNeedBail({
					type:1,
					goods_id:_this.goodsId,
					promotion_id:_this.promotionId,
				}).then( res => {
					_this.is_need = res.data
				})
				// 会员需要多少保证金
				MemberApi.memberNeedBailMoney({
					type:1,
					goods_id:_this.goodsId,
					promotion_id:_this.promotionId,
				}).then( res => {
					_this.need_money = res.data
				})
				// 是否可以退款
				MemberApi.isCantRefund().then( res => {
					_this.is_refund = res.data
				})
			},
			// 支付
			investBail(){
				let _this = this
				if(_this.is_need == 0){
					_this.$c.msg('您不需用充值保证金')
					return
				}
				_this.$c.showLoading('创建充值订单中！');
				try{
					// 获取充值外部订单交易号
					PayApi.getOutTrandeNo().then( res => {
						let trande_no = res.data
						if(trande_no == null || trande_no == undefined){
							_this.$c.hideLoading()
							_this.$c.msg('创建外部交易流水号失败')
							return
						}
						// 创建保证金订单
						PayApi.createBailMoneyOrder({
							type : 1,
							out_trade_no : trande_no,
							goods_id:_this.goodsId,
							promotion_id:_this.promotionId,
						}).then( res => {
							let is_success = res.data
							if(is_success == 0 || is_success == null){
								_this.$c.hideLoading()
								_this.$c.msg('创建保证金充值订单失败')
								return 
							}
							_this.$c.hideLoading()
							_this.$c.showLoading('支付中！');
							// 微信统一下单
							PayApi.appletWechatPay({
								out_trade_no : trande_no,
								openid : _this.openid
							}).then( res => {
								let wx_order_data = res.data
								if(wx_order_data.result_code == 'SUCCESS'){
									
									uni.requestPayment({
									    provider: 'wxpay',
									    timeStamp: String(wx_order_data.timestamp),
									    nonceStr: wx_order_data.nonce_str,
									    package: "prepay_id=" + wx_order_data.prepay_id,
									    signType: 'MD5',
									    paySign: wx_order_data.PaySign,
									    success: function (res) {
											_this.$c.hideLoading()
									        _this.$c.msg('支付成功')
											_this.getData()
											uni.navigateBack({
											    delta: 1
											});
									    },
									    fail: function (err) {
											_this.$c.hideLoading()
											_this.$c.msg('支付失败')
									        // console.log('fail:' + JSON.stringify(err));
											
									    }
									});
								}else{
									_this.$c.hideLoading()
									_this.$c.msg(wx_order_data.return_msg)
									return 
								}
							})
						})
					})
				}catch(e){
					//TODO handle the exception
					console.log(e)
					_this.$c.hideLoading()
					_this.$c.msg(e)
				}
				
			},
		}
	}
</script>

<style scoped lang="stylus">
	.payment
		position relative
		padding 30rpx 33rpx
		height 95vh
		.pay-content
			box-shadow 0 0 5rpx 0 #CCCCCC
			border-radius 5rpx
			text-align center
			.pay-title
				padding-top 30rpx
				font-size 32rpx
				color #444444
				font-weight 600
			.price
				margin 0 35rpx
				border-bottom 2rpx #87C4FF dashed 
				color #FF943E
				font-size 90rpx
			.bottom
				padding 10rpx
				.txt
					display inline-block
					font-size 24rpx
					color #333333
					text
						color #0657A6
		.btn
			position absolute
			left 35rpx
			right 35rpx
			bottom 30rpx
			.button
				background-color #0657A6
			button
				background-color #CDCDCD
				
		
</style>
