<template>
	<view class="parameter">
		<view class="parameter-title">参数配置</view>
		<view class="basic" v-for="(item,index) in arr1" :key="index">
			<text class="basic-title">{{item.attr_name}}</text>
			<view class="flex-list uni-flex uni-row">
				<view class="item-list flex-item uni-flex uni-row" v-for="(list,idx) in item.attribute_list" :key="idx">
					<view class="flex-item">
						<view class="on">{{list.attr_value}}</view>
						<view class="down">{{list.attr_value_name || '--'}}</view>
					</view>
				</view>
			</view>
		</view>
		<configuration :attribute="attribute"></configuration>
	</view>
</template>

<script>
	import Configuration from './Configuration.vue'
	export default{
		props:{
			arr1:{
				type:Array
			},
			attribute:{
				type:Array
			}
		},
		components:{
			Configuration
		}
	}
</script>

<style scoped lang="stylus">
	.parameter
		padding 0 26rpx
		.parameter-title
			border-bottom 1rpx #EEEEEE solid
			font-size 26rpx
			color #222222
			text-align center
			line-height 80rpx
		.basic .basic-title
			display inline-block
			padding-top 25rpx
			margin-bottom 25rpx
			border-bottom 2px #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.basic .flex-list
			border 1rpx #DDDDDD solid
			flex-wrap wrap
			background-color #EAF5FF 
			.item-list
				width 50%
				box-sizing border-box
			.item-list:nth-child(odd)
				border-right 2rpx #DDDDDD solid
				border-bottom 1rpx #DDDDDD solid
			.item-list:nth-child(even)
				border-bottom 1rpx #DDDDDD solid
			.item-list:nth-last-child(1)
				border-bottom none
			.item-list .flex-item
				width 100%
				padding-bottom 10rpx
				text-align center
				font-size 24rpx
				color #777777
				.down
					color #333333
					line-height 24rpx
			
			
</style>
