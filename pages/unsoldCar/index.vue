<template>
	<view class="unsoldCar">
		<exhibition></exhibition>
		<kucunnav
			@handleCarType="handleCarType"
			@handleBrands="handleBrands"></kucunnav>
		<list
			:carId="carId"
			:brandObj="brandObj"
			@changePage="changePage"></list>
	</view>
</template>

<script>
	// 库存车页面
	import Exhibition from './base/exhibition.vue'
	import Kucunnav from './base/kucunnav.vue'
	import List from './base/list.vue'
	export default{
		data(){
			return{
				carId:0,
				brandObj:{},
				page:1,
				count:1,
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.page = 1
			this.brandObj = {},
			this.$children[2].getGoodsList(this.page)
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 2000)
			
		},
		// 上拉加载
		onReachBottom(){
			if (this.page < this.count) {
				this.page ++;
			}else{
				return
			}
			this.$children[2].getGoodsList(this.page)
		},
		components:{
			Exhibition,
			Kucunnav,
			List
		},
		methods:{
			// 车辆类型筛选
			handleCarType(index){
				this.carId = parseInt(index);
			},
			// 品牌筛选
			handleBrands(brandObj){
				this.brandObj = brandObj
			},
			// 刷新数据
			changePage(page,count){
				this.page = page;
				this.count = count;
			}
		}
	}
</script>

<style>
</style>
