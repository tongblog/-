<template>
	<view class="more">
		 <view class="uni-flex uni-column" v-for="(item,index) in certificate" :key="index">
			<view class="flex-item">
				<text>车辆类型</text>
				<text class="right">{{item.car_type}}</text>
			</view>
			<view class="flex-item">
				<text>车辆所在地</text>
				<text class="right">{{item.addr}}</text>
			</view>
			<view class="flex-item">
				<text>使用性质</text>
				<text class="right">{{item.use_character}}</text>
			</view>
			<view class="flex-item">
				<text>品牌型号</text>
				<text class="right">{{item.model}}</text>
			</view>
			<view class="flex-item">
				<text>注册日期</text>
				<text class="right">{{item.register_date}}</text>
			</view>
			<view class="flex-item">
				<text>发证日期</text>
				<text class="right">{{item.issue_date}}</text>
			</view>
			<view class="flex-item">
				<text>核定载人数</text>
				<text class="right">{{item.appproved}}</text>
			</view>
			<view class="flex-item">
				<text>总质量</text>
				<text class="right">{{item.gross_mass}}</text>
			</view>
			<view class="flex-item">
				<text>整备质量</text>
				<text class="right">{{item.unladen_mass}}</text>
			</view>
			<view class="flex-item">
				<text>核定载质量</text>
				<text class="right">{{item.approved_load}}</text>
			</view>
			<view class="flex-item">
				<text>准牵引总质量</text>
				<text class="right">{{item.traction_mass || "--"}}</text>
			</view>
			<view class="flex-item">
				<text>检验有效期</text>
				<text class="right">{{item.inspection_record}}</text>
			</view>
			<view class="flex-item">
				<text>燃料类型</text>
				<text class="right">{{item.rl_name}}</text>
			</view>
			<view class="flex-item">
				<text>最大马力</text>
				<text class="right">{{item.ml_num || "--"}}</text>
			</view>
			<view class="flex-item">
				<text>排放标准</text>
				<text class="right">{{item.pf_name || "--"}}</text>
			</view>
			<view class="flex-item">
				<text>保险</text>
				<text class="right">{{item.bx_id}}</text>
			</view>
			<view class="flex-item">
				<text>保险类型</text>
				<text class="right">{{item.bx_name || "--"}}</text>
			</view>
			<view class="flex-item">
				<text>挂车</text>
				<icon 
					v-if="item.is_dgcs_name == '有'" 
					class="iconfont icon-jiantou"
					@tap="handleGuache"></icon>
				<text class="right">{{item.is_dgcs_name}}</text>
			</view>
			<view class="flex-item">
				<text>是否包提档</text>
				<text class="right">{{item.is_btd}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 车辆基本信息
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		data(){
			return{
				certificate:[],
			}
		},
		onLoad(option) {
			this.certificate = JSON.parse(decodeURIComponent(option.json));
			//console.log(this.certificate)
		},
		methods:{
			handleGuache(){
				goWindow("/pages/common/dgMore?json=",encodeURIComponent(JSON.stringify(this.certificate)))
			}
		}
	}
</script>

<style scoped lang="stylus">
	.uni-flex
		padding 0 20rpx
		.flex-item:nth-child(14)
			border-bottom 20rpx #F4F4F4 solid
		.flex-item
			border-bottom 1rpx #EEEEEE solid
			line-height 75rpx
			font-size 26rpx
			color #333333
			.iconfont
				float right
				padding-left 20rpx
				font-size 24rpx
				color #333333
			.right
				float right
</style>
