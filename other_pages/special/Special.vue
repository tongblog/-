<template>
	<view class="special">
		<sell 
			@handleOld="handleOld"
			@handleCarType="handleCarType"
			@handleBrands="handleBrands"
			@handlePrice="handlePrice"
			@bindPickerChange1="bindPickerChange1"
			@bindPickerChange2="bindPickerChange2"
			@bindScreening="bindScreening"></sell>
		<list 
			:num="num"
			:carId="carId"
			:brandId="brandId"
			:priceIndex="priceIndex"
			:min="min"
			:max="max"
			:gather="gather"
			:pfId="pfId"
			:qdId="qdId"
			:min_ml="min_ml"
			:max_ml="max_ml"
			@changePage="changePage"
			@handleGather="handleGather"></list>
	</view>
</template>

<script>
	// 港口特价页面
	let _this;
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import Sell from '@/pages/common/sell.vue'
	import List from "./base/list"
	export default{
		data(){
			return{
				num:"",
				carId:"",
				brandId:"",
				priceIndex:"",
				max:"",
				min:"",
				gather:false,
				pfId:"",
				qdId:"",
				min_ml:"",
				max_ml:"",
				page:1,
				count:1,
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.num = "";
			this.carId = "";
			this.brandId = "";
			this.priceIndex = "";
			this.min = "";
			this.max = "";
			this.pfId = "";
			this.qdId = "";
			this.min_ml = "";
			this.max_ml = "";
			this.$children[1].getGoodsList(this.page)
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
			this.$children[1].getGoodsList(this.page)
		},
		onLoad() {
			_this = this;
		},
		components:{
			Sell,
			List
		},
		methods:{
			// 车龄最短,价格，最新上线
			handleOld(num){
				this.num = num
			},
			// 车辆类型筛选
			handleCarType(index){
				this.carId = parseInt(index);	
			},
			// 品牌筛选
			handleBrands(brandId){
				console.log(_this.brandId)
				_this.brandId = brandId;
			},
			// 价格筛选
			handlePrice(index,max,min){
				this.priceIndex = index;
				this.min = parseInt(min);
				this.max = parseInt(max);
			},
			
			// 排放，驱动，马力筛选
			bindPickerChange1(bool,pfId,qdId,min_ml,max_ml){
				this.gather = bool;
				this.pfId = pfId;
				this.qdId = qdId;
				this.min_ml = min_ml;
				this.max_ml = max_ml;
			},
			handleGather(bool){
				this.gather = bool;
			},
			// 重置按钮
			bindPickerChange2(bol){
				if(bol){
					this.pfId = "";
					this.qdId = "";
					this.min_ml = "";
					this.max_ml = "";
					this.gather = true;
				}
			},
			// 重置按钮11
			bindScreening(mark){
				if(mark){
					this.page = 1;
					this.num = "";
					this.carId = "";
					this.brandId = "";
					this.priceIndex = "";
					this.min = "";
					this.max = "";
					this.$children[1].getGoodsList(this.page)
				}
			},
			// 刷新数据
			changePage(page,count){
				this.page = page;
				this.count = count;
			}
		}
	}
</script>

<style scoped lang="stylus">
	
</style>
