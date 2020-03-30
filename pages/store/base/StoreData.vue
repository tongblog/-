<template>
	<view class="store-data">
		<image src="../../../static/images/storebj.png" mode="scaleToFill"></image>
		<view class="search">
			<icon class="iconfont icon-sousuo"></icon>
			<input type="text" placeholder-style="color:#1E71C3" @confirm="handleConfirm" placeholder="请输入店铺信息" />
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:"",
			}
		},
		methods:{
			handleConfirm(e){
				this.value = e.detail.value
				this.$emit("handleConfirm",this.value)
				this.value = ""
			}
		}
	}
</script>

<style scoped lang="stylus">
	.store-data
		position relative
		height 75rpx
		image
			width 100%
			height 100%
		.search
			position absolute
			top 0
			padding 0 24rpx
			input
				flex 1
				padding 8rpx 0 8rpx 60rpx
				width 85vw
				background-color rgba(255,255,255,.3)
				border-radius 35rpx
			icon
				position absolute
				left 45rpx
				//margin-top -1%
				color #1E71C3
				font-size 28rpx
			
		
</style>
