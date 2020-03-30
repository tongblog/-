<template>
	<!-- 此文件被引入Parameter.vue -->
	<view>
		<view class="configuration" v-if="item.attribute_list.length != 0" v-for="(item,index) in attribute" :key="index">
			<text class="basic-title">{{item.attr_name}}</text>
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(list,idx) in item.attribute_list" :key="idx">
					<view class="on">{{list.attr_value}}</view>
					<view class="down">{{list.attr_value_name || "--"}}</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			attribute:{
				type:Array
			}
		}
	}
</script>

<style scoped lang="stylus">
	.configuration
		padding-bottom 30rpx
		.basic-title
			display inline-block
			padding-top 25rpx
			margin-bottom 25rpx
			border-bottom 2px #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.uni-row
			flex-wrap wrap
			border 2rpx #DDDDDD solid
			border-right none
			border-bottom none
			.flex-item
				display flex
				width 50%
				font-size 24rpx
				text-align center
				.on
					width 50%
					background-color #EAF5FF
					border-right 2rpx #DDDDDD solid
					border-bottom 2rpx #DDDDDD solid
					line-height 55rpx
					color #777777
				.down
					width 50%
					border-right 2rpx #DDDDDD solid
					border-bottom 2rpx #DDDDDD solid
					line-height 55rpx
					color #333333
</style>
