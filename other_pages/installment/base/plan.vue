<template>
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
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			stages:{
				type:Array
			}
		},
		methods:{
			changePlan(e){
				let classId = parseInt(e.detail.value);
				this.$emit("changePlan",classId)
			}
		}
	}
</script>

<style scoped lang="stylus">
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
