<template>
	<view class="pricing">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true"></wuc-tab>
		<list :status="status" ref="goods_list"></list>
	</view>
</template>

<script>
// 我的发布页面
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

import List from './base/list';
export default {
	data() {
		return {
			status: -1,
			TabCur: 0,
			tabList: [{name: '已上架'},{ name: '已下架' },{ name: '直卖议价' },{ name: '审核中' }, { name: '拒绝车源' },{ name: '已出售' }]
		};
	},
	onLoad(param) {
		let _this = this
		let status = param.status
		console.log(status)
		if(status == -1 || status == undefined){
			_this.status = 1
		}else if(status == 0){
			_this.status = +status + 1
			_this.TabCur = parseInt(status)
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
			if(index == 0){
				this.status = 1;
			}else if(index == 1){
				this.status = 0;
			}else if(index == 2){
				this.status = -1;
			}else if(index == 3){
				this.status = 2;
			}else if(index == 4){
				this.status = 3;
			}else if(index == 5){
				this.status = 9;
			}
			
			
		}
	}
};
</script>

<style scoped lang="stylus">

</style>
