<template>
	<view class="center-bottom">
		<view class="release flex-item line">
			<view class="release-title">我的发布</view>
			<view class="release-list uni-flex uni-row">
				<view class="list-nav" @click="goUrl('/other_pages/member/carprogress/index?status=0')">
					<view class="nav-img">
						<image src="../../../static/images/oder6.png" mode="scaleToFill"></image>
					</view>
					<!-- ({{member_index_data.goods_status[0] || 0}}) -->
					<view class="nav-bar">卖车进度</view>
				</view>
				<view class="list-nav" @click="goUrl('/other_pages/member/cargoods/index?status=0')">
					<view class="nav-img">
						<image src="../../../static/images/oder7.png" mode="scaleToFill"></image>
					</view>
					<!-- ({{member_index_data.goods_status[1] || 0}}) -->
					<view class="nav-bar">车辆管理</view>
				</view>
			</view>
		</view>
		<view class="release offer flex-item line">
			<view class="release-title">我的出价</view>
			<view class="release-list uni-flex uni-row">
				<view class="list-nav" @click="goUrl('/other_pages/member/offer_records/index?status=1')">
					<view class="nav-img">
						<image src="../../../static/images/oder11.png" mode="scaleToFill"></image>
					</view>
					<view class="nav-bar">出价中</view>
				</view>
				<view class="list-nav" @click="goUrl('/other_pages/member/offer_records/index?status=2')">
					<view class="nav-img">
						<image src="../../../static/images/oder10.png" mode="scaleToFill"></image>
					</view>
					<view class="nav-bar">出价结束</view>
				</view>
			</view>
		</view>
		<view class="service release flex-item">
			<view class="release-title">我的服务</view>
			<view class="release-list uni-flex uni-row">
				<view class="list-nav" v-on:click="goUrl('/other_pages/shop/shop',1)">
					<view class="nav-img">
						<image src="../../../static/images/oder8.png" mode="scaleToFill"></image>
					</view>
					<view class="nav-bar">我的店铺</view>
				</view>
				<view class="list-nav">
					<view class="nav-img">
						<image src="../../../static/images/oder9.png" mode="scaleToFill"></image>
					</view>
					<view class="nav-bar">我的卡券</view>
				</view>
				<view class="list-nav more-nav">
					<view class="nav-bar more">更多服务,敬请期待...</view>
				</view>
			</view>
		</view>
		<view class="after-sales flex-item uni-flex uni-column">
			<view class="flex-item" v-on:click="siteTel()">
				<text>客服中心</text>
				<icon class="iconfont icon-jiantou"></icon>
			</view>
			<view class="flex-item" v-on:click="goUrl('/other_pages/help/index?help_id=10')">
				<text>售后保障</text>
				<icon class="iconfont icon-jiantou"></icon>
			</view>
			<view class="flex-item" style="border-bottom-width: 0;" v-on:click="goUrl('/other_pages/help/index?help_id=11')">
				<text>平台管理规定</text>
				<icon class="iconfont icon-jiantou"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	let start = new Date();
	import * as MemberApi from '@/api/member/member.js'
	import * as IndexApi from '@/api/index/index.js'
	export default {
		props: {
			member_index_data: {
				type: Object,
				// 对象或数组默认值必须从一个工厂函数获取
				default: function() {
					return {};
				}
			}
		},
	
		data() {
			return {
				
			};
		},
		created() {
			
		},
	
		methods: {
			goUrl(url='', type = 0){
				let now = new Date();
				if(now - start <= 1000)return;
				start = now;
				let _this = this
				if(type == 1){
					MemberApi.getIsbindmobile().then(res => {
						if(res.data == 1){
							MemberApi.isBindId().then( res => {
								if(res.data <=0 ){
									// 跳转到实名认证
									_this.$c.showModal('实名认证','请先实名认证',()=>{
										_this.$c.goUrl('/other_pages/RealName/RealName')
									},'去认证','放弃');
									return 
								}else{
									MemberApi.getMemberShopInfo().then( res => {
										let data = res.data
										if(data== null || data == undefined){
											_this.$c.showModal('注册店铺','请先进行注册店铺',()=>{
												_this.$c.goUrl('/other_pages/member/applyshop/index')
											},'注册','取消');
											return 
										}else if(data.shop_state == 2){
											_this.$c.showModal('审核中','店铺审核中',()=>{
												_this.$c.goUrl('/other_pages/member/applyshop/index')
											},'查看');
											return 
									
										}else if(data.shop_state == 3){
											_this.$c.showModal('拒绝','店铺被拒绝',()=>{
												_this.$c.goUrl('/other_pages/member/applyshop/index')
											},'查看');
											return 
										}
										this.$c.goUrl(url)
									})
								}
							});
						}else{
							this.$c.goUrl('/pages/common/phonenumber')
						}
					})
					
				}else{
					this.$c.goUrl(url)
				}
				
			},
			siteTel(){
				let _this = this
				IndexApi.getWebSiteTel().then( res => {
					let data = res.data
					if(data == undefined || data == null || data.value == null || data.value.tel_service_addr == '') {
						_this.$c.msg('暂无客服电话')
						return false
					}else{
						uni.makePhoneCall({
						    phoneNumber: data.value.tel_service_addr //仅为示例
						});
					}
					
				})
			}
			
		},
		
		
	};
</script>

<style scoped lang="stylus">
	.center-bottom
		padding 3rpx 24rpx 30rpx 24rpx
		background-color #F4F4F4
		.line
			width 48%
			display inline-block
		.release
			height 238rpx
			box-shadow 0 0 10rpx 0 #ccc
			border-radius 25rpx
			background-color #FFFFFF
			.release-title
				padding 0 21rpx
				border-bottom 2rpx #EEEEEE solid
				font-size 28rpx
				line-height 70rpx
				color #222222
				font-weight bold
			.release-list
					padding-top 30rpx
					.list-nav
						display flex
						flex-wrap wrap
						justify-content center
						width 50%
						.nav-img
							width 70rpx
							height 56rpx
							image
								width 100%
								height 100%
						.nav-bar
							width 100%
							text-align center
							line-height 60rpx
							font-size 24rpx
							color #444444
		.offer
			margin-left 24rpx
		.service
			margin 27rpx 0 
			.release-list .list-nav
				width 25%
			.release-list .more-nav	
				width 40%
				.more
					margin-top 20rpx
					font-size 25rpx
					color #0657A6		
					
		.after-sales
			height 264rpx
			box-shadow 0 0 10rpx 0 #ccc
			border-radius 25rpx
			padding 0 24rpx
			background-color #FFFFFF
			.flex-item
				border-bottom 2rpx #EEEEEE solid
				color #222222
				font-size 26rpx
				line-height 86rpx
				icon
					float right
					color #777777
					font-size 22rpx
</style>
