<template>
	<view>
		<store-information :shop_data="shop_data"></store-information>
		<goods-list :shop_id="shop_id"></goods-list>
	</view>
</template>

<script>
	import * as MemberApi from '@/api/member/member.js'
	import StoreInformation from './base/StoreInformation.vue'
	import GoodsList from './base/GoodsList.vue'
	export default{
		data(){
			return{
				shop_data : [],
				shop_id : 0
			}
		},
		components:{
			StoreInformation,
			GoodsList
		},
		onLoad() {
			let _this = this
			_this.getData()
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
						_this.shop_data = [res.data]
						_this.shop_data[0].shop_notice = _this.shop_data[0].shop_notice == null ? '暂无公告' : _this.shop_data[0].shop_notice
						_this.shop_data[0].shop_discount_notice = _this.shop_data[0].shop_discount_notice == null ? '暂无优惠信息' :  _this.shop_data[0].shop_discount_notice
						_this.shop_id = res.data.shop_id
					}
					
				})
			}
		}
	}
</script>

<style>
</style>
