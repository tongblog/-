<template>
	<scroll-view v-if="shop_list.length > 0" @scrolltolower="loadData" scroll-y="true">
		<view class="store-list uni-flex uni-column" v-for="(item, index) in shop_list" :key="index">
			<view class="store flex-item uni-flex uni-row" @tap="handleStore(item.shop_id)" >
				<view class="store-img flex-item"><image :src="item.shop_logo" @error="handleErr($event, index)" mode="scaleToFill"></image></view>
				<view class="store-content">
					<view class="store-title">{{ item.shop_name }}</view>
					<text v-if="true" class="mark">{{ item.type_name }}</text>
					<uni-rate margin="2" max="5" size="15" :value="item.shop_servicecredit"></uni-rate>
					<text class="cancel-fav" @tap.stop="cancelFavorites(item.fav_id)">取消关注</text>
					<view class="store-phone">
						<icon class="iconfont icon-dianpudianhua"></icon>
						<text>门店电话:</text>
						<text>{{ item.shop_phone }}</text>
					</view>
					<view class="store-address">
						<icon class="iconfont icon-dingwei"></icon>
						<text>门店地址:</text>
						<view class="address">{{ item.shop_address }}</view>
					</view>
				</view>
			</view>
		</view>
		
	</scroll-view>
	<view class="data-none" v-else>暂无相关数据!</view>
</template>

<script>
// 首页商品
import uniRate from "@/components/uni-rate/uni-rate.vue"
import { request } from '@/api/reques.js';
import config from '@/api/config.js';
import * as MemberApi from '@/api/member/member.js';
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	data() {
		return {
			shop_list: [],
			page_index: 1,
			page_count: 0
		};
	},

	components: {
		uniLoadMore,
		uniRate
	},

	props: {
		options: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	created() {
		this.myCollection(this.page_index);
	},
	
	methods: {
		// 页面跳转
		handleStore(id) {
			goWindow('/pages/storeDetails/storeDetails?id=',id)
		},

		myCollection(page_index) {
			
			MemberApi.myCollection({
				page_index: page_index,
				type: 'shop'
			}).then(res => {
				uni.showLoading({
					'title' : '加载中'
				})
				let data = res.data.data;
				console.log(data)
				for (let index in data) {
					data[index].shop_logo = config.domain + data[index].shop_logo;
					data[index].type_name = data[index].shop_type == 1 ? '个人店铺' : '企业店铺';
				}
				if(page_index > 1){
					data = this.shop_list.concat(data)
				}
				setTimeout(()=>{
					this.shop_list = data
					this.page_count = res.data.page_count
					uni.hideLoading()
				},500)
			});
		},
		cancelFavorites(fav_id) {
			let _this = this;
			MemberApi.cancelFavorites({
				fav_id: fav_id,
				fav_type: 'shop'
			}).then(res => {
				console.log(res);
				if (res.data > 0) {
					uni.showToast({
						title: '取消关注成功',
						duration: 2000,
						success: () => {
							setTimeout(() => {
								_this.myCollection(1);
							}, 2000);
						}
					});
				} else {
					uni.showToast({
						title: '取消关注失败',
						icon: 'none',
						duration: 2000,
						success: () => {}
					});
				}
			});
		},

		loadData(e) {
			let _this = this
			if (_this.page_index < _this.page_count) {
				_this.page_index++;
			}else{
				return
			}
			_this.myCollection(_this.page_index);
		},
		handleErr(e, index) {
			if (e.type == 'error') {
				this.shop_list[index].shop_logo = config.domain + 'upload/applet/touxiang.jpg';
			}
		}
	}
};
</script>

<style scoped lang="stylus">
scroll-view
	height 100vh
.data-none
	text-align center
	height 100rpx
	line-height 100rpx
.store-list
	border-bottom 10rpx #F4F4F4 solid
	.store
		height 225rpx
		padding 24rpx
		justify-content space-between
		// background-color #CCCCCC
		.store-img
			overflow hidden
			width 35%
			height 100%
			border-radius 5rpx
			image
				width 100%
				height 100%
		.store-content
			position relative
			width 63%
			.store-title
				display inline-block
				font-size 26rpx
				font-weight bold
				color #222222
			.mark
				display inline-block
				width 102rpx
				margin-left 20rpx
				border-radius 8rpx
				background-color #FFF2C5
				line-height 34rpx
				text-align center
				color #FF8D28
				font-size 20rpx
			.cancel-fav
				position absolute
				right 0
				top 45rpx
				border 1px solid #ccc
				border-radius 10rpx
				padding 2rpx 9rpx
				font-size 21rpx
				color #ccc	
		.store-phone
			line-height 0rpx
			font-size 25rpx
			color #444444
			text
				padding-left 8rpx
			icon
				font-size 23rpx
				color #444444
		.store-address
			font-size 25rpx
			color #444444
			line-height 0rpx
			text
				display inline-block
				padding-left 8rpx
			icon
				font-size 23rpx
				color #444444
			.address
				float right
				display inline-block
				margin-top 18rpx
				width 300rpx
				font-size 25rpx
		
</style>
