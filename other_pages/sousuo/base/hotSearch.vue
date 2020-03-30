<template>
	<view class="hot-search">
		<view class="uni-title">
			<text>热门搜索</text>
		</view>
		 <view class="uni-flex uni-row">
			<view class="flex-item" v-for="(item,index) in hotSearch" :key="index" @tap="clickHot(item)">{{item}}</view>
		</view>
	</view>
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {getHotSearch} from '@/api/search/hotSearch.js'
	export default{
		data(){
			return{
				hotSearch:[]
			}
		},
		created() {
			this.getHotSearch()
		},
		methods:{
			getHotSearch(){
				getHotSearch().then((res)=>{
					//console.log(res)
					this.hotSearch = res.data
				})
			},
			clickHot(item){
				this.$store.commit("changeHistory",item)
				this.$store.commit("changeSearch",item)
				goWindow('/other_pages/SearchDetail/SearchDetail')
			}
		}
	}
</script>

<style scoped lang="stylus">
	.uni-title
		padding 20rpx 20rpx
		text
			font-size 25rpx
			font-weight bold
			vertical-align middle
			color #222222
	.uni-flex
		flex-wrap wrap
		padding 0 25rpx
		.flex-item
			width 50%
			padding 15rpx 0
			margin 10rpx 0
			font-size 25rpx
			color #666666
</style>
