<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view class="goods-list">
			<view class="nav-list uni-flex uni-row" @tap="clickList">
				<view class="flex-item" data-id="one" :class="{navItem:show1}">在售车源</view>
				<view class="flex-item" data-id="two" :class="{navItem:show2}">精品推荐</view>
				<view class="flex-item" data-id="three" :class="{navItem:show3}">成交历史</view>
			</view>
			<view class="data-none" v-if="carLists.length == 0">暂无相关数据!</view>
			<view 
				class="list" 
				v-else-if="show1 || show2 || show3" 
				v-for="(item,index) in carLists" 
				:key="index"
				@tap="handleDetail(item.goods_id,item.group_id_array,item.promotion_id)">
				<view class="list-imgs">
					<image 
						style="width: 100%; height: 100%;" 
						lazy-load="true" 
						@error="handleErr($event,index)"
						:src="item.pic_cover" 
						mode="scaleToFill"></image>
				</view>
				<view class="list-content">
					<view class="list-title">
						<text v-if="show2">荐</text>
						{{item.goods_name}}
					</view>
					<view class="date">{{item.introduction}}</view>
					<view class="uni-flex uni-row">
						<view class="flex-item" v-for="(label,idx) in item.label_arr" :key="idx">{{label}}</view>
					</view>
					<view class="price-list">
						<text class="market" v-if="show1">市场价</text>
						<text class="market clinch" v-if="show3">成交价</text>
						<text class="yikou" v-if="show2">一口价</text>
						<text class="price" v-if="show1 || show2">{{$c.changePrice(item.ys_price)}}万</text>
						<text class="price" v-if="show3">{{$c.changePrice(item.order_money)}}万</text>
						<!-- <text class="payment" v-if="show1">首付4.01万</text> -->
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	let _this = this;
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			carList:{
				type:Array
			},
			shopId:{
				type:Number
			}
		},
		data(){
			return{
				target:'',
				show1:true,
				show2:false,
				show3:false,
				carLists:[],
				list:[],
				page_index1:1,
				page_index2:1,
				page_count1:0,
				page_count2:0
			}
		},
		created() {
			_this = this;
		},
		watch:{
			carList(arr){
				_this.list = arr
				_this.carLists = arr
			}
		},
		methods:{
			clickList(e){
				if(!e.target.dataset.id)return;
				let target = e.target.dataset.id;
				this.target = target;
				console.log(this.target)
				switch(this.target){
					case "one":
						this.show1 = true
						this.show2 = false
						this.show3 = false
						this.carLists = this.list
						break;
					case "two":
						this.show2 = true
						this.show1 = false
						this.show3 = false
						this.getStoreCarList();
						break;
					case "three":
						this.show3 = true
						this.show2 = false
						this.show1 = false
						this.getShopDealCarList()
						break;
					default:
						this.show1 = false
						this.show2 = false
						this.show3 = false
				}
			},
			handleErr(e,index){
				if(e.type=='error'){
					this.carList[index].pic_cover = "../../../static/images/list.jpg"
				}	
			},
			getStoreCarList(page_index1 = 1){
				this.carLists = [];
				request("/shop/getShopCarGoodsList",{
					shop_id:this.shopId,
					page_index:page_index1,
					page_size:10,
					is_recommend:1
				},"POST")
				.then((res)=>{
					let data = res.data.data.data;
					if(page_index1 > 1){
						data = this.carList.concat(data)
					}
					this.carLists = data;
					this.page_count1 = res.data.data.page_count;
				})
			},
			getShopDealCarList(page_index2 = 1){
				this.carLists = [];
				request("/shop/getShopDealCarGoodsList",{
					shop_id:this.shopId,
					page_index:page_index2,
					page_size:10,
				},"POST")
				.then((res)=>{
					let data = res.data.data.data;
					if(page_index2 > 1){
						data = this.carList.concat(data)
					}
					data.forEach((val) => {
						if(val.goods_id !== null || val.goods_id == ""){
							_this.carLists.push(val)
						}
					})
					this.page_count2 = res.data.data.page_count;
				})
			},
			handleDetail(goodsId,group,promotion_id){
				let groupId = parseInt(String(group).substr(0,1));
				this.$c.detailsJump(goodsId,groupId,promotion_id)
			},
			loadData() {
				let _this = this;
				if(show2){
					if (_this.page_index1 < _this.page_count1) {
						_this.page_index1++;
						_this.getStoreCarList(_this.page_index1);
					}else{
						return
					}
				}else if(show3){
					if (_this.page_index2 < _this.page_count2) {
						_this.page_index2++;
						_this.getShopDealCarList(_this.page_index2);
					}else{
						return
					}
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	.goods-list
		padding 90rpx 25rpx 25rpx 25rpx
		.nav-list 
			padding  0 70rpx
			justify-content space-between
			.navItem
				border-bottom 5rpx #0657A6 solid
				color #0657A6
			.flex-item
				width 25%
				text-align center
				font-size 28rpx
				color #222222	
		.data-none
			margin-top 40rpx
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			color #222222
		.list:nth-last-child(1)
			margin-bottom 80rpx
		.list
			width 100%
			margin-top 40rpx
			border-radius 15rpx
			box-shadow 0 0 10rpx 0 #CCCCCC
			.list-imgs
				overflow hidden
				display inline-block
				width 244rpx
				height 229rpx
				border-radius 10rpx
				vertical-align middle
			.list-content
				display inline-block
				width 435rpx
				height 100%
				margin-left 3%
				vertical-align middle
				.list-title
					color #222222
					text
						padding 0 8rpx
						margin-right 10rpx
						display inline-block
						border-radius 5rpx
						background-color #FF2F2F
						font-size 24rpx
						color #FFFFFF
				.date
					font-size 22rpx
					color #888888
				.flex-item
					padding 0 10rpx
					margin-right 25rpx
					border 1rpx #0657A6 solid
					border-radius 10rpx
					font-size 20rpx
					color #0657A6
					text-align center	
				.price-list text
					margin-right 10rpx
				.price-list .price
					font-size 30rpx
					color #FF1A1A
					font-weight bold
				.price-list .market
					font-size 22rpx
					color #777777
				.price-list .yikou
					padding 5rpx
					background-color #FF2727
					border-radius 5rpx
					color #FFFFFF
					font-size 22rpx
				.price-list	.payment
					font-size 24rpx
					color #FF1A1A
</style>
