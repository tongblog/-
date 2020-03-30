<template>
	<view>
		<view class="list">
			<view class="list-imgs">
				<image 
					style="width: 100%; height: 100%;" 
					lazy-load="true" 
					@error="handleErr" 
					:src="imgList" 
					mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{goods_name}}</view>
				<view class="date">上架时间:{{start_time}} 出价截止:{{end_time}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(item,index) in label_arr" :key="index">{{item}}</view>
				</view>
				<view class="price">
					<text class="fixed-price">市场价</text>
					{{price}}万
				</view>
			</view>
		</view>
		<view class="discounts">
			<view class="dis-titile">选择出价金额</view>
			<view class="dis-content">
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<view class="on"><text>{{offer_price}}</text>万</view>
						<view class="down">出价</view>
					</view>
					<view class="flex-item">
						<view class="on"><text>{{changeSlider}}</text>%</view>
						<view class="down">成交率</view>
					</view>
				</view>
				<view class="advice">
					建议出价范围
				</view>
				<slider :value="advice" :min="min_price" step="0.1" :max="price" activeColor="#e9e9e9" backgroundColor="#981628" @changing="sliderChange" show-value="true" />
				<view class="slider-price">
					<text>{{min_price}}万</text>
					<text>{{price}}万</text>
				</view>
				<button type="primary" @tap="handlieDis">出价</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {request} from '@/api/reques.js'
	export default{
		data(){
			return{
				imgList:'',
				price:"",
				introduction:'',
				start_time:"",
				end_time:"",
				min_price:"",
				deal_rate:"",
				goodsId:0,
				stockId:0,
				offer_price:0,
				promotion:{},
				label_arr:[],
				goods_name:"",
				advice:"",
				flag:true,
			}
		},
		onLoad(option) {
			let promotion = JSON.parse(option.id)
			this.promotion = promotion;
			//console.log(promotion)
			this.getDirect(promotion.goods_id,promotion.stock_id);
		},
		computed:{
			changeSlider(){
				let closing = Math.round(((this.offer_price-this.min_price)/(this.price-this.min_price))*(this.closing-35) + 35);
				return closing 
			}
		},
		methods:{
			getDirect(goodsId,stockId){
				this.goodsId = goodsId;
				this.stockId = stockId;
				request('/goods/goodsCarDetail',{
					goods_id:goodsId,
					group_id:1,
					promotion_id:stockId
				},"POST")
				.then((res)=>{
					let data = res.data.data;  
					this.introduction = data.introduction; // 描述
					this.goods_name = data.goods_name // 名称
					this.imgList = config.domain + data.img_list[0].pic_cover;  // 轮播数组
					this.price = this.$c.changePrice(data.car_info.car_info.ys_price); // 价格
					this.start_time = this.transferTime(data.promotion_info.start_time); // 开始时间
					this.end_time = this.transferTime(data.promotion_info.end_time); // 结束时间
					this.min_price = this.$c.changePrice(data.promotion_info.min_price);  //最小出价
					this.offer_price = this.$c.changePrice(data.car_info.car_info.ys_price);
					let advice =  this.$c.changePrice(data.promotion_info.deal_price); 
					this.advice = advice > this.min_price ? advice : this.price; // 建议出价
					this.closing = parseInt(data.promotion_info.deal_rate); // 成交率
					this.label_arr = data.label_arr;
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
			
			//出价
			handlieDis(){
				if(!this.flag)return
				let _this = this;
				let token = uni.getStorageSync('token');
				 _this.flag = false;
				if(token !== ''){
					_this.clinchDeal()
					setTimeout(()=>{
						_this.flag = true;
					},1000)
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			// 成交
			clinchDeal(){
				let _this = this
				request("/goods/addPromotionStockRecoeds",{
					token:uni.getStorageSync('token'),
				 	goods_id:this.goodsId,
				 	stock_id:this.stockId,
				 	offer_price:this.offer_price * 10000
				},"POST")
				.then((res)=>{
					this.$c.showLoading("加载中")
					if(res.data.code > 0){
						setTimeout(() => {
							uni.redirectTo({
							    url: '/pages/common/appointment'
							});
							uni.hideLoading();
						}, 300);
						
					}else{
						setTimeout(() => {
							_this.$c.msg('出价失败,请重新出价')
							uni.hideLoading();
						}, 300);
					}
					
				})
			},
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = m+ "-" +d;
				return newDate
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
	.price .fixed-price {
		display: inline-block;
		padding: 5rpx 10rpx;
		margin-right: 15rpx;
		line-height: 30rpx;
		text-align: center;
		color: #777777;
		font-size: 22rpx;
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
	.dis-content .uni-row .flex-item{
		width: 50%;
		text-align: center;
		color: #777777;
	}
	.uni-row .flex-item .down{
		font-size: 24rpx;
	}
	.uni-row .flex-item .on{
		font-size: 30rpx;
	}
	.uni-row .flex-item .on text{
		font-size: 76rpx;
		color: #981628;
		font-weight: 600;
	}
	.dis-content .advice{
		width: 147rpx;
		padding: 5px 14rpx;
		margin-top: 45px;
		margin-left: 400rpx;
		background-color: #F4E1E4;
		border-radius: 30rpx;
		text-align: center;
		font-size: 22rpx;
		color: #981628;
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
		background-color: #981628;
	}
		
</style>
