<template>
	<view>
		<store-information :shopData="shopData" :shopId="shopId" :fav_shop="fav_shop"></store-information>
		<goods-list :shopId="shopId" :carList="carList"></goods-list>
	</view>
</template>

<script>
	import {request} from '@/api/reques.js'
	import StoreInformation from './base/StoreInformation.vue'
	import GoodsList from './base/GoodsList.vue'
	export default{
		data(){
			return{
				shopData:[],
				shopId:0,
				carList:[],
				fav_shop:0,
				page_index:1,
				page_count:0,
			}
		},
		onLoad(option) {
			this.shopId = parseInt(option.id);
			this.getShopInfo(this.shopId);
			this.getShopCarList(this.shopId)
			//console.log(this.shopId)
		},
		onReachBottom(){
			if(this.page_count > this.page_index){
				this.page_index ++;
				this.getShopCarList(this.shopId,this.page_index)
			}else{
				return
			}
			
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: '/pages/storeDetails/storeDetails?id=' + this.shopId,
				}
			}	    
		},
		components:{
			StoreInformation,
			GoodsList
		},
		
		methods:{
			getShopInfo(shopId){
				request("/shop/getShopInfo",{
					token:uni.getStorageSync('token'),
					shop_id:shopId,
				},"POST")
				.then((res)=>{
					this.shopData = [res.data.data];
					this.fav_shop = res.data.data.is_member_fav_shop; // 是否关注店铺
				})
			},
			getShopCarList(shopId,page_index = 1){
				request("/shop/getShopCarGoodsList",{
					shop_id:shopId,
					page_index:page_index,
					page_size:10,
				},"POST")
				.then((res)=>{
					this.$c.showLoading("加载中")
					let data = res.data.data.data;
					if(page_index > 1){
						data = this.carList.concat(data)
					}
					setTimeout(()=>{
						this.page_count = res.data.data.page_count;
						this.carList = data;
						uni.hideLoading()
					},300)
				})
			}
		}
	}
</script>

<style>
</style>
