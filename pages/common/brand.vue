<template>
	<view class="brand">
		<scroll-view 
			class="scroll-view" 
			scroll-y="true" 
			:scroll-into-view="letter" 
			@scroll="scroll"
			scroll-with-animation="true">
			<view class="brand-title">
				<text>热门品牌</text>
			</view>
			<view class="brand-content uni-flex uni-row">
				<view 
					@tap="handleCategory(item.category_id,item)"
					class="flex-item" 
					v-if="index < 10"
					v-for="(item,index) in hot" 
					:key="index">
					<image :src="item.category_pic | filterImg" mode="scaleToFill"></image>
					<view class="text">{{item.category_name}}</view>
				</view>
			</view>
			<view class="brand-list" v-for="(car,key) in cars" :key="key" v-if="key !== 'is_hot'">
				<view class="letter" :id="'letter'+key">{{key}}</view>
				<view 
					class="letter-car uni-column" 
					v-for="(value,idx) in car" 
					:key="idx" 
					@tap="handleCategory(value.category_id,value)">
					<view class="flex-item">{{value.category_name}}</view>
				</view>	
			</view>
		</scroll-view>
		<letter-list @changeLetter="changeLetter"></letter-list>
		<view :class="{secon:off}" @touchmove.stop.prevent="touchMove" class="secondary">
			<view class="sec-title">{{model.category_name}}</view>
			<scroll-view class="sec-scroll" scroll-y="true">
				<view
					class="sec-list" 
					@tap="handleCars(item1)"
					v-for="(item1,index1) in series" 
					:key="index1">{{item1.category_name}}</view>
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	//下拉选择品牌页面
	import config from '@/api/config.js';
	import LetterList from '@/pages/common/letterList.vue';
	import {request} from '@/api/reques.js'
	let _this;
	export default{
		data(){
			return{
				hot:[],
				cars:[],
				letter:'',
				off:false,
				series:[],
				model:{},
				mark:false,
			}
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		components:{
			LetterList,
		},
		created() {
			this.getBrand()
			_this = this
		},
		onLoad(option) {
			this.mark = option.bool == "true" ? true : "";
		},
		watch:{
			"$store.state.letter":(v)=>{
				_this.letter = 'letter'+v;
			}
		},
		methods:{
			// 获取品牌列表
			getBrand(){
				request('/index/getBrandsList',{},"POST")
				.then((res)=>{
					this.hot = res.data.data.is_hot;
					this.cars = res.data.data;
					//console.log(this.hot)
				})
			},
			// 获取车系
			handleCategory(id,value){
				this.model = value;
				request('/index/getBrandsList',{
					brands_id:id
				},"POST")
				.then((res)=>{
					this.series = res.data.data
					this.off = !this.off
				})
			},
			handleCars(item){
				let carType = {
					brandId:this.model.category_id,
					brandName:this.model.category_name,
					categoryId:item.category_id,
					categoryName:item.category_name,
				}
				this.$store.commit("changeCars",carType);
				this.off = false
				console.log(2)
				uni.navigateBack({
				    delta: 1
				});
				
			},
			scroll(){
				this.$store.state.letter = ""
			},
			touchMove(){
				console.log(1)
			}
				
			
		}
		
	}
</script>

<style scoped lang="stylus">
	.brand
		position absolute
		width 100%
		background-color #FFFFFF
		
		.secon
			width 60% !important
			transition .5s
		.secondary
			position fixed
			top 0
			right 0
			z-index 20
			box-shadow 0 0 20rpx 0 #CCCCCC
			width 0
			height 100%
			background #FFFFFF
			transition .5s
			.sec-title
				padding 0 20rpx
				background-color #F4F4F4
				color #222222
				line-height 70rpx
			.sec-scroll
				height 100vh
				.sec-list
					padding 0 30rpx
					border-bottom 1rpx solid #F4F4F4
					font-size 26rpx
					line-height 70rpx
					color #444444
		
		.scroll-view
			height 100vh
			.brand-title
				padding-left 26rpx 
				background-color #E6E6E6
				font-size 26rpx
				color #FF2929
			.brand-content
				padding 30rpx
				flex-wrap wrap
				.flex-item
					display flex
					flex-direction column
					align-items center
					width 20%
					image
						width 90rpx
						height 60rpx
					.text
						overflow hidden
						width 100%
						text-align center
						text-overflow ellipsis
						white-space nowrap
						line-height 70rpx
						color #222222
						font-size 24rpx		
			.brand-list .letter	
				padding-left 26rpx
				background-color #E6E6E6
				font-size 26rpx
				color #444444
			.brand-list .letter-car	.flex-item
				padding 15rpx 20rpx
				border-bottom 1rpx #E6E6E6 solid
				color #333333
		
</style>
