<template>
	<view class="identify">
		<view class="uni-flex uni-column">
			<view class="flex-item">
				<text>车牌号</text>
				<input class="uni-input" :value="plate_num" placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>品牌型号</text>
				<input class="uni-input" :value="model" placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>使用年限</text>
				<input class="uni-input" :value="issue_date" placeholder="上传后自动识别" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			plate_num:{
				type:String
			},
			model:{
				type:String
			},
			issue_date:{
				type:[String,Number],
				default:''
			}
		}
	}
</script>

<style scoped lang="stylus">
	.identify
		border-bottom 9rpx #EEEEEE solid 
		.uni-flex
			padding 0 20rpx
			.flex-item
				border-bottom 1rpx solid #EEEEEE 
				font-size 26rpx
				color #444444
				text
					display inline-block
					line-height 81rpx
					vertical-align middle
				input
					float right
					display inline-block
					vertical-align middle
					text-align right
		
</style>
