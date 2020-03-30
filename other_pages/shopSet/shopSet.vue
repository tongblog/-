<template>
	<view>
		<shop-notice :shopId="shopId"></shop-notice>
	</view>
</template>

<script>
	import ShopNotice from './base/shopNotice.vue'
	export default{
		data(){
			return{
				shopId:'',
			}
		},
		components:{
			ShopNotice,
		},
		onLoad(option) {
			this.shopId = option.id;
		}
	}
</script>

<style>
</style>
