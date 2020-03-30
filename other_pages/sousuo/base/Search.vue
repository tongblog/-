<template>
	<view class="search">
		<view class="uni-form-item uni-column">
			<icon class="iconfont icon-sousuo"></icon>
			<input class="uni-input" type="text" @confirm='searchFun' :value="changeValue" adjust-position="true" focus="true" placeholder="搜索" />
		</view>
	</view>
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	let that
	export default{
		data(){
			return{
				changeValue:'',
				searchAll:[],
			}
		},
		created() {
			that = this
			uni.getStorage({
			    key: 'searchAll_key',
			    success(res) {
			       that.searchAll = res.data;
			    }
			});
		},
		methods:{
			searchFun(e){
				this.changeValue = e.detail.value 
				this.$store.commit("changeSearch",this.changeValue)
				if(this.changeValue != ''){
					const that = this
					this.searchAll.push(this.changeValue)
					uni.setStorage({
						key: 'searchAll_key',
						data: that.searchAll,    
					})
					goWindow('/other_pages/SearchDetail/SearchDetail')
					
					this.changeVaule = '';
				}
			}
		},
		watch:{
			'$store.state.history':(newValue)=>{
				that.changeValue = newValue;
			}
		},
	}
</script>

<style scoped lang="stylus">
	.search
		padding 20rpx 0
		background-color #F4F4F4
	.uni-form-item
		position relative
		width 715rpx
		height 66rpx
		padding 0 20rpx
		margin 0 auto
		icon
			position absolute
			left 60rpx
			top 0
			bottom 0
			margin auto
			color #AAAAAA
		.uni-input
			padding 0 80rpx
			height 56rpx
			border-radius 28rpx
</style>
