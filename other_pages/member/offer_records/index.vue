<template>
	<view class="pricing">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true"></wuc-tab>
		<list :status="status" ref="goods_list"></list>
	</view>
</template>

<script>
//我的发布页面
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

import List from './base/list';
export default {
	data() {
		return {
			status: -1,
			TabCur: -1,
			tabList: [{ name: '直卖议价' },{ name: '出价中' }, { name: '出价结束' }]
		};
	},
	onLoad(param) {
		let _this = this
		let status = param.status
		if(status == -1 || status == undefined){
			_this.status = 0
		}
		if (status >= 0) {
			_this.status =  parseInt(status) - 1 ;
			_this.TabCur = parseInt(status); 
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
		}
	}
};
</script>

<style scoped lang="stylus">

</style>
