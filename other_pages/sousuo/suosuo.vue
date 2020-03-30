<template>
	<view>
		<search></search>
		<history></history>
		<hot-search></hot-search>
	</view>
</template>

<script>
	// 搜索页面
	import Search from './base/Search.vue';
	import History from './base/history.vue'
	import HotSearch from './base/hotSearch.vue'
	export default{
		components:{
			Search,
			History,
			HotSearch
		}
	}
</script>

<style>
</style>
