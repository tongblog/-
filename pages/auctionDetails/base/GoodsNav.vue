<template>
	<view class="goods-nav" :class="{bomNav:state != 1}">
		<view class="failure" v-if="state != 1">
			该车源已失效
		</view>
		<view style="border-top:16rpx #F4F4F4 solid;">
			<uni-goods-nav :fill="false"  :options="options" :button-group="buttonGroup" @click="handleSrc" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	let _this;
	import {callPhone} from "@/api/callphone.js"
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js' // 页面跳转
	import {shoucang,quxiaosc} from "@/api/shoucang/shoucang.js"
	import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	export default {
		props: {
			show: {
				type: Boolean
			},
			action_id: {
				type: Number
			},
			goods_id: {
				type: Number
			},
			price: {
				type: String
			},
			add_price:{
				type:Number
			},
			jsonData: {
				type: Object
			},
			records:{
				type:Array
			},
			end_time:{
				type:Number
			},
			fav_goods:{
				type:Number
			},
			is_remind:{
				type:Number
			},
			state:{
				type:Number
			}
		},
		data() {
			return {
				mark: false,
				setim: false,
				options: [{
					icon: '/static/images/tixing1.jpg',
					text: '提醒',
				}, {
					icon: '/static/images/shoucang1.png',
					text: '收藏'
				}, {
					icon: '/static/images/lipin.png',
					text: '领礼品'
				}, {
					icon: '/static/images/kefu.png',
					text: '客服'
				}],
				buttonGroup: [{
					text: '出 价',
					backgroundColor: '#FF7E1F',
					color: '#fff'
				}],
				flag:true,
			}
		},
		created() {
			_this = this
		},
		watch:{
			show(bool){
				if (bool) {
					this.buttonGroup[0].text = "参与抢购"
				}
			},
			fav_goods:{
				handler(num){
					if(num == 1){
						_this.options[1].icon = '/static/images/shoucang2.png';
						_this.mark = !this.mark;
					}
				}
			},
			is_remind:{
				handler(num){
					if(num == 1){
						_this.options[0].icon = '/static/images/tixing2.png'
					}
				}
			}
		},
		components: {
			uniGoodsNav
		},
		methods: {
			handleSrc(e) {
				let _this = this;
				let toKen = uni.getStorageSync('token');
				if (e.index === 1 && this.mark == false && toKen !== "") {
					this.mark = !this.mark;
					shoucang(this,toKen, this.goods_id, this.price, "goods", 5, this.action_id);
				} else if (e.index === 1 && this.mark == true && toKen !== "") {
					this.mark = !this.mark;
					quxiaosc(this,toKen, this.goods_id, "goods", this.action_id)
				} else if (e.index === 0 && toKen !== "") {
					if(_this.is_remind == 1)return
					_this.$c.appletMessageNotify('promotion_start').then((res) => {
						request("/goods/addActionRemind", {
								token: toKen,
								action_id: _this.action_id,
								goods_id: _this.goods_id
							}, "POST")
							.then((res) => {
								//console.log(res.data.code)
								if (res.data.code > 0 && _this.is_remind == 0) {
									_this.$c.msg("抢购提醒已开启")
									_this.options[0].icon = '/static/images/tixing2.png'
								}else{
									_this.$c.msg("请勿重复提醒")
								}/* else if(res.data.code < 0 && _this.is_remind == 1){
									_this.$c.msg("抢购提醒已关闭")
									_this.options[0].icon = '/static/images/tixing1.jpg'
									console.log(_this.is_remind)
								} */
							})
					}).catch((err) => {
						_this.$c.hideLoading();
						_this.$c.msg('设置提醒失败');
					})
					
				} else if (e.index === 3) {
					callPhone().then((res)=>{
						try{
							uni.makePhoneCall({
							    phoneNumber: res.data.data.value.tel_service_addr
							});
						}catch(err){
							console.log(err)
						}
					})
				} else if (e.index === 2 && toKen !== "") {
					goWindow("/pages/common/getGift")
				} else{
					goWindow("/pages/common/login?json=",JSON.stringify(_this.jsonData))
				}
			},
			buttonClick(e) {
				if(!this.flag)return
				let date = new Date();
				let newDate = new Date(this.end_time * 1000);
				if(date > newDate && this.state != 1){
					this.$c.msg("当前活动已结束")
					return
				};
				let _this = this;
				let prices = _this.records[0] == undefined ? (_this.price*10000) + _this.add_price : +_this.records[0].offer_price + _this.add_price;
				let jsonData = JSON.stringify(_this.jsonData)
				let toKen = uni.getStorageSync('token');
				_this.flag = false;
				if (e.index == 0 && this.show == false && toKen !== '') {
					request("/member/isbindmobile", {
							token: uni.getStorageSync('token'),
						}, "POST")
						.then((res) => {
							if (res.data.data === 1) {
								request("/member/memberIsNeedBail", {
										token: toKen,
										type: 1,
										goods_id: _this.goods_id,
										promotion_id: _this.action_id, 
									}, "POST")
									.then((res) => {
										let jsonId = {
											goods_id: _this.goods_id,
											promotion_id: _this.action_id, 
										}
										if (res.data.data > 0) {
											setTimeout(()=>{
												_this.flag = true;
											},1000)
											goWindow("/pages/payDeposit/payment?json=",JSON.stringify(jsonId))
										} else {
											uni.showModal({
											    title: ' ',
											    content: "您将以最高出价(¥"+ prices +")元进行出价,是否确认出价?",
												confirmText: "出价",
												confirmColor: "#FF7E1F",
											    success: function (res) {
											        if (res.confirm) {
											            request("/goods/addPromotionActionRecoeds", {
											            		token: uni.getStorageSync('token'),
											            		goods_id: _this.goods_id,
											            		action_id: _this.action_id,
											            	}, "POST")
											            	.then((res) => {
																uni.showToast({
																    title: '您已出价成功,请耐心等待结果！',
																	mask: true,
																	icon: "none",
																    duration: 2000,
																	success(res) {
																		_this.$emit("handleConfirm", 1)	
																	}
																});
											            		
											            	})
											        } else if (res.cancel) {
											            console.log('用户点击取消');
											        }
											    }
											});
											
										}
									})

							} else {
								let jsonData = JSON.stringify(_this.jsonData)
								//console.log(jsonData)
								goWindow('/pages/common/phonenumber?json=', jsonData)
							}
						})
				} else if (e.index == 0 && this.show == true && toKen !== '') {
					request("/member/isbindmobile", {
							token: uni.getStorageSync('token'),
						}, "POST")
						.then((res) => {
							if (res.data.data === 1) {
								request("/member/memberIsNeedBail", {
										token: toKen,
										type: 1
									}, "POST")
									.then((res) => {
										if (res.data.data < 0) {
											goWindow("/pages/payDeposit/payment")
										} else {
											uni.showModal({
												title: '提示',
												content: '暂未开始,请耐心等待！',
												showCancel: false,
												confirmText: "我知道了",
												confirmColor: "#FF7E1F",
												success(res) {
													if(res.confirm) {
														console.log("确定")
													}
												}
											});

										}
									})

							} else {
								
								//console.log(jsonData)
								goWindow('/pages/common/phonenumber?json=', jsonData)
							}
						})
				} else {
					goWindow("/pages/common/login?json=", jsonData)
				};
			}
		}
	}
</script>

<style scoped lang="stylus">
	.goods-nav 
		position fixed 
		left 0 
		bottom 0
		width 100% 
	.bomNav
		filter grayscale(50%)
		.failure
			background-color rgba(0,0,0,.5)
			color #fff
			text-align center
</style>
