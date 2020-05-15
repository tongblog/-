<template>
	<view style="position: relative;">
		<view class="kucunnav uni-flex uni-row">
			<view class="flex-item" @click="handleModels">
				<text :class="{txtC:show1}">车型</text>
				<icon :class="{rotate:show1}" class="iconfont icon-jiantou1"></icon>
			</view>
			<view class="flex-item" @click="handleBrand">
				<text :class="{txtC:show2}">品牌</text>
				<icon :class="{rotate:show2}" class="iconfont icon-jiantou1"></icon>
			</view>
		</view>
		<view class="models" v-if="show1">
			<view class="car-models uni-row">
				<view class="models-item" v-for="(car,index) in car_type" :key="index" @tap="handleCarType(index)">
					<text>{{car}}</text>
				</view>
				
			</view>
		</view>
		
	</view>
	
</template>

<script>
	let _this;
	import {request} from '@/api/reques.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import Brand from '@/pages/common/brand.vue';
	import LetterList from "@/pages/common/letterList.vue";
	export default{
		data(){
			return{
				show1:false,
				show2:false,
				car_type:[], // 车型
			}
		},
		created() {
			this.getSearchCondition()
			_this = this
		},
		watch:{
			"$store.state.kucars":(v)=>{
				_this.handleBrands(v)
			}
		},
		methods:{
			handleModels(){
				this.show1 = !this.show1
			},
			handleBrand(){
				this.show2 = !this.show2
				goWindow("/pages/common/brand?mark=2")
			},
			// 获取车型,排放,驱动
			getSearchCondition(){
				request("/index/getSearchCondition",{},"GET")
				.then((res)=>{
					//console.log(res)
					this.car_type = res.data.data.car_type.slice(1); // 车型
				})
			},
			// 根据车型筛选
			handleCarType(index){
				let carId = index + 1;
				this.$emit('handleCarType',carId);
				this.show1 = false;
			},
			// 根据品牌筛选
			handleBrands(brandObj){
				this.$emit('handleBrands',brandObj);
				this.show2 = false;
			},
		},
		components:{
			Brand,
			LetterList
		}
	}
</script>

<style scoped lang="stylus">
	.kucunnav
		width 100%
		background-color #F4F4F4
		text-align center
		.flex-item
			width 50%
			height 70rpx
			line-height 70rpx
			color #444444
			text-align center
			font-size 0
			text
				margin-right 8rpx
				vertical-align middle
				font-size 24rpx
			text.txtC
				color #0657A6
			icon
				vertical-align middle
				color #444444
				font-size 20rpx
			icon.rotate
				transform rotate(180deg)
				color #0657A6	
	.models
		position absolute
		top 70rpx
		z-index 100
		width 100%
		//height 300rpx
		background-color #FFFFFF
		.car-models
			display flex
			flex-wrap wrap
			padding 20rpx 30rpx
			.models-item
				width 25%
				margin 10px
				border 1rpx #DDDDDD solid
				border-radius 10rpx
				line-height 72rpx
				text-align center
				font-size 24rpx
				color #222222		
</style>
