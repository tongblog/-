<template>
	<view class="list">
		<view class="list-imgs">
			<image style="width: 100%; height: 100%;" src="../../static/images/list.jpg" mode="scaleToFill"></image>
		</view>
		<view class="list-content">
			<text>德龙新M(潍柴)64马力(AF6DLD-22E5) 6.8米 排半 牵引车</text>
			<view class="date">2014年6月/6x4 国三/杭州市</view>
			<slot></slot>
			<!-- <view class="uni-flex uni-row">
				<view class="flex-item">个人</view>
				<view class="flex-item">已检</view>
				<view class="flex-item">可认证</view>
				<view class="flex-item">可分期</view>
			</view> -->
			<view class="price">
				<slot></slot>
				20.10万
			</view>
		</view>
	</view>
</template>

<script>
	// 首页商品与一口价商品页面
	export default{
		data(){
			return{
				
			}
		},
		props:{
			options:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		methods:{
			
		}
	}
</script>
	
<style scoped>
	.list{
		padding: 24rpx;
		width: 100%;
		height: 140;
		border-bottom: 10rpx #F4F4F4 solid;
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
	.list-content text{
		color: #222222;
	}
	.list-content .date{
		font-size: 22rpx;
		color: #888888;
	}
	.list-content .price{
		font-size: 30rpx;
		color: #FF1A1A;
		font-weight: bold;
	}
		
			
</style>
