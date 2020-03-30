<template>
	<view>
		<shop-head :shopData="shopData"></shop-head>
		<shop-body :shopId="shopId" :orderNum="orderNum"></shop-body>
	</view>
</template>

<script>
	import shopHead from "./base/shopHead";
	import shopBody from "./base/shopBody";
	import * as MemberApi from '@/api/member/member.js';
	export default{
		data(){
			return{
				shopId:0,
				orderNum:[],
				shopData:[],
			}
		},
		components:{
			shopHead,
			shopBody
		},
		onLoad() {
			this.getShopId()
		},
		methods:{
			getShopId(){
				let _this = this;
				MemberApi.getMemberInfo().then(res => {
					try{
						_this.shopId = res.data.user_info.instance_id;
						_this.getShopOrderCount();
						_this.getMemberShopInfo()
					}catch(err){
						console.log(err)
					}
				})
			},
			getShopOrderCount(){
				let _this = this;
				MemberApi.getShopOrderCount({
					shop_id:_this.shopId
				})
				.then(res => {
					_this.orderNum = res.data.order_status;
				})
			},
			getMemberShopInfo(){
				let _this = this;
				MemberApi.getMemberShopInfo({
					shop_id:_this.shopId
				})
				.then(res => {
					_this.shopData.push(res.data);
				})
			}
			
		}
	}
</script>

<style>
</style>
