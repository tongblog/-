<template>
	<view class="pricing">
		<pric-nav></pric-nav>
		<list :olds='olds' :higt="higt" :low="low" :latest="latest"></list>
	</view>
</template>

<script>
	// 关注店铺
	import {goWindow} from '@/api/navigate.js'  // 页面跳转

	import List from "./base/list"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			List,
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="stylus">
page
	background-color #ebedf0
	height 100%
</style>
