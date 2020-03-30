<template>
	<view class="dection-list">
		<view class="uni-flex uni-column">
			<view class="flex-item" v-for="(item,index) in testInfo" :key="index">
				<text>{{item.name}}</text>
				<view class="list-item" @tap="handleDetail(index)">
					<view v-if="item.error_num" class="risk">
						<text>{{item.error_num}}项</text>
						<icon class="iconfont icon-jiancefengxian"></icon>
					</view>
					<view class="confirm">
						<text>{{item.child_list.length - item.error_num}}项</text>
						<icon class="iconfont icon-jiancequeding"></icon>
					</view>
					<icon class="iconfont icon-jiantou"></icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {goWindow} from '@/api/navigate.js'
	export default{
		props:{
			testInfo:{
				type:Array,
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			handleDetail(index){
				let testInfo = JSON.stringify(this.testInfo)
				uni.navigateTo({
				    url: "/pages/common/TestingDetaile?arr="+ testInfo + "&index=" + index,
				});
			}
		}
	}
</script>

<style scoped lang="stylus">
	.dection-list
		padding 0 25rpx
		.uni-flex .flex-item
			display flex
			justify-content space-between
			border-bottom 1rpx #EEEEEE solid
			.list-item
				display inline-block
				icon
					color #AAAAAA
					font-size 22rpx
			text
				display inline-block
				line-height 80rpx
				color #222222
				font-size 26rpx
			.list-item .risk
				display inline-block
				padding 0 15rpx
				text
					color #222222
					font-size 26rpx
				icon
					margin-left 10rpx
					color #FF2323
					font-size 26rpx
			.list-item .confirm
				display inline-block
				padding 0 15rpx
				text	
					color #222222
					font-size 26rpx
				icon
					margin-left 10rpx
					color #4BC44B
					font-size 26rpx	
			
</style>
