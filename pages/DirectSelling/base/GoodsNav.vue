<template>
	<view class="goods-nav" :class="{bomNav:state != 1}">
		<view class="failure" v-if="state != 1">
			该车源已失效
		</view>
		<view style="border-top:16rpx #F4F4F4 solid;">
			<uni-goods-nav :fill="false"  :options="options" :button-group="buttonGroup" @click="handleSrc" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
		<orderTime 
			v-if="order_time" 
			@handleClose="handleClose"
			@handleDate="handleDate"></orderTime>
	</view>
</template>

<script>
	let _this;
	import {callPhone} from "@/api/callphone.js"
	import {request} from '@/api/reques.js'
	import {goWindow} from "@/api/navigate.js"
	import {shoucang,quxiaosc} from "@/api/shoucang/shoucang.js"
	import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	import orderTime from "@/pages/common/orderTime.vue"
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
				order_time:false,
				options: [{
				        icon: '/static/images/dianpu.png',
				        text: '店铺'
				      },{
				        icon: "/static/images/shoucang1.png",
				        text: '收藏'
				      },{
				        icon: '/static/images/lipin.png',
				        text: '领礼品'
				      },{
				        icon: '/static/images/kefu.png',
				        text: '客服'
				      }],
				      buttonGroup: [{
				        text: '我要优惠',
				        backgroundColor: '#74B0EA',
				        color: '#fff'
				      },{
					    text: '我要看车',
					    backgroundColor: '#0657A6',
					    color: '#fff'
					  }
				    ],
				start:new Date(),
			}
		},
		created() {
			_this = this
		},
		components:{
			uniGoodsNav,
			orderTime
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
				let toKen = uni.getStorageSync('token');
				if(e.index === 1 && this.mark == false){
					this.mark = !this.mark;
					shoucang(this,toKen,this.goodsId,this.price,"goods",3);	
				}else if(e.index === 1 && this.mark == true){
					this.mark = !this.mark;
					quxiaosc(this,toKen,this.goodsId,"goods")
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
				let now = new Date();
				if(now - this.start <= 1000)return
				this.start = now
				let toKen = uni.getStorageSync('token');
				if(this.state !== 1){
					this.$c.msg("商品已下架");
					return
				}
				if(e.index == 1 && toKen !== ''){
					request("/member/isbindmobile",{
							token:uni.getStorageSync('token'),
						},"POST")
						.then((res)=>{
							if(res.data.data === 1){
								this.order_time = true;		
							}else{
								goWindow('/pages/common/phonenumber?id=',this.goodsId)
							}
						})
				}else if(e.index == 0 && toKen !== ''){
					goWindow("/pages/DirectSelling/base/discounts?id=",this.goodsId)
				}else{
					goWindow("/pages/common/login?id=",this.goodsId)
				};
			},
			handleClose(bool){
				this.order_time = bool;
			},
			handleDate(date){
				let toKen = uni.getStorageSync('token');
				this.order_time = false;
				this.$c.showLoading("加载中")
				request("/order/carOrderCreate",{
					token:toKen,
					goods_id:this.goodsId,
					group_id:3,
					payment_type:8,
					reserv_date:date,
				},"POST")
				.then((res)=>{
					if(res.data.code >= 0){
						setTimeout(() => {
							uni.redirectTo({
							    url: '/pages/common/appointment'
							});
							uni.hideLoading();
						}, 300);
						
					}else{
						this.$c.msg(res.data.message)
						setTimeout(() => {
							uni.hideLoading();
						}, 1000);
					}
					
				})
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
