<template>
	<view class="certificate">
		<view class="cfc-title">车辆证件信息</view>
		<view class="cfc-list uni-flex uni-row" v-for="(item,index) in certificate" :key="index">
			<view class="flex-item">
				<view class="on">所在城市</view>
				<view class="down">{{item.addr}}</view>
			</view>
			<view class="flex-item">
				<view class="on">车辆类型</view>
				<view class="down">{{item.car_type}}</view>
			</view>
			<view class="flex-item">
				<view class="on">使用性质</view>
				<view class="down">{{item.use_character}}</view>
			</view>
			
			<view class="flex-item" v-if="!item.engine_brand">
				<view class="on">品牌型号</view>
				<view class="down">{{item.model}}</view>
			</view>
			
			<view class="flex-item" v-if="item.engine_brand">
				<view class="on">发动机品牌</view>
				<view class="down">{{item.engine_brand}}</view>
			</view>
			<view class="flex-item" v-if="item.qd_name">
				<view class="on">驱动形式</view>
				<view class="down">{{item.qd_name}}</view>
			</view>
			<view class="flex-item" v-if="!item.qd_name">
				<view class="on">总质量</view>
				<view class="down">{{item.gross_mass}}</view>
			</view>
			<view class="flex-item">
				<view class="on">使用年限</view>
				<view class="down">{{item.synx}}</view>
			</view>
			
			<view class="flex-item" v-if="item.ml_num">
				<view class="on">最大马力</view>
				<view class="down">{{item.ml_num}}</view>
			</view>
			<view class="flex-item" v-if="!item.ml_num">
				<view class="on">整备质量</view>
				<view class="down">{{item.unladen_mass}}</view>
			</view>
			<view class="flex-item" v-if="item.pf_name">
				<view class="on">排放标准</view>
				<view class="down">{{item.pf_name}}</view>
			</view>
			<view class="flex-item" v-if="!item.pf_name">
				<view class="on">核定载质量</view>
				<view class="down">{{item.approved_load}}</view>
			</view>
			<view class="flex-item">
				<view class="on">燃料类型</view>
				<view class="down">{{item.rl_name}}</view>
			</view>
			
			<view class="flex-item">
				<view class="on">外廓尺寸</view>
				<view class="down">{{item.dimension}}</view>
			</view>
			<view class="flex-item">
				<view class="on">轮胎规格</view>
				<view class="down">{{item.tyre_spec}}</view>
			</view>
			<view class="flex-item">
				<view class="on">挂箱</view>
				<view class="down">{{item.is_dgcs_name}}</view>
			</view>
		</view>
		<view class="look-all" @tap="handleTap">
			<text>查看车辆全部配置</text>
			<icon class="iconfont icon-jiantou"></icon>
		</view>
	</view>
</template>

<script>
	let _this;
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			certificate:{
				type:Array
			}
		},
		data(){
			return{
				
			}
		},
		created() {
			_this = this;
		},
		methods:{
			handleTap(){
				goWindow('/pages/common/viewMore?json=',encodeURIComponent(JSON.stringify(this.certificate)));
			}
		}
		
	}
</script>

<style scoped lang="stylus">
	.certificate
		padding 28rpx 28rpx 20rpx 28rpx
		.cfc-title
			width 160rpx
			border-bottom 2rpx #0657A6 solid
			font-size 26rpx
			line-height 26rpx
			color #222222
		.look-all
			text-align center
			font-size 22rpx
			color #777777
			icon
				margin-left 10rpx
				font-size 18rpx
				color #777777
		.cfc-list
			padding-top 30rpx
			border-bottom 1rpx #EEEEEE solid
			flex-wrap wrap
			.flex-item
				width 33%
				margin-bottom 35rpx
				.on
					font-size 22rpx
					line-height 22rpx
					color #777777
				.down
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
					font-size 26rpx
					color #222222
</style>
