<template>
	<view class="pricing"><info :order_id="order_id"></info></view>
</template>

<script>
// 足迹页面
import { goWindow } from '@/api/navigate.js'; // 页面跳转

import Info from './base/info';
export default {
	data() {
		return {
			order_id: false
		};
	},
	onLoad(param) {
		let _this = this;
		let order_id = param.order_id || 0;
		this.order_id = order_id;
	},
	components: {
		Info
	},
	methods: {}
};
</script>

<style scoped lang="stylus">
page
	background #F4F4F4
.pricing
	background #F4F4F4
</style>
