<template>
	<view class="history" v-if="hisShow">
		<view class="uni-title">
			<text>历史搜索</text>
			<icon class="iconfont icon-sousuolaji" @tap='clickRemove'></icon>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" v-for="(item,index) in history" :key='index' v-if="index < 12" @tap='handleInput(item)'>{{item}}</view>
		</view>
	</view>
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				history:[],
				hisShow:false
			}
		},
		created() {
			let that = this
			uni.getStorage({
			    key: 'searchAll_key',
			    success(res) {
					//console.log(res.data.reverse())
			        that.history = (res.data.reverse()).filter((val,index)=>{
						return res.data.indexOf(val) === index
					})
					that.hisShow = true
			    }
			});
		},
		methods:{
			clickRemove(){
				let that = this
					this.$c.showModal(
					"提示",
					"确定删除全部历史记录",
					function(){
						that.history = '';
						that.hisShow = false
						uni.removeStorage({
							key: 'searchAll_key',
						});
					}, 
					'确定',
					'取消', 
					function(){
						console.log("取消")
					})
				
			},
			handleInput(item){
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
		icon
			float right
			padding-left 50rpx
			vertical-align middle
			font-size 26rpx
	.uni-flex
		flex-wrap wrap
		padding 0 25rpx	
		.flex-item
			padding 0 15rpx
			margin 20rpx 12rpx
			border-radius 30rpx
			background-color #F4F4F4 
			font-size 26rpx
			text-align center
			color #666666
			
			
</style>
