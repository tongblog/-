<template>
	<view class="description">
		<view class="dpt-title">车辆描述</view>
		<view class="dpt-content">
			<wxParse :content="description"/>
		</view>
	</view>
</template>

<script>
	import wxParse from '@/components/uParse/src/wxParse.vue'
	export default{
		props:{
			description:{
				type:String
			}
		},
		components:{
			wxParse
		}
	}
</script>

<style scoped lang="stylus">
	.description
		padding 28rpx
		.dpt-title
			width 105rpx
			border-bottom 2rpx #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.dpt-content
			padding-top 10px
			font-size 26rpx
			color #444444
</style>
