<template>
	<view>
		<view class="detail-list" v-for="(detail,key) in details" :key='key' @tap="handleDetail(detail.goods_id,detail.new_group_id,detail.promotion_id)">
			<view class="list-imgs">
				<image style="width: 100%; height: 100%;" :src="detail.pic_cover" @error="handleErr($event,key)" mode="scaleToFill"></image>
			</view>
			<view class="list-content">
				<view class="con-name">{{detail.goods_name}}</view>
				<view class="date">{{detail.introduction}}</view>
				<view class="uni-flex uni-row">
					<view class="flex-item" v-for="(label,idx) in detail.label_arr" :key="idx" v-if="idx < 3">{{label}}</view>
				</view>
				<view class="price">
					{{$c.changePrice(detail.ys_price)}}万
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				details:[]
			}
		},
		props:{
			detail:{
				type:Array
			}
		},
		watch:{
			detail(newvalue){
				this.details = newvalue
			}
		},
		methods:{
			handleErr(e,index){
				if(e.type=='error'){
					this.details[index].pic_cover = "../../../static/images/list.jpg"
				}	
			},
			handleDetail(goodsId,group,promotion_id){
				let groupId = parseInt(group.substr(0,1));
				//console.log(goodsId,groupId)
				this.$c.detailsJump(goodsId,groupId,promotion_id)
				
			}
		}
	}
</script>

<style scoped>
	.detail-list{
		padding: 24rpx;
		height: 140;
		border-bottom: 10rpx #F4F4F4 solid;
	}
	.detail-list .list-imgs{
		overflow: hidden;
		display: inline-block;
		width: 256rpx;
		height: 218rpx;
		border-radius: 10rpx;
	}
	.detail-list .list-content{
		display: inline-block;
		width: 418rpx;
		height: 100%;
		margin-left: 3%;
	}
	.list-content .con-name{
		height:100rpx;
		color: #222222;
	}
	.list-content .date{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		height: 40rpx;
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .uni-flex{
		height: 40rpx;
	}
	.list-content .flex-item{
		padding:0 8rpx;
		margin-right:20rpx;
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
