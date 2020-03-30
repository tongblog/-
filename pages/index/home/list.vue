<template>
	<view>
		<view class="data-none" v-if="goodsList.length !== 0 ? false : true ">
			<image 
				class="img" 
				lazy-load="true" 
				:src="'upload/applet/data-good-none.png' | filterImg" 
				mode="widthFix"></image>
			<view class="txt" @tap="handleAll">点击获取全国车辆信息</view>
		</view>
		<view class="list" @click="handleIndex(item.goods_id)" v-for="(item,index) in goodsList" :key='index'>
			<view class="list-imgs">
				<image 
					style="width: 100%; height: 100%;" 
					lazy-load="true" 
					@error="handleErr($event,index)" 
					:src="item.pic_cover" 
					mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{item.goods_name}}</view>
				<view class="date">{{item.introduction}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(item2,idx2) in item.label_arr" :key="idx2" v-if="idx2 < 4">{{item2}}</view>
					<view class="flex-item" v-if="item.is_testing">已检</view>
				</view>
				<view class="price">
					{{$c.changePrice(item.ys_price)}}万
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 首页商品
	let _this = this
	import config from '@/api/config.js';
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				show:false
			}
		},
		props:{
			options:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			goodsList:{
				type:Array
			},
			mark:{
				type:Boolean
			}
		},
		/* watch:{
			goodsList(arr){
				if(arr.length == 0){
					_this.show = true
				}else{
					_this.show = false
				}
			}
			
		}, */
		created() {
			_this = this;

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
			handleIndex(goodsId){
				goWindow('/pages/DirectSelling/DirectSelling?id=',goodsId)
			},
			
			handleErr(e,index){
				if(e.type=='error'){
					this.goodsList[index].pic_cover = "../../../static/images/list.jpg"
				}
				
			},
			handleAll(){
				this.$emit("handleAll",true)
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
		color: #222222;
		line-height: 42rpx;
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
		
			
</style>
