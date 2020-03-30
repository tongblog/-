<template>
	<view class="tuijian" v-if="false">
		<view class="tuijian-content">
			<view class="tuijian-title">商家推荐</view>
			<text class="tuijian-right" @click="goUrl('/other_pages/member/shop/index',1)">车商入驻</text>
			<view class="tuijian-list">
				<view class="item" v-for="(item,index) in shopList" :key="index">
					<image 
						style="width: 81rpx;height: 81rpx;" 
						@tap="handleShop(item.shop_id)"
						:src="item.shop_logo | filterImg" 
						mode="scaleToFill"></image>
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import * as MemberApi from '@/api/member/member.js'
	import * as IndexApi from '@/api/index/index.js'
	export default{
		props:{
			shopList:{
				type:Array
			}
		},
		data(){
			return{
				
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		methods:{
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
			handleShop(id){
				goWindow('/pages/storeDetails/storeDetails?id=',id)
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
			}
		}
	}
</script>

<style scoped lang="stylus">
	.tuijian
		padding 25rpx
		.tuijian-content
			width 670rpx
			height 138rpx
			padding 18rpx
			box-shadow 0 0 10rpx 0 #ccc	
			.tuijian-title
				display inline-block
				font-size 30rpx
				color #111111
				line-height 0rpx
			.tuijian-right
				float right
				padding 0 17rpx
				border 2rpx #0657A6 solid
				border-radius 30rpx
				font-size 22rpx
				color #0657A6
				line-height 43rpx
			.tuijian-list
				display flex
				width 100%
				padding-top 13rpx
				.item
					display flex
					width 20%
					justify-content center
					image
						overflow hidden
						border-radius 50%
</style>
