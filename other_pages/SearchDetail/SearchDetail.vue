<template>
	<view>
		<detail-list :detail='goodsList'></detail-list>
	</view>
</template>

<script>
	import DetailList from './base/DetailList.vue'
	import {request} from '@/api/reques.js'
	export default{
		data(){
			return{
				goodsList:[]
			}
		},
		components:{
			DetailList
		},
		onLoad() {
			this.getUsedCarList()
		},
		methods:{
			getUsedCarList(){
				let search = this.$store.state.search
				console.log(search)
				uni.setNavigationBarTitle({
				    title: search
				});
				request("/index/getUsedCarGoodsList",{
					search_name:search,
				},"GET")
				.then((res)=>{
					if(res.data.data.data == false){
						uni.showModal({
						    title: '温馨提示',
						    content: '未搜索到相关数据',
							showCancel:false,
						    success(res) {
						        if (res.confirm) {
						            uni.navigateBack({
						                delta: 1
						            });
						        }
						    }
						});
					};
					let detail = res.data.data.data;
					detail.forEach((value,index)=>{
						if(value.new_group_id !== 0){
							this.goodsList.push(value)
						}
					})
					console.log(this.goodsList)
				})
				
			}
		}
		
	}
</script>

<style>
</style>
