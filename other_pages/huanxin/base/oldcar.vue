<template>
	<view class="oldcar">
		<view class="uni-flex uni-column">
			<view class="flex-item">
				<text>车牌号</text>
				<input class="uni-input" :value="plate_num"  placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>品牌型号</text>
				<input class="uni-input" :value="model" placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>所在城市</text>
				<input class="uni-input" :value="addr" placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>预售价格</text>
				<input class="uni-input" type="number" @blur="handleBlur" placeholder="请填写预售价格" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			addr:{
				type:String
			},
			model:{
				type:String
			},
			plate_num:{
				type:String
			}
		},
		methods:{
			handleBlur(e){
				let price = e.detail.value;
				this.$emit("handleBlur",price)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.uni-flex
		padding 0 20rpx
		.flex-item
			border-top 1rpx solid #EEEEEE 
			text
				display inline-block
				line-height 81rpx
				vertical-align middle
			input
				float right
				display inline-block
				vertical-align middle
				text-align right
				background none
		
</style>
