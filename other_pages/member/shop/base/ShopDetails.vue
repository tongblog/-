<template>
	<view>
		<view class="shop-details" v-for="(item,index) in shop_data" :key="index">
			<view class="shop-title">
				<view class="shop-img">
					<image v-if="item.shop_logo" :src="item.shop_logo | filterImg" mode="scaleToFill"></image>
					<image
						v-if="!item.shop_logo"
						:src="'upload/applet/touxiang.jpg' | filterImg" 
						lazy-load="true" 
						mode="scaleToFill"></image>
				</view>
				<view class="shop-name">
					<text>{{item.shop_name}}</text>
					<view class="level">
						综合评级:
						<uni-rate disabled="true" margin="2" max="5" size="15" :value="item.shop_servicecredit"></uni-rate>
					</view>
				</view>
			</view>
			<view class="stores-data uni-flex uni-column">
				<!-- <view class="flex-item">
					<view class="item-left">
						<icon class="iconfont icon-dianpulianxiren"></icon>
						<text>联 系 人:</text>
					</view>
					<view class="item-right">{{shop_data.shop_name}}</view>
				</view> -->
				<view class="flex-item">
					<view class="item-left">
						<icon class="iconfont icon-dianpuxiangqingdianhua"></icon>
						<text>门店电话:</text>
					</view>
					<view class="item-right">{{item.shop_phone}}</view>
				</view>    
				<view class="flex-item">
					<view class="item-left">
						<icon class="iconfont icon-dianpudizhi"></icon>
						<text>门店地址:</text>
					</view>
					<view class="item-right">{{item.shop_address || '无'}}</view>
				</view>    
			</view>
			<view class="business uni-flex uni-column">
				<view class="flex-item">
					<text class="bus-left">经营范围:</text>
					<text class="bus-right">{{item.shop_scope}}</text>
				</view>
				<view class="flex-item">
					<text class="bus-left">特色服务:</text>
					<text class="bus-right">{{item.shop_service_name}}</text>
				</view>
				<view class="flex-item">
					<text class="bus-left">开店时间:</text>
					<text class="bus-right">{{item.shop_create_time || '无'}}</text>
				</view>	        
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import * as MemberApi from "@/api/member/member.js"
	export default{
		data(){
			return{
				shop_id : 0,
				shop_data : []
			}
		},
		components:{
			uniRate
		},
		onLoad() {
			let _this = this
			_this.getData()
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			},
		},
		methods:{
			getData(){
				let _this = this
				MemberApi.getMemberShopInfo().then( res => {
					if(res.data == undefined || res.data == null){
						_this.$c.msg('店铺不存在')
						setTimeout(()=>{
							_this.$c.goUrl('/pages/personalcenter/PersonalCenter')
						},1500)
					}else{
						let data = res.data
						let shop_service_name = ''
						for(let index in data.shop_service_arr){
							shop_service_name += data.shop_service_arr[index] + '   '
							
						}
						data.shop_service_name = shop_service_name
						_this.shop_data = [data]
						_this.shop_data[0].shop_notice = _this.shop_data[0].shop_notice == null ? '无' :''
						_this.shop_data[0].shop_create_time = _this.$c.timeStampTurnTime(_this.shop_data.shop_create_time)
						_this.shop_data[0].shop_discount_notice = _this.shop_data[0].shop_discount_notice == null ? '无' :''
						
						_this.shop_id = res.data.shop_id
					}
					
				})
			}
		}
	}
</script>
	
<style scoped lang="stylus">
	.shop-title
		display flex
		padding 34rpx 25rpx
		border-bottom 20rpx #F4F4F4 solid
		.shop-img
			overflow hidden
			width 106rpx
			height 106rpx
			border-radius 10rpx
			image
				width 100%
				height 100%
		.shop-name
			padding-left 35rpx
			text
				font-size 32rpx
				color #222222
				font-weight bold
			.level
				font-size 21rpx
				color #444444
				uni-rate
					display inline-block
	.stores-data
		padding 0 25rpx 10rpx 25rpx
		border-bottom 20rpx #F4F4F4 solid
		.flex-item
			display flex
			.item-left
				width 24%
				color #444444
				icon
					font-size 22rpx
				text
					padding-left 15rpx
					font-size 26rpx
			.item-right
				width 76%
				padding-top 15rpx
				font-size 26rpx
				line-height 35rpx
				color #222222
	.business
		padding 0 24rpx
		.flex-item
			display flex
			border-bottom 2rpx #EEEEEE solid
			line-height 90rpx
			font-size 26rpx
			.bus-left
				width 25%
				color #222222
			.bus-right
				width 75%
				text-align right
				color #444444
</style>
