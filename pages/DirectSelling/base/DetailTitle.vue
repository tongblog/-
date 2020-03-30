<template>
	<view class="detail-title">
		<view class="abstract">
			<view class="title">{{goods_name}}</view>
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(item,index) in label_arr" :key="index">{{item}}</view>
			</view>	
			<view class="shelves">
				首次上架时间:<text>{{transferTime(sale_date)}}</text>
			</view>
			<view class="score">
				综合评分:<text>{{testing}}</text>
			</view>
			<view class="label">
				<view class="price">
					价格:<text>{{price}}万</text>
				</view>
				<view class="rules" @tap="handleRules">交易规则</view>
			</view>
		</view>
		
	</view>	
</template>

<script>
	import {request} from '@/api/reques.js'
	import {goWindow} from "@/api/navigate.js"
	export default{
		props:{
			introduction:{
				type:String
			},
			price:{
				type:String
			},
			testing:{
				type:Number
			},
			sale_date:{
				type:Number
			},
			label_arr:{
				type:Array
			},
			goods_name:{
				type:String
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let y = date.getFullYear();
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = y+ "-" +m+ "-" +d;
				return newDate
			},
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",14)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.abstract
		padding 25rpx 22rpx 0 22rpx
		border-bottom 20rpx #F4F4F4 solid
		.title
			color #222222
			font-size 30rpx
			line-height 40rpx
			font-weight bold
		.score
			display inline-block
			margin-left 30rpx
			font-size 26rpx
			color #444444
		.shelves
			display inline-block
			font-size 26rpx
			color #444444
		.uni-flex 
			padding 10rpx 0
			.flex-item
				padding 0 8rpx
				margin-right 25rpx
				border 1rpx #0657A6 solid
				border-radius 10rpx
				font-size 20rpx
				line-height 32rpx
				color #0657A6
				text-align center
		.label
			display flex
			justify-content space-between
			align-items center
			.price
				font-size 26rpx
				color #0657A6
				line-height 72rpx
				text
					font-size 62rpx
					font-weight bold
			.rules
				height 42rpx
				padding 0rpx 15rpx
				border 1rpx #0657A6 solid
				line-height 42rpx
				border-radius 10rpx
				font-size 22rpx
				color #0657A6	
</style>
