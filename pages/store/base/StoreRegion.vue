<template>
	<view class="store-region" @click="handleRegion">
		<input type="text" :value="address_name" disabled="true" placeholder="请选择店铺所在地区" />
		<view class="region">
			<text>地区</text>
			<icon class="iconfont icon--guanbi"></icon>
		</view>
		<view :animation="animationData" class="service" @click.stop="goUrl('/other_pages/member/shop/index',1)">
			<image src="../../../static/images/ruzhu.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	let _this;
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import * as MemberApi from '@/api/member/member.js'
	import * as IndexApi from '@/api/index/index.js'
	export default{
		data(){
			return{
				
			}
		},
		props:{
			address_name:{
				type:String
			}
		},
		created() {
			_this = this;
			
		},
		methods:{
			handleRegion(){
				goWindow('/pages/city/City')
			},
			goUrl(url='', type = 0){
				let toKen = uni.getStorageSync('token');
				let _this = this
				if(type == 1){
					if(toKen !== ""){
						MemberApi.getIsbindmobile().then(res => {
							if(res.data == 1){
								this.zhuche()
							}else{
								goWindow('/pages/common/phonenumber')
							}
						})
					}else{
						goWindow("/pages/common/login")
					}
					
					
				}else{
					this.$c.msg("您已注册店铺")
				}
				
			},
			zhuche(){
				let _this = this
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
							this.$c.msg("您已注册店铺")
						})
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="stylus">
	.store-region
		position relative 
		height 90rpx
		background-color #F4F4F4
		input
			flex 1
			padding 8rpx 30rpx
			background-color #FFFFFF
		.region
			position absolute
			top 0
			right 20rpx
			height 100%
			font-size 25rpx
			color #444444
			text
				vertical-align middle
			icon
				padding-left 8rpx
				margin-top -5rpx
				font-size 12rpx
				vertical-align 8%
		.service
			position fixed
			right 24rpx
			bottom 100rpx
			margin auto
			z-index 80
			width 146rpx
			height 129rpx
			transform rotateY(0deg)
			animation: move 1s linear 0s infinite alternate;
			image
				width 100%
				height 100%
		@keyframes move{
			from{
				transform rotate(10deg)
			}
			to{
				transform rotate(-10deg)
			}
		}
			
					
</style>
