<template>
	<view class="exhibition">
		<image :src="'upload/applet/kucun.jpg' | filterImg" mode="scaleToFill"></image>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	export default{
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	.exhibition
		width 100%
		height 314rpx
		image
			width 100%
			height 100%
</style>
