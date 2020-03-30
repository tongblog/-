<template>
	<view class="pricing">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true"></wuc-tab>
		<list :status="status" ref="order_list" :shopId="shopId"></list>
	</view>
</template>

<script>
// 店铺页面
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import List from './base/list';
export default {
	data() {
		return {
			shopId:0,
			status: -2,
			TabCur: 0,
			tabList: [{ name: '全部' }, { name: '已下单' }, { name: '待验车' }, { name: '付定金' }, { name: '手续中' }, { name: '交易完成' }, { name: '交易关闭' }]
		};
	},
	onLoad(param) {
		console.log(param)
		let _this = this
		let status = param.status;
		this.shopId = param.id;
		if(status == -1 || status == undefined){
			_this.status = -1
		}
		if (status >= 0) {
			_this.status = status
			_this.TabCur = parseInt(status) + 1
		}
		
	},
	components: {
		List,
		WucTab
	},
	methods: {
		tabChange(index) {
			let _this = this;
			this.TabCur = index;
			this.status = index - 1;
		},
	}
};
</script>

<style scoped lang="stylus">
.pricing 
	background #F4F4F4
</style>
