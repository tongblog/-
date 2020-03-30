<template>
	<view class="header">
		<view class="place">
			<view class="city" @click="handleCity">
				<icon class="iconfont icon-dingwei"></icon>
				<text class="city-name">{{city}}</text>
			</view>
			<view class="search" @click="handleSearch">
				<icon class="iconfont icon-sousuo"></icon>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	var _this
	export default {
		name:'Header',
		data(){
			return{
				city:""
			}
		},
		created() {
			_this = this
			this.city = this.$store.state.city
		},
		watch:{
			'$store.state.city':(newValue)=>{
				_this.city = newValue;
				//console.log(_this.city)
			}
		},
		methods:{
			handleCity(){
				goWindow('/pages/city/City')
			},
			handleSearch(){
				goWindow('/other_pages/sousuo/suosuo')
			}
		}
		
	}
</script>

<style scoped lang="stylus">
	.header
		position fixed
		top 0
		left 0
		width 100vw
		z-index 200
		background-color #007AFF
		.place
			line-height 60rpx
			background-color #0657A6
			padding 0 24rpx
			.city
				display inline-block
				icon
					color #FFFFFF
					font-size 40rpx
				.city-name
					display inline-block
					overflow hidden
					width 100rpx
					height 40rpx
					padding-left 10rpx
					white-space normal
					text-overflow ellipsis
					color #fff
			.search
				position absolute
				display inline-block
				top 0
				bottom 0
				right 25rpx
				margin auto
				max-height 56rpx
				width 516rpx
				padding-left 15rpx 
				background-color rgba(255,255,255,.5)
				border-radius 40rpx
				icon
					margin-top -4%
					color #1E71C3
					font-size 28rpx
				text
					display inline-block
					padding-left 10px
					line-height 56rpx
					color #1E71C3
			
</style>
