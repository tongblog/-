<template>
	<view class="pricing"><info :order_id="order_id"></info></view>
</template>

<script>
// 申请店铺页面
import { goWindow } from '@/api/navigate.js'; // 页面跳转

import Info from './base/info';
export default {
	data() {
		return {
			
		};
	},
	onLoad(param) {
		let _this = this;
	},
	components: {
		Info
	},
	methods: {}
};
</script>

<style scoped lang="stylus">
page
	background #eee
.pricing
	background #eee
</style>
