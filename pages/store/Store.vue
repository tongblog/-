<template>
	<view>
		<store-data @handleConfirm="handleConfirm"></store-data>
		<store-region :address_name="address_name"></store-region>
		<store-list 
			:shopList="shopList"
			@handleAllshop="handleAllshop"></store-list>
	</view>
</template>

<script>
	// 店铺页面
	let _this;
	import {request} from '@/api/reques.js'
	import StoreData from './base/StoreData.vue'
	import StoreRegion from './base/StoreRegion.vue'
	import StoreList from './base/StoreList.vue'
	export default{
		data(){
			return{
				shopList:[],
				search_text:"",
				address_name:this.$store.state.city,
				detail:"",
				page_index:1,
				page_count:0
			}
		},
		onShow() {
			_this = this;
			this.address_name = this.$store.state.city;
			this.getShoplist()
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.page_index = 1;
			this.getShoplist();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 2000)
			
		},
		// 上拉加载
		onReachBottom(){
			if(this.page_count > this.page_index){
				this.page_index ++;
				_this.getShoplist(_this.page_index,_this.search_text)
			}else{
				return
			}
			
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'pages/store/Store'
				}
			}
			    
		},
		components:{
			StoreData,
			StoreRegion,
			StoreList
		},
		methods:{
			getShoplist(page_index = 1,value=""){
				this.shopList = [];
				request("/shop/getShopList",{
					page_index:page_index,
					page_size:10,
					search_text:this.detail,
					address_name:this.address_name == "全国" ? "" : this.address_name,
				},"POST")
				.then((res)=>{
					_this.$c.showLoading("加载中")
					this.search_text = ""
					if(res.data.data.data.length == 0){
						uni.showToast({
						    title: '暂无相关店铺',
						    duration: 1000,
							success() {
								setTimeout(()=>{
									uni.hideLoading()
								},500)
								
							}
						});
					}else{
						let data = res.data.data.data;
						if(page_index > 1){
							data = this.shopList.concat(data)
						}
						setTimeout(()=>{
							this.page_count = res.data.data.page_count;
							this.shopList = data;
							uni.hideLoading()
						},300)
					}
					
					//console.log(res.data.data.data)
				})
			},
			// 点击获取全部店铺
			handleAllshop(bool){
				if(bool){
					this.address_name = "";
					this.getShoplist()
				}
			},
			handleConfirm(value){
				this.detail = value;
				this.getShoplist()
				this.detail = ""
			},
		}
	}
</script>

<style>
</style>
