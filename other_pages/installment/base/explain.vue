<template>
	<view class="explain">
		<view class="explain-middle">
			<text>注:</text>月利息<text>8厘</text>,以上按整数<text>10万</text>提供方案。
			具体方案以实际贷款额以及实际贷款人资质为准。
		</view>
		<view class="explain-bto">
			<view class="explain-title">
				<text>分期购的四大优势</text>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item">
					<image src="../../../static/images/plan1.png" mode="scaleToFill"></image>
				</view>
				<view class="flex-item">
					<image src="../../../static/images/plan2.png" mode="scaleToFill"></image>
				</view>
				<view class="flex-item">
					<image src="../../../static/images/plan3.png" mode="scaleToFill"></image>
				</view>
				<view class="flex-item">
					<image src="../../../static/images/plan4.png" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		<button type="primary" @tap="handlePlan">确定</button>
	</view>
</template>

<script>
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				
			}
		},
		props:{
			classId:{
				type:Number,
			}
		},
		methods:{
			handlePlan(){
				let token = uni.getStorageSync('token');
				if(token !== ""){
					request("/member/isbindmobile",{
						token:token,
					},"POST")
					.then((res)=>{
						if(res.data.data === 1){
							request("/order/createStagesOrder",{
								token:token,
								stages_id:this.classId,
								goods_money:100000,
							},"POST")
							.then((res)=>{
								uni.showLoading({
									title: '加载中'
								});
								let data = parseInt(res.data.data);
								if(data > 0){
									setTimeout(() => {
										goWindow("/pages/common/appointment")
										uni.hideLoading();
									}, 500);
									
								}
							})
						}else{
							goWindow('/pages/common/phonenumber?id=',this.goodsId)
						}
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			}
		}
	}
</script>

<style scoped lang="stylus">
	.explain
		padding 0 20rpx
		button
			margin-top 30rpx
			background-color #FF2727
		.explain-middle text
			color #FF2727
		.explain-bto
			padding 0 24rpx	
			margin-top 20rpx
			border-radius 15rpx
			box-shadow 0 0 10rpx 0 #CCCCCC
			.explain-title
				text-align center
				font-size 34rpx
				line-height 80rpx
				color #FF2727
				font-weight bold
			.uni-flex 
				flex-wrap wrap
				justify-content space-between
				.flex-item
					width 48%
					height 152rpx
					margin-bottom 20rpx
					image
						width 100%
						height 100%
</style>
