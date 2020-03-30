<template>
	<view>
		<view class="shop-details" v-for="(item,index) in shopData" :key="index">
			<view class="shop-title">
				<view class="shop-img">
					<image 
						v-if="item.shop_logo" 
						lazy-load="true" @error="handleErr($event,index)" 
						:src="item.shop_logo | filterImg" 
						mode="scaleToFill"></image>
					<image
						v-if="!item.shop_logo"
						src="../../../static/images/list.jpg" 
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
				<view class="flex-item" v-if="false">
					<view class="item-left">
						<icon class="iconfont icon-dianpulianxiren"></icon>
						<text>联 系 人:</text>
					</view>
					<view class="item-right">经销商</view>
				</view>
				<view class="flex-item">
					<view class="item-left">
						<icon class="iconfont icon-dianpuxiangqingdianhua"></icon>
						<text>门店电话:</text>
					</view>
					<view class="item-right">{{item.shop_phone | filterPhone(item.is_show)}}</view>
				</view>    
				<view class="flex-item">
					<view class="item-left">
						<icon class="iconfont icon-dianpudizhi"></icon>
						<text>门店地址:</text>
					</view>
					<view class="item-right">{{item.shop_address | filterAddress(item.is_show)}}</view>
				</view>    
			</view>
			<view class="business uni-flex uni-column">
				<view class="flex-item">
					<text class="bus-left">经营范围:</text>
					<text class="bus-right">{{item.shop_scope}}</text>
				</view>
				<view class="flex-item">
					<text class="bus-left">特色服务:</text>
					<view class="bus-right">
						<text v-for="(arr,idx) in item.shop_service_arr" :key="idx">{{arr}}&nbsp;</text>
					</view>
				</view>
				<view class="flex-item">
					<text class="bus-left">开店时间:</text>
					<text class="bus-right">{{transferTime(item.shop_create_time)}}</text>
				</view>	        
			</view>
		</view>
	</view>
	
</template>

<script>
	import config from '@/api/config.js';
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default{
		data(){
			return{
				shopData:[]
			}
		},
		onLoad(option) {
			let data = JSON.parse(option.json)
			this.shopData.push(data);
			console.log(this.shopData)
		},
		components:{
			uniRate
		},
		filters:{
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
			},
			filterImg(src){
				if(src){
					return config.domain + src
				}
			}
		},
		methods:{
			handleErr(e,index){
				if(e.type=='error'){
					this.shopData[index].shop_logo = "../../../static/images/che.jpg"
				}	
			},
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let y = date.getFullYear();
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = y+ "-" +m+ "-" +d;
				return newDate
			},
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
				font-size 26rpx
				line-height 70rpx
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
				text
					padding-left 15rpx
					line-height 90rpx
					font-size 26rpx
					color #444444
</style>
