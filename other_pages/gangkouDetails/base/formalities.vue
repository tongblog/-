<template>
	<view class="formalities">
		<view class="flt-title">手续信息</view>
		<view class="flt-list uni-flex uni-row" v-for="(item,index) in certificate" :key="index">
			<view class="flex-item">
				<view class="on">户籍性质</view>
				<view class="down">{{item.all_type}}</view>
			</view>
			<view class="flex-item">
				<view class="on">户籍所在地</view>
				<view class="down">{{item.addr}}</view>
			</view>
			<view class="flex-item">
				<view class="on">营运证期限</view>
				<view class="down">{{item.aip_date || '--'}}</view>
			</view>
			
			<view class="flex-item">
				<view class="on">行驶证</view>
				<view class="down">有</view>
			</view>
			<view class="flex-item">
				<view class="on">注册日期</view>
				<view class="down">{{item.register_date}}</view>
			</view>
			<view class="flex-item">
				<view class="on">发证日期</view>
				<view class="down">{{item.issue_date}}</view>
			</view>
			
			<view class="flex-item">
				<view class="on">交强险</view>
				<view class="down">{{item.qiangx}}</view>
			</view>
			<view class="flex-item">
				<view class="on">第三者险</view>
				<view class="down">{{item.dszx}}</view>
			</view>
			<view class="flex-item">
				<view class="on">车损险</view>
				<view class="down">{{item.csx}}</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		props:{
			certificate:{
				type:Array
			}
		}
	}
</script>

<style scoped lang="stylus">
	.formalities
		border-top 16rpx solid #F4F4F4
		border-bottom 16rpx solid #F4F4F4
		padding 28rpx
		.flt-title
			width 105rpx
			border-bottom 2rpx #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.flt-list
			flex-wrap wrap
			.flex-item
				width 33%
				margin-top 35rpx
				.on
					font-size 22rpx
					line-height 22rpx
					color #777777
				.down
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
					font-size 26rpx
					color #222222	
</style>
