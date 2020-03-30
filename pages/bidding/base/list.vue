<template>
	<view>
		<view class="list" :class="{obscuration:show3}" v-for="(item,index) in goodsList" :key="index" @tap="handleDetail(item.action_id,item.goods_id)">
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event,index)" :src="item.pic_cover" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="title">{{item.goods_name}}</view>
				<view class="date">{{item.introduction}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(label,idx) in item.label_arr" :key="idx" v-if="idx < 4">{{label}}</view>
				</view>
				<view class="price">
					抢购价 <text>{{$c.changePrice(item.start_price)}}万</text>
				</view>
				<view class="paiimg" v-if="show3">
					<image src="../../../static/images/yipai.png" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			action_id:{
				type:Number
			},
			show3:{
				type:Boolean
			},
			start_time:{
				type:Number
			},
			end_time:{
				type:Number
			},
			oneList:{
				type:Array
			}
		},
		data(){
			return{
				goodsList:[],
				page_count:0,
			}
		},
		watch:{
			action_id(id){
				this.getGoodsList(id)	
			},
			oneList(arr){
				this.goodsList = arr
			}
		},
		methods:{
			getGoodsList(id = "",page_index = 1){
				request("/index/getActionGoodsList",{
					page_index:page_index,
					page_size:200,
					promotion_id:id
				},"GET")
				.then((res)=>{
					let data = res.data.data.data;
					if(page_index > 1){
						data = this.goodsList.concat(data)
					}
					this.goodsList = data;
					this.page_count = res.data.data.page_count;
					//console.log(this.goodsList)
				})
			},
			handleDetail(action,goods){
				if(this.show3)return
				let auction = {
					action_id:action,
					goods_id:goods,
				}
				goWindow('/pages/auctionDetails/auctionDetails?json=',JSON.stringify(auction))
				//console.log(action,goods)
			},
			handleErr(e,index){
				if(e.type=='error'){
					this.goodsList[index].pic_cover = "../../../static/images/list.jpg"
				}
				
			}
		}
	}
</script>
	
<style scoped>
	.obscuration{
		opacity:0.6; 
	}
	.list{
		padding: 24rpx;
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
	.list>.list-content{
		color: #999999!important;
	}
	.list-content .uni-flex{
		margin-top: 10rpx;
	}
	.list-content .flex-item{
		padding:0 5rpx;
		margin-right:25rpx;
		border: 1rpx #0657A6 solid;
		border-radius: 10rpx;
		font-size: 20rpx;
		line-height: 30rpx;
		color: #0657A6;
		text-align: center;	
	}
		
	.list .list-content{
		position: relative;
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
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .price{
		font-size: 22rpx;
		color: #777777;
	}
	.price text{
		padding-left: 15rpx;
		font-size: 30rpx;
		color: #FF1A1A;
		font-weight: bold;
	}
	.paiimg{
		position: absolute;
		right: 0;
		bottom: 0;
		width: 117rpx;
		height: 90rpx;
	}
	.paiimg image{
		width: 100%;
		height: 100%;
	}
		
			
</style>

