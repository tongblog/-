<template>
	<view>
		<view class="plan">
			<view class="plan-item uni-flex uni-column">
				<radio-group @change="changePlan">
					<view class="category flex-item uni-flex uni-row" v-for="(item,index) in stages" :key="index">
						<view class="plan-category flex-item">
							<label class="radio"><radio color="#FF2727" style="transform: scale(0.5)" :value="item.class_id"/>{{item.class_name}}</label>
						</view>
						<view class="plan-category flex-item">
							<view>首付</view>
							<text>{{item.down_pay}}%</text>
						</view>
						<view class="plan-category flex-item">
							<view>月供</view>
							<text>{{item.month_money}}元</text>
						</view>
						<view class="plan-category flex-item">
							<view>贷款期限</view>
							<text>{{item.loan_period}}个月</text>
						</view>
					</view>
					
				</radio-group>			
			</view>
		</view>
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
	</view>
</template>

<script>
	import {request} from '@/api/reques.js'
	export default{
		data(){
			return{
				stages:[],
				classId:0
			}
		},
		onLoad(option) {
			let idJson = JSON.parse(option.id)
			this.goodsId = idJson.goodsId;
			let price = idJson.price * 10000;
			this.getStagesList(price)
		},
		methods:{
			getStagesList(price){
				let token = uni.getStorageSync('token');
				if(token !== ""){
					request("/order/getStagesList",{
						token:token,
						goods_money:price
					},"POST")
					.then((res)=>{
						this.stages = res.data.data
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			changePlan(e){
				this.classId = parseInt(e.detail.value);
			},
			handlePlan(){
				let toKen = uni.getStorageSync('token');
				request("/order/carOrderCreate",{
					token:toKen,
					goods_id:this.goodsId,
					group_id:6,
					payment_type:9,
					stages_id:this.classId
				},"POST")
				.then((res)=>{
					uni.reLaunch({
					    url: '/pages/common/appointment'
					});
				})
				
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
	.plan
		padding 24rpx
		.plan-item
			padding 22rpx 22rpx 0 22rpx
			border-radius 15rpx
			box-shadow 0 0 10rpx 0 #CCCCCC
			.category
				margin-bottom 20rpx
				border-radius 15rpx
				background-color #F4F4F4
				.plan-category
					width 25%
					padding 10rpx 0
					text-align center
					color #777777
					font-size 23rpx
					text
						color #FF2727
						font-weight bold
						font-size 27rpx
					.radio
						line-height 100rpx
						font-size 26rpx
</style>
