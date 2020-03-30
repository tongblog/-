<template>
	<view class="truck-service">
		<view class="service">
			<image :src="'upload/applet/qidai.jpg' | filterImg" mode="widthFix"></image>
		</view>
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
	.truck-service
		width 100vw
		height 80vh
		.service
			width 60vw
			height 45vh
			margin 200rpx auto 0
			image
				width 100%
				height 100%
</style>
