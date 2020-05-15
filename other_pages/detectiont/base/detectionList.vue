<template>
	<view class="detection" style="background-color: #F4F4F4;">
		<scroll-view style="max-height: calc(100vh - 97rpx);" scroll-y="true" >
			<view class="detection-head">
				<view class="head-left">
					检测师
					<text>（请选择检测师）</text>
				</view>
				<view class="head-right head-left" @tap="toView">
					查看检测项
				</view>
			</view>
			
			<view class="detection-cont" v-if="testList.length !== 0">
				<radio-group @change="handleChange">
					<label style="padding-right: 0;" v-for="(item,index) in testList" :key="item.uid">
						<view class="detection-list">
							<view class="radio">
								<radio style="transform:scale(0.6)" color="#006BB3" :value="item.uid"/>
							</view>
							<view class="list-imgs">
								<image 
									style="width: 100%; height: 100%;" 
									lazy-load="true" 
									@error="handleErr($event,index)" 
									:src="item.user_headimg | filterImg" 
									mode="scaleToFill"></image>
							</view>
							<view class="list-content">
								<view class="title">
									<text class="name">{{item.nick_name}}</text>
									<text class="level">{{item.testing_level}}</text>
								</view>
								<view class="introduce" @tap.stop="handleCertificate(item.testing_auth_img)">
									<text class="describe">{{item.testing_desc}}</text>
									<text class="certificate">【查看资格证书】</text>
								</view>
								<view class="address">
									<text>所在地区：</text>
									<text>{{item.testing_province_name}}{{item.testing_city_name}}{{item.testing_district_name}}</text>
								</view>
								<view class="price">
									<text>收费标准：</text>
									<text>{{item.testing_charge}}元/台</text>
								</view>
							</view>
						</view>
					</label>
				</radio-group>	
			</view>
			<view class="not-data" v-else>
				暂无检测师
			</view>
			
		</scroll-view>
		<view class="ascertain">
			<button type="primary" :disabled="!show" @tap="handleSub">确定</button>
		</view>
		
	</view>
</template>

<script>
	let _this
	import { goWindow } from '@/api/navigate.js'; // 页面跳转
	import * as MemberApi from "@/api/member/member.js"
	import * as PayApi from "@/api/pay/pay.js"
	import config from '@/api/config.js';
	export default{
		props:{
			testList:{
				type:Array
			},
			orderId:{
				type:String
			}
		},
		data(){
			return{
				show:false,
				uid:'',
				openid:''
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		created() {
			_this = this;
			// 获取会员信息
			MemberApi.getMemberInfo().then( res => {
				_this.openid = res.data.user_info.wx_openid
			})
		},
		methods:{
			getData(){
				
			},
			handleSub(){
				let title = '信息提交成功';
				let font = "检测师将联系您，请保持电话通畅!"
				_this.$c.showLoading('创建充值订单中！');
				// 创建检测师费用外部交易号 
				PayApi.getOrderTestingOutTrandeNo().then(res=>{
					let out_trade = res.data;
					if(out_trade == null || out_trade == undefined){
						_this.$c.hideLoading()
						_this.$c.msg('创建外部交易流水号失败')
						return
					}
					// 创建检测师费用订单
					PayApi.createTestingOrder({
						testing_uid:_this.uid,
						out_trade_no:out_trade,
						order_id:_this.orderId
					}).then(res=>{
						let is_success = res.data
						if(is_success == 0 || is_success == null){
							_this.$c.hideLoading()
							_this.$c.msg('创建检测师费用订单失败')
							return 
						}
						_this.$c.hideLoading()
						_this.$c.showLoading('支付中！');
						// 微信统一下单
						PayApi.appletWechatPay({
							out_trade_no : out_trade,
							openid : _this.openid
						}).then(res=>{
							let wx_order_data = res.data
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
									setTimeout(()=>{
										goWindow(`/other_pages/common/subSuccess?title=${title}&font=${font}`)
									},500)
									
							    },
							    fail: function (err) {
									_this.$c.hideLoading()
									_this.$c.msg('支付失败')
							    }
							});
						})
					})
				})
			},
			handleCertificate(testingAuth){
				uni.previewImage({
					urls: [config.domain + testingAuth],
					loop: true,
				});
				
			},
			handleChange(e){
				this.show = true;
				this.uid = e.detail.value;
			},
			// 查看检测项
			toView(){
				goWindow('/other_pages/common/TestingDetaile')
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.detection-head
		display flex
		padding 0 24rpx
		background-color #FFFFFF
		.head-left
			width 50%
			color #222222
			font-size 28rpx
			line-height 70rpx
			font-weight bold
			text
				font-weight normal
				color #444444
				font-size 24rpx
		.head-right
			text-align right
			color #2E70D2
			font-size 24rpx
	.detection-cont	
		padding 24rpx
		.detection-list
			padding 15rpx 0rpx
			background-color #FFFFFF
			border-radius 15rpx
			margin-bottom 24rpx
			.radio
				display inline-block
				width 60rpx
				vertical-align middle
			.list-imgs
				overflow hidden
				display inline-block
				width 153rpx
				height 153rpx
				vertical-align middle
				border-radius 10rpx
			.list-content
				display inline-block
				vertical-align middle
				margin-left 3%
				.title .name
					font-size 28rpx
					font-weight bold
					color #222222
				.title .level
					margin-left 22rpx
					font-size 22rpx
					color #444444
				.introduce .describe
					overflow hidden
					display inline-block
					width 240rpx
					vertical-align middle
					text-overflow ellipsis
					white-space nowrap
					font-size 24rpx
					color #000
				.introduce .certificate
					vertical-align middle
					color #2E70D2
					font-size 24rpx
				.address
					font-size 22rpx
					color #222
				.price
					font-size 22rpx
					color #222
				.price text:nth-child(2)
					color #FF1A1A
	.not-data
		text-align center
		line-height 100rpx
	.ascertain
		position fixed
		left 0
		right 0
		bottom 45rpx
		z-index 5
		padding 0 35rpx 10rpx
		background-color #F4F4F4
		button
			background-color #006BB3
</style>
