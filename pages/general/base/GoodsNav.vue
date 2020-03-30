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
	import {goWindow} from "@/api/navigate.js"
	import {shoucang,quxiaosc} from "@/api/shoucang/shoucang.js"
	import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	export default{
		props:{
			goodsId:{
				type:Number
			},
			price:{
				type:String
			},
			storeId:{
				type:Number
			},
			state:{
				type:Number
			},
			fav_goods:{
				type:Number
			}
		},
		data(){
			return{
				mark:false,
				options: [{
				        icon: '/static/images/dianpu.png',
				        text: '店铺'
				      },{
				        icon: '/static/images/shoucang1.png',
				        text: '收藏'
				      },{
				        icon: '/static/images/lipin.png',
				        text: '领礼品'
				      },{
				        icon: '/static/images/kefu.png',
				        text: '客服'
				      }],
				      buttonGroup: [{
				        text: '免费咨询',
				        backgroundColor: '#FF2727',
				        color: '#fff'
				      }
				      ]
			}
		},
		components:{
			uniGoodsNav
		},
		created() {
			_this = this
		},
		watch:{
			fav_goods:{
				handler(num){
					if(num == 1){
						_this.options[1].icon = '/static/images/shoucang2.png';
						_this.mark = !this.mark;
					}
				}
			}
		},
		methods:{
			handleSrc(e){
				//console.log(e)
				let toKen = uni.getStorageSync('token');
				if(e.index === 1 && this.mark == false){
					shoucang(this,toKen,this.goodsId,this.price,"goods",6);
					this.mark = !this.mark;
				}else if(e.index === 1 && this.mark == true){
					quxiaosc(this,toKen,this.goodsId,"goods")
					this.mark = !this.mark;
				}else if(e.index === 3){
					callPhone().then((res)=>{
						try{
							uni.makePhoneCall({
							    phoneNumber: res.data.data.value.tel_service_addr
							});
						}catch(err){
							console.log(err)
						}
					})
				}else if(e.index === 2){
					if(toKen !== ""){
						goWindow("/pages/common/getGift")
					}else{
						goWindow("/pages/common/login?id=",this.goodsId)
					}
				}else if(e.index === 0){
					if(this.storeId !== 0){
						goWindow('/pages/storeDetails/storeDetails?id=',this.storeId)
					}else{
						this.$c.msg("该车源暂无所属店铺")
					}
					
				}
			},
			buttonClick(e){
				if(this.state !== 1){
					this.$c.msg("商品已下架");
					return
				}
				let _this = this;
				let toKen = uni.getStorageSync('token');
				if(e.index == 0 && toKen !== ''){
					request("/member/isbindmobile",{
							token:uni.getStorageSync('token'),
						},"POST")
						.then((res)=>{
							if(res.data.data === 1){
									_this.$c.appletMessageNotify('order_status',1).then((res) => {
										uni.showActionSheet({
											itemList: ['全款购', '分期购'],
											success(res) {
												_this.$c.showLoading("加载中")
												if(res.tapIndex == 0){
													request("/order/carOrderCreate",{
														token:toKen,
														goods_id:_this.goodsId,
														group_id:6,
														payment_type:8
													},"POST")
													.then((res)=>{
														setTimeout(() => {
															uni.reLaunch({
																url: '/pages/common/appointment'
															});
															uni.hideLoading();
														}, 300);
													})
												}else if(res.tapIndex == 1){
													let idJson = {
														goodsId:_this.goodsId,
														price:_this.price
													}
													setTimeout(() => {
														goWindow('/pages/general/base/installment?id=',JSON.stringify(idJson))
														uni.hideLoading();
													}, 300);
													
												}
											},
											fail: function (res) {
												console.log(res.errMsg);
												uni.hideLoading();
											}
										});
									})
							}else{
								goWindow('/pages/common/phonenumber?id=',this.goodsId)
							}
						})
				}else{
					goWindow('/pages/common/login?id=',this.goodsId)
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	.goods-nav
		position fixed
		bottom 0
		left 0
		width 100%
	.bomNav
		filter grayscale(50%)
		.failure
			background-color rgba(0,0,0,.5)
			color #fff
			text-align center	
</style>
