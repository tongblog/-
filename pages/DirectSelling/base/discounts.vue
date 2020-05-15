<template>
	<view>
		<view class="list">
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr" :src="imgList" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{goods_name}}</view>
				<view class="date">{{introduction}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(item,index) in label_arr" :key="index">{{item}}</view>
				</view>
				<view class="price">
					{{price}}万
				</view>
			</view>
		</view>
		<view class="discounts">
			<view class="dis-titile">选择优惠车价</view>
			<view class="dis-content">
				<view class="prompt"><text>*</text>申请的优惠车价越合理,平台越容易通过哦</view>
				<slider :value="price" :min="min_price" step="0.01" :max="price" activeColor="#0657A6" @changing="sliderChange" show-value />
				<view class="slider-price">
					<text>{{min_price}}万</text>
					<text>{{price}}万</text>
				</view>
				<button type="primary" @tap="getPhone">提交申请</button>
			</view>
		</view>
		<!-- <orderTime
			v-if="order_time" 
			@handleClose="handleClose"
			@handleDate="handleDate"></orderTime> -->
	</view>
</template>

<script>
	import orderTime from "@/pages/common/orderTime.vue"
	import config from '@/api/config.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {request} from '@/api/reques.js'
	export default{
		data(){
			return{
				imgList:'',
				price:"",
				introduction:'',
				goodsId:"",
				label_arr:[],
				min_price:'',
				offer_price:0,
				goods_name:"",
				start:new Date(),
				order_time:false,
			}
		},
		components:{
			orderTime
		},
		onLoad(option) {
			let goodsId = parseInt(option.id)
			this.goodsId = goodsId;
			this.getDirect(goodsId);
		},
		methods:{
			getDirect(goodsId){
				request('/goods/goodsCarDetail',{
					goods_id:goodsId,
					group_id:3
				},"POST")
				.then((res)=>{
					let data = res.data.data;
					//console.log(data)
					this.imgList = config.domain + data.img_list[0].pic_cover  // 轮播数组
					this.price = this.$c.changePrice(data.car_info.car_info.ys_price) // 预售价格
					this.min_price = (this.price * 0.9).toFixed(2) // 最低出价
					this.introduction = data.introduction // 描述
					this.goods_name = data.goods_name // 名称
					this.label_arr = data.label_arr
				})
			},
			handleErr(e){
				if(e.type=='error'){
					this.imgList = "../../../static/images/list.jpg"
				}
				
			},
			sliderChange(e){
				this.offer_price = e.detail.value.toFixed(2);
			},
			// 获取用户手机号
			getPhone(){
				let now = new Date();
				let _this = this;
				if(now - this.start <= 1000)return;
				this.start = now;
				let token = uni.getStorageSync('token');
				if(token !== ''){
					request("/member/isbindmobile",{
						token:token
					},"POST")
					.then((res)=>{
						if(res.data.data === 1){
							// _this.order_time = true;
							_this.handleDate()					
									
						}else{
							goWindow('/pages/common/phonenumber?id=',this.goodsId)
						}
					})
				}else{
					goWindow('/pages/common/login?id=',this.goodsId)
				}
				
			},
			/* handleClose(bool){
				this.order_time = bool;
			}, */
			// 提交申请
			handleDate(){
				let toKen = uni.getStorageSync('token');
				let _this = this;
				//this.order_time = false;
				request("/goods/addGoodsBargainingRecoeds",{
					token:toKen,
					goods_id:_this.goodsId,
					offer_price:_this.offer_price * 10000,
				},"POST")
				.then((res)=>{
					_this.$c.showLoading("加载中")
					if(res.data.code >= 0){
						setTimeout(() => {
							uni.redirectTo({
							    url: '/pages/common/appointment'
							});
							uni.hideLoading();
						}, 300);
					}else{
						this.$c.msg(res.data.message)
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style scoped>
	.list{
		padding: 24rpx;
		height: 140;
		border-bottom: 24rpx #F4F4F4 solid;
		border-top: 24rpx #F4F4F4 solid;
	}
	.list .list-imgs{
		overflow: hidden;
		display: inline-block;
		width: 256rpx;
		height: 218rpx;
		border-radius: 10rpx;
	}
	.list .list-content{
		display: inline-block;
		width: 418rpx;
		height: 100%;
		margin-left: 3%;
	}
	.list-content .title{
		height: 100rpx;
		color: #222222;
	}
	.list-content .date{
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .uni-flex .flex-item{
		padding:0 10rpx;
		margin-right:25rpx;
		border:1rpx #0657A6 solid;
		border-radius:10rpx;
		font-size:20rpx;
		color:#0657A6;
		text-align:center;	
	}
		
	.list-content .price{
		font-size: 30rpx;
		color: #FF1A1A;
		font-weight: bold;
	}
	.discounts .dis-titile{
		padding: 25rpx;
		border-bottom: 2rpx #EEEEEE solid;
		font-size: 36rpx;
		color: #222222;
		text-align: center;
	}
	.dis-content{
		padding: 0 34rpx;
	}
	.dis-content .prompt{
		padding: 63rpx;
		text-align: center;
		font-size: 30rpx;
		color: #222222;
	}
	.dis-content .prompt text{
		color: #FF2E2E;
	}
	.dis-content .slider-price text{
		font-size: 22rpx;
		color: #999999;
	}
	.dis-content .slider-price text:nth-child(2){
		float: right;
	}
	.dis-content button{
		margin-top: 80rpx;
		border-radius: 0;
		background-color: #0657A6;
	}
		
</style>
