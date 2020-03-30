<template>
	<view class="more">
		 <view class="uni-flex uni-column" v-for="(item,index) in gc_certificate" :key="index">
			<view class="flex-item">
				<text>车辆类型</text>
				<text class="right">{{item.gc_type}}</text>
			</view>
			<view class="flex-item">
				<text>车辆所在地</text>
				<text class="right">{{item.gc_addr}}</text>
			</view>
			<view class="flex-item">
				<text>使用性质</text>
				<text class="right">{{item.gc_character}}</text>
			</view>
			<view class="flex-item">
				<text>品牌型号</text>
				<text class="right">{{item.gc_model}}</text>
			</view>
			<view class="flex-item">
				<text>注册日期</text>
				<text class="right">{{item.gc_register}}</text>
			</view>
			<view class="flex-item">
				<text>发证日期</text>
				<text class="right">{{item.gc_issue}}</text>
			</view>
			<view class="flex-item">
				<text>总质量</text>
				<text class="right">{{item.gc_gross}}</text>
			</view>
			<view class="flex-item">
				<text>整备质量</text>
				<text class="right">{{item.gc_unladen}}</text>
			</view>
			<view class="flex-item">
				<text>核定载质量</text>
				<text class="right">{{item.gc_approved}}</text>
			</view>
			<view class="flex-item">
				<text>外廓尺寸</text>
				<text class="right">{{item.gc_dimension}}</text>
			</view>
			<view class="flex-item">
				<text>检验有效期</text>
				<text class="right">{{item.gc_inspection}}</text>
			</view>
			<view class="flex-item">
				<text>轴型</text>
				<text class="right">{{item.gc_zx}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	// 车辆基本信息
	export default{
		data(){
			return{
				gc_certificate:[],
			}
		},
		onLoad(option) {
			let certificate = JSON.parse(decodeURIComponent(option.json));
			this.gc_certificate = certificate[0].gc_certificate;
			//console.log(this.gc_certificate)
		}
	}
</script>

<style scoped lang="stylus">
	.uni-flex
		padding 0 20rpx
		.flex-item:nth-child(6)
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

