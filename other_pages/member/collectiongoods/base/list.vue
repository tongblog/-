<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view v-if="goodsList.length > 0">
			<view class="list" @tap="handleDetail(item.goods_id,item.goods_group_id,item.promotion_id,item.goods_group_id)" v-for="(item, index) in goodsList" :key="index">
				<view class="list-imgs">
					<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item.pic_cover_micro" mode="scaleToFill"></image>
				</view>
				<view class="list-content">
					<view class="title">{{ item.goods_name }}</view>
					<view class="date">{{ item.introduction }}</view>

					<view class="uni-flex uni-row">
						<view class="flex-item" v-for="(item2, index2) in goodsList[index].label_arr" :key="index2">{{ item2 }}</view>
					</view>
					<view class="price">
						<text class="fixed-price" v-if="item.group_name != ''">{{ item.group_name }}</text>
						{{ $c.changePrice(item.log_price) }}万
					</view>
					<view class="cancel-fav" @click.stop="cancelFavorites(item.fav_id)">取消收藏</view>
				</view>
				<image v-if="item.state != 1" class="img" src="../../../../static/images/yisx.jpg" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="data-none" v-else>暂无相关数据!</view>
		
	</scroll-view>
</template>

<script>
// 首页商品
import { request } from '@/api/reques.js';
import * as MemberApi from '@/api/member/member.js';
import { goWindow } from '@/api/navigate.js'; // 页面跳转
import config from '@/api/config.js';
export default {
	data() {
		return {
			goodsList: [],
			page_index: 1,
			page_count: 0
		};
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
		handleDetail(goodsId,group,promotion_id = 0,goods_group_id=0){
			let groupId = parseInt(String(group).substr(0,1));
			this.$c.detailsJump(goodsId,groupId,promotion_id,goods_group_id)	
		},

		myCollection(page_index) {
			MemberApi.myCollection({
				page_index: page_index,
				type: 'goods'
			}).then(res => {
				uni.showLoading({
					'title' : '加载中'
				})
				let data = res.data.data;
				for (let index in data) {
					data[index].pic_cover_micro = config.domain + data[index].pic_cover_micro;
				}
				if(page_index > 1){
					data = this.goodsList.concat(data)
				}
				setTimeout(()=>{
					this.goodsList = data;
					this.page_count = res.data.page_count;
					uni.hideLoading()
				},500)
			});
		},
		cancelFavorites(fav_id) {
			let _this = this;
			MemberApi.cancelFavorites({
				fav_id: fav_id,
				fav_type: 'goods'
			}).then(res => {
				console.log(res);
				if (res.data > 0) {
					uni.showToast({
						title: '取消收藏成功',
						duration: 2000,
						success: () => {
							setTimeout(() => {
								_this.myCollection(1);
							}, 2000);
						}
					});
				} else {
					uni.showToast({
						title: '取消收藏失败',
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
				this.goodsList[index].goods_image = '/static/images/list.jpg';
			}
		}
	}
};
</script>

<style scoped>
scroll-view{
	height:100vh
}
.data-none {
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
}
.list {
	position: relative;
	padding: 24rpx;
	border-bottom: 10rpx #f4f4f4 solid;
}
.list .img{
	position: absolute;
	top: 0;
	bottom: 0;
	right: 25rpx;
	margin: auto;
	z-index: 2;
	width: 150rpx;
	height: 80rpx;
}
.list .list-imgs {
	overflow: hidden;
	display: inline-block;
	width: 256rpx;
	height: 218rpx;
	border-radius: 10rpx;
}
.list .list-content {
	display: inline-block;
	width: 418rpx;
	height: 100%;
	margin-left: 3%;
	position: relative;
}

.list-content .title {
	height: 100rpx;
	color: #222222;
}

.list-content .date {
	font-size: 22rpx;
	color: #888888;
}
.list-content .uni-flex .flex-item {
	padding: 0 10rpx;
	margin-right: 25rpx;
	border: 1rpx #0657a6 solid;
	border-radius: 10rpx;
	font-size: 20rpx;
	color: #0657a6;
	text-align: center;
}

.list-content .price {
	font-size: 30rpx;
	color: #ff1a1a;
	font-weight: bold;
}
.price .fixed-price {
	padding: 5rpx 8rpx;
	margin-right: 10rpx;
	background-color: #ff2727;
	border-radius: 4rpx;
	font-size: 22rpx;
	color: #ffffff;
}
.list-content .cancel-fav {
	border: 1px solid #ccc;
	border-radius: 10rpx;
	padding: 4rpx 12rpx;
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 21rpx;
	color: #ccc;
}
</style>
