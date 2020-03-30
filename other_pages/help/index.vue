<template>
     
       <!-- <wxParse :content="article" @preview="preview" @navigate="navigate" /> -->
		<view class="">
			<web-view :src="help_url"></web-view>
		</view>
     
</template>

<script>
import * as HelpApi from '@/api/help/help.js';
// import wxParse from '@/components/uParse/src/wxParse.vue'
import config from '@/api/config.js';
export default {
	data() {
		return {
			info: {},
			help_id : 0,
			help_url : ''
			// article: ''
		};
	},

	components: {
		// wxParse 
	},
	onLoad(param) {
		let _this = this;
		let help_id = param.help_id || 0
		_this.help_url = config.domain + 'wap/help/index?help_id=' +help_id
		_this.help_id = help_id
		_this.getData();
	},
	methods: {
		getData() {
			let _this = this;
			
			HelpApi.getHelpContent({
				help_id : _this.help_id
			}).then(res => {
				_this.$c.showLoading('加载中')
				if (res.data == undefined || res.data == null) {
					_this.$c.msg('信息错误');
					setTimeout(() => {
						_this.$c.hideLoading()
						_this.$c.goUrl('',3);
					}, 1500);
				} else {
					uni.setNavigationBarTitle({
					    title: res.data.title
					});
					_this.article = res.data.content
					setTimeout(() => {
						_this.$c.hideLoading()
						_this.info = res.data
						
					}, 500);
				}
			});
		},
		preview(src, e) {
			// do something
		},
		navigate(href, e) {
			// do something
		}
	}
};
</script>

<style>
	
</style>
