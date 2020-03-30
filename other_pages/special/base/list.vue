<template>
	<view>
		<view class="data-none" v-if="goodsList.length == 0">
			<image
				class="img" 
				lazy-load="true" 
				:src="'upload/applet/data-good-none.png' | filterImg" 
				mode="widthFix"></image>
			<view class="txt" @tap="handleAll">点击获取全国车辆信息</view>
		</view>
		<view class="list" @click="handlePric(item.goods_id)" v-for="(item,index) in goodsList" :key='index'>
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event,index)" :src="item.pic_cover" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{item.goods_name}}</view>
				<view class="date">{{item.introduction}}</view>
				
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(item1,index1) in item.label_arr" :key="index1" v-if="index1 < 3">{{item1}}</view>
				</view>
				<view class="price">
					{{$c.changePrice(item.ys_price)}}万
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 港口特价商品
	let _this = this
	import config from '@/api/config.js'
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				goodsList:[],
				page_count:0,
				addressName:this.$store.state.city
			}
		},
		props:{
			options:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			num:{
				type:String
			},
			carId:{
				type:String
			},
			brandId:{
				type:String
			},
			priceIndex:{
				type:Number
			},
			min:{
				type:String
			},
			max:{
				type:String
			},
			gather:{
				type:Boolean
			},
			pfId:{
				type:String
			},
			qdId:{
				type:String
			},
			min_ml:{
				type:String
			},
			max_ml:{
				type:String
			}
		},
		watch:{ 
			num(num){
				_this.getGoodsList()
			},
			carId(id){
				_this.getGoodsList()
			},
			brandId(){
				_this.getGoodsList()
			},
			priceIndex(id){
				_this.getGoodsList();
				id = "";
			},
			gather(bool){
				if(bool){
					_this.getGoodsList();
					this.$emit("handleGather",false)
				}
			}
		},
		created() {
			this.getGoodsList()
			_this = this
		},
		filters:{
			filterImg(src){
				if(src){
					return config.domain + src
				}
			}
		},
		methods:{
			// 页面跳转
			handlePric(goodsId){
				goWindow('/other_pages/gangkouDetails/GkouDetails?id=',goodsId)
			},
			// 获取商品列表
			getGoodsList(page_index = 1){
				this.$store.commit("changeGroup",4) 
				uni.showLoading({
					title: '加载中'
				});
				request("/index/getUsedCarGoodsList",{
					group_id:4,
					page_index:page_index,
					page_size:10,
					ai_sort:this.num,
					car_type:this.carId,
					brands_id:this.brandId,
					min_price:this.min,
					max_price:this.max,
					pf_id:this.pfId,
					qd_id:this.qdId,
					min_ml:this.min_ml,
					max_ml:this.max_ml,
					city_name:this.addressName
				},"GET")
				.then((res)=>{
					let data = res.data.data.data
					if(page_index > 1){
						data = this.goodsList.concat(data)
					}
					this.goodsList = data;
					this.page_count = res.data.data.page_count;
					this.$emit("changePage",page_index,this.page_count)
					setTimeout(() => {
						uni.hideLoading();
					}, 500);
				})
			},
			handleErr(e,index){
				if(e.type=='error'){
					this.goodsList[index].pic_cover = "../../../static/images/list.jpg"
				}
				
			},
			handleAll(){
				this.addressName = "";
				this.num = "";
				this.carId = "";
				this.brandId = "";
				this.min = "";
				this.max = "";
				this.pfId = "";
				this.qdId = "";
				this.min_ml = "";
				this.max_ml = "";
				this.getGoodsList()
			}
		}
	}
</script>
	
<style scoped>
	.data-none{
		padding: 10rpx 0;
		border-bottom: 10rpx #F4F4F4 solid;
		text-align: center;
		color: #222;
	}
	.data-none .txt{
		color: #0657A6;
	}
	.data-none .img{
		width: 40%;
	}
	.list{
		padding: 24rpx;
		height: 140;
		border-bottom: 10rpx #F4F4F4 solid;
	}
	.list .list-imgs{
		overflow: hidden;
		display: inline-block;
		width: 256rpx;
		height: 218rpx;
		vertical-align: middle;
		border-radius: 10rpx;
	}
	.list .list-content{
		display: inline-block;
		width: 418rpx;
		height: 100%;
		vertical-align: middle;
		margin-left: 3%;
	}
	.list-content .title{
		line-height: 42rpx;
		color: #222222;
	}
	.list-content .date{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .uni-flex{
		margin-top: 10rpx;
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
	.price .fixed-price{
		padding: 5rpx 8rpx;
		margin-right: 10rpx;
		background-color: #FF2727;
		border-radius: 4rpx;
		font-size: 22rpx;
		color: #FFFFFF;
	}	
			
</style>
