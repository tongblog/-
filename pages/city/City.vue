<template>
	<view>
		<!-- <city-search></city-search> -->
		<city-list></city-list>
		<letter-list></letter-list>
	</view>
</template>

<script>
	//城市选择页面
	import CitySearch from './base/Search'
	import CityList from './base/List'
	import LetterList from '@/pages/common/letterList.vue'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			CitySearch,
			CityList,
			LetterList
		}
		
	}
</script>

<style scoped>

</style>
