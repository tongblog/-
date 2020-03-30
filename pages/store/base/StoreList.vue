<template>
	<view>
		<view class="data-none" v-if="shopList.length == 0">
			<image 
				class="img" 
				lazy-load="true" 
				:src="'upload/applet/data-shop-none.png' | filterImg" 
				mode="widthFix"></image>
			<view class="txt" @tap="handleAllshop">点击获取全国店铺</view>
		</view>
		<view class="store-list uni-flex uni-column" v-for="(item,index) in shopList" :key="index">
			<view class="store flex-item uni-flex uni-row" @tap="handleStore(item.shop_id)">
				<view class="store-img flex-item">
					<image 
						v-if="item.shop_logo"
						:src="item.shop_logo | filterImg" 
						lazy-load="true" 
						@error="handleErr($event,index)" 
						mode="scaleToFill"></image>
					<image
						v-if="!item.shop_logo"
						:src="'upload/applet/touxiang.jpg' | filterImg" 
						lazy-load="true" 
						mode="scaleToFill"></image>
				</view>
				<view class="store-content">
					<view class="store-title">{{item.shop_name}}</view>
					<text v-if="true" class="mark">{{item.type_name}}</text>
					<uni-rate disabled="true" margin="2" max="5" size="15" :value="item.shop_servicecredit"></uni-rate>
					<view class="store-phone">
						<icon class="iconfont icon-dianpudianhua"></icon>
						<text>门店电话:</text>
						<text>{{item.shop_phone | filterPhone(item.is_show)}}</text>
					</view>
					<view class="store-address">
						<icon class="iconfont icon-dingwei"></icon>
						<text>门店地址:</text>
						<view class="address">{{item.shop_address | filterAddress(item.is_show)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default{
		props:{
			shopList:{
				type:Array
			}
		},
		components:{
			uniRate
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			},
			filterPhone(phone,show){
				if(show){
					return phone
				}else{
					function getNum(num){
					    var value = num.replace(/[^0-9]/ig,""); 
					    return value;
					}
					if(getNum(phone).length){
					    var phNum = getNum(phone),
					    phnumAfter = phNum.substr(0,3) + "****" + phNum.substr(7);
					}
					var result = phone.replace(phNum,phnumAfter);
					return result
				}	
			},
			filterAddress(address,show){
				if(show){
					return address
				}else{
					return "*********"
				}
			}
		},
		methods:{
			handleStore(id){
				goWindow('/pages/storeDetails/storeDetails?id=',id)
			},
			handleErr(e,index){
				if(e.type=='error'){
					this.shopList[index].shop_logo = "../../../static/images/list.jpg"
				}	
			},
			handleAllshop(){
				this.$emit("handleAllshop",true)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.data-none
		padding 10rpx 0
		text-align center
		color #222
		.txt
			width 304rpx
			margin auto
			border-radius 6rpx
			line-height 66rpx
			background-color #0657A6
			color #FFF
		.img
			width 50%
			margin-top 100rpx
	.store-list
		border-bottom 10rpx #F4F4F4 solid
		.store
			height 225rpx
			padding 24rpx
			justify-content space-between
			//background-color #CCCCCC
			.store-img
				overflow hidden
				width 35%
				height 100%
				border-radius 10rpx
				image
					width 100%
					height 100%
			.store-content
				width 63%
				.store-title
					display inline-block
					font-size 26rpx
					font-weight bold
					color #222222
				.mark
					display inline-block
					width 102rpx
					margin-left 20rpx
					border-radius 8rpx
					background-color #FFF2C5
					line-height 34rpx
					text-align center
					color #FF8D28
					font-size 20rpx
			.store-phone 
				line-height 0rpx
				font-size 25rpx
				color #444444
				text
					padding-left 8rpx
				icon
					font-size 23rpx
					color #444444
			.store-address	
				font-size 25rpx
				color #444444
				line-height 0rpx
				text
					display inline-block
					padding-left 8rpx
				icon
					font-size 23rpx
					color #444444
				.address
					float right
					display inline-block
					margin-top 18rpx
					width 300rpx
					font-size 25rpx
				
</style>
