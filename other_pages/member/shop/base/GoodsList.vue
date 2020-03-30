<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view class="goods-list">
			<view class="nav-list uni-flex uni-row" @tap="clickList">
				<view class="flex-item" data-id="one" :class="{ navItem: show1 }">在售车源</view>
				<view class="flex-item" data-id="two" :class="{ navItem: show2 }">精品推荐</view>
				<view class="flex-item" data-id="three" :class="{ navItem: show3 }">成交历史</view>
			</view>

			<view v-if="data_list.length > 0">
				<!-- 在售车源 -->
				<checkbox-group 
					style="padding-bottom: 40rpx;" 
					v-if="show1"
					@change="changeCheckbox">
					<label style="padding-right: 0;" v-for="(item, index) in data_list" :key="index">
						<view class="check">
							<checkbox style="transform:scale(0.6)" color="#006BB3" :checked="isChecked" :value="item.goods_id" />
						</view>
						<view
							class="list list-ul" 
							@tap="handleDetail(item.goods_id,item.group_id_array,promotion_id)">
							<view class="list-imgs"><image style="width: 100%; height: 100%;" :src="item.pic_cover" @error="handleErr($event, index)"  mode="scaleToFill"></image></view>
							<view class="list-content list-con">
								<view class="list-title">
									{{item.goods_name}}
								</view>
								<view class="date">{{item.introduction}}</view>
								<view class="uni-flex uni-row" >
									<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{item2}}</view>
								</view>
								<view class="price-list">
									<text class="market" v-if="show1">市场价</text>
									<text class="price">{{type == 3 ? $c.changePrice(item.order_money): $c.changePrice(item.ys_price)}}万</text>
									<!-- <text class="payment">首付4.01万</text> -->
								</view>
							</view>
						</view>
						
					</label>
					
				</checkbox-group>
				
				<!-- 精品推荐 -->
				<checkbox-group
					style="padding-bottom: 40rpx;" 
					v-if="show2"
					@change="checkboxChange">
					<label style="padding-right: 0;" v-for="(item, index) in data_list" :key="index">
						<view class="check">
							<checkbox style="transform:scale(0.6)" color="#006BB3" :checked="checkedIs" :value="item.goods_id"/>
						</view>
						<view
							class="list list-ul" 
							v-if="show2" 
							@tap="handleDetail(item.goods_id,item.group_id_array,promotion_id)">
							<view class="list-imgs"><image style="width: 100%; height: 100%;" :src="item.pic_cover" @error="handleErr($event, index)"  mode="scaleToFill"></image></view>
							<view class="list-content list-con">
								<view class="list-title">
									<text v-if="show2">荐</text>
									{{item.goods_name}}
								</view>
								<view class="date">{{item.introduction}}</view>
								<view class="uni-flex uni-row" >
									<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{item2}}</view>
								</view>
								<view class="price-list">
									<text class="yikou" v-if="show2">一口价</text>
									<text class="price">{{type == 3 ? $c.changePrice(item.order_money): $c.changePrice(item.ys_price)}}万</text>
									<!-- <text class="payment">首付4.01万</text> -->
								</view>
							</view>
						</view>
						
					</label>
					
				</checkbox-group>
				
				<!-- 成交历史 -->
				<view
					class="list" 
					v-if="show3" 
					@tap="handleDetail(item.goods_id,item.group_id_array,promotion_id)"
					v-for="(item, index) in data_list" :key="index">
					<view class="list-imgs"><image style="width: 100%; height: 100%;" :src="item.pic_cover" @error="handleErr($event, index)"  mode="scaleToFill"></image></view>
					<view class="list-content">
						<view class="list-title">
							<text v-if="show2">荐</text>
							{{item.goods_name}}
						</view>
						<view class="date">{{item.introduction}}</view>
						<view class="uni-flex uni-row" >
							<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{item2}}</view>
						</view>
						<view class="price-list">
							<text class="market clinch" v-if="show3">成交价</text>
							<text class="price">{{type == 3 ? $c.changePrice(item.order_money): $c.changePrice(item.ys_price)}}万</text>
							<!-- <text class="payment">首付4.01万</text> -->
						</view>
					</view>
				</view>
				
				<!-- 精品全选上架 -->
				<view class="check-all" v-if="show1">
					<checkbox-group class="shelves" @change="shelvesChange">
						<label style="padding-right: 0;color: #777;">
							<checkbox value="99" color="#006BB3" :checked="allChecked" style="transform:scale(0.6)" />全选
						</label>
					</checkbox-group>
					<view class="shelves-btn">
						<button 
							style="background-color: #006BB3;" 
							size="mini" 
							type="primary"
							@tap="handleRecommend">精品推荐</button>
					</view>
				</view>
				
				<!-- 精品全选下架 -->
				<view class="check-all" v-if="show2">
					<checkbox-group class="shelves" @change="changeShelves">
						<label style="padding-right: 0;color: #777;">
							<checkbox value="99" color="#006BB3" :checked="checkedAll" style="transform:scale(0.6)" />全选
						</label>
					</checkbox-group>
					<view class="shelves-btn">
						<button 
							style="background-color: #006BB3;" 
							size="mini" 
							type="primary"
							@tap="handleCancel">取消推荐</button>
					</view>
				</view>
			</view>
			<view v-else class="data-none">
					<image :src="'upload/applet/data-shop-none.png' | filterImg" mode="widthFix"></image>
					<view class="none-info">
						{{type == 3 ? '店铺还没有成交订单哦！' : '店铺还没有车辆哦，快去发布车辆吧！'}}
					</view>
					<button type="primary" @click="goUrl('/pages/sellcars/SellCars',2)" v-if="type != 3">去发布</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import * as ShopApi from '@/api/shop/shop.js';
import config from '@/api/config.js';
import * as MemberApi from '@/api/member/member.js';
export default {
	data() {
		return {
			target: '',
			show1: true,
			show2: false,
			show3: false,
			data_list: [],
			page_index: 1,
			page_count: 0,
			type: 1,
			isChecked:false,
			allChecked:false,
			checkedArr:[],
			checkedIs:false,
			checkedAll:false,
			shelvesArr:[],
		};
	},
	props: {
		shop_id: {
			type: Number,
			default: () => {
				return 0;
			}
		}
	},
	watch: {
		shop_id(e) {
			let _this = this;
			_this.isChecked = false;
			_this.allChecked = false;
			_this.checkedArr = [];
			_this.checkedIs = false;
			_this.checkedAll = false;
			_this.shelvesArr = [];
			_this.page_index = 1;
			_this.getData(_this.page_index);
		}
	},
	filters:{
		filterImg(value){
			if(value){
				return config.domain + value
			}
		},
	},
	methods: {
		clickList(e) {
			if(!e.target.dataset.id)return;
			let target = e.target.dataset.id;
			this.target = target;
			switch (this.target) {
				case 'one':
					this.show1 = true;
					this.show2 = false;
					this.show3 = false;
					this.type = 1;
					break;
				case 'two':
					this.show2 = true;
					this.show1 = false;
					this.show3 = false;
					this.type = 2;
					break;
				case 'three':
					this.show3 = true;
					this.show2 = false;
					this.show1 = false;
					this.type = 3;
					break;
				default:
					this.show1 = true;
			}
			this.page_index = 1;
			this.getData(this.page_index);
		},
		getData(page_index) {
			let _this = this;
			uni.showLoading({
				title: '加载中'
			});
			if (_this.type == 1 || _this.type == 2) {
				this.data_list = []
				ShopApi.getShopCarGoodsList({
					page_index: page_index,
					shop_id: _this.shop_id,
					is_recommend: _this.type == 2 ? 1 : 0
				}).then(res => {
					let data = res.data.data;
					/* for (let index in data) {
							data[index].pic_cover = config.domain + data[index].pic_cover;
					} */
					if (page_index > 1) {
						data = this.data_list.concat(data);
					}
					setTimeout(() => {
						this.data_list = data;
						console.log(this.data_list)
						this.page_count = res.data.page_count;
						uni.hideLoading(this.data_list);
					}, 500);
				});
			} else {
				ShopApi.getShopDealCarGoodsList({
					page_index: page_index,
					shop_id: _this.shop_id
				}).then(res => {
					let data = res.data.data;
					/* for (let index in data) {
						data[index].pic_cover = config.domain + data[index].pic_cover;
					} */
					console.log(data)
					if (page_index > 1) {
						data = this.data_list.concat(data);
					}
					setTimeout(() => {
						this.data_list = data;
						this.page_count = res.data.page_count;
						uni.hideLoading();
					}, 500);
				});
			}
		},
		loadData(e) {
			let _this = this;
			if (_this.page_index < _this.page_count) {
				_this.page_index++;
			} else {
				return;
			}
			_this.getData(_this.page_index);
		},
		goUrl(url,type=0){
			let _this = this;
			_this.$c.goUrl(url,type)
		},
		handleErr(e, index) {
			if (e.type == 'error') {
				this.data_list[index].pic_cover = '/static/images/list.jpg';
			}
		},
		handleDetail(goodsId,group,promotion_id){
			let groupId = parseInt(String(group).substr(0,1));
			this.$c.detailsJump(goodsId,groupId,promotion_id)
		},
		// 选择车源推荐
		changeCheckbox(e){
			console.log(e.detail.value)
			this.checkedArr = e.detail.value;
			if(this.checkedArr.length > 0 && this.checkedArr.length == this.data_list.length){
				this.allChecked = true;
			}else{
				this.allChecked = false;
			}
		},
		// 精品推荐全选
		shelvesChange(e){
			let value = e.detail.value
			if(value.length > 0){
				this.allChecked = true;
				this.data_list.forEach((item) => {
					//console.log(item)
					let itemId = String(item.goods_id);
					if(!this.checkedArr.includes(itemId)){
						this.checkedArr.push(itemId);
					}
				})
				this.isChecked = true;
				console.log(this.checkedArr)
			}else{
				this.isChecked = false;
				this.checkedArr = [];
			}
		},
		// 精品推荐
		handleRecommend(){
			let _this = this;
			console.log(_this.checkedArr)
			MemberApi.setGoodsRecommend({
				goods_ids:_this.checkedArr.join(","),
			})
			.then(res => {
				_this.$c.showLoading('加载中');
				if(res.code > 0){
					setTimeout(() => {
						_this.$c.hideLoading();
						_this.$c.msg("推荐成功")
						_this.getData(_this.page_idnex)
					},500)
					
				}else{
					_this.$c.hideLoading();
					_this.$c.msg("推荐失败")
				}
			})
			
			
		},
		//选择车源取消推荐
		checkboxChange(){
			this.shelvesArr = e.detail.value;
			if(this.shelvesArr.length > 0 && this.shelvesArr.length == this.data_list.length){
				this.checkedAll = true;
			}else{
				this.checkedAll = false;
			}
		},
		// 精品推荐全选下架
		changeShelves(e){
			let value = e.detail.value
			if(value.length > 0){
				this.shelvesArr = true;
				this.data_list.forEach((item) => {
					//console.log(item)
					let itemId = String(item.goods_id);
					if(!this.shelvesArr.includes(itemId)){
						this.shelvesArr.push(itemId);
					}
				})
				this.checkedIs = true;
			}else{
				this.checkedIs = false;
				this.shelvesArr = [];
			}
		},
		// 精品推荐下架
		handleCancel(){
			let _this = this;
			MemberApi.setGoodsCancel({
				goods_ids:_this.checkedArr.join(","),
			})
			.then(res => {
				_this.$c.showLoading('加载中');
				if(res.code > 0){
					setTimeout(() => {
						_this.$c.hideLoading();
						_this.$c.msg("下架成功")
						_this.getData(_this.page_idnex)
					},500)
					
				}else{
					_this.$c.hideLoading();
					_this.$c.msg("下架失败")
				}
			})
			
			
		},
	}
};
</script>

<style scoped lang="stylus">
.data-none
	padding 90rpx 25rpx 25rpx 25rpx
	text-align center
.data-none image
	width 40%
.data-none .none-info
	margin-top 20rpx
	font-size 24rpx
	color #666666
.data-none button
	width 80%
	margin 0 auto
	margin-top 20rpx
	background #0657A6
	color #ffffff
.goods-list
	padding 90rpx 25rpx 25rpx 25rpx
	.nav-list
		padding 0 70rpx 20rpx 70rpx
		justify-content space-between
		.navItem
			border-bottom 5rpx #0657A6 solid
			color #0657A6
		.flex-item
			width 20%
			text-align center
			font-size 28rpx
			color #222222
	.check-all
		display flex
		position fixed
		bottom -10rpx
		left 0
		right 0
		padding 0 22rpx
		border-top 1rpx #CCCCCC solid
		background-color #fff
		justify-content space-between
		.shelves
			width 20%
			height 50rpx
			padding 10rpx 0
		.shelves-btn
			width 24%
			button[size=mini]
				display inline-block
				margin 12rpx 0
				padding 0 1em
				line-height 1.8
				font-size 13px
	.check
		display inline-block
		vertical-align middle	
	.list-ul
		width 90% !important
	.list
		width 100%
		display inline-block
		margin 20rpx 0rpx
		vertical-align middle
		border-radius 15rpx
		box-shadow 0 0 10rpx 0 #CCCCCC
		.list-imgs
			overflow hidden
			display inline-block
			width 244rpx
			height 229rpx
			border-radius 10rpx
			vertical-align middle
		.list-con
			width 365rpx !important
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
			.price-list .payment
				font-size 24rpx
				color #FF1A1A
</style>
