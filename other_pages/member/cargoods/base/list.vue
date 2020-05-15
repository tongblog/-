<template>
	<scroll-view @scrolltolower="loadData" scroll-y="true">
		<view v-if="data_list.length > 0 || data_lists.length > 0">
			<!-- 已上架 -->
			<view v-if="status === 1 ? true : false">
				<checkbox-group @change="checkboxChange">
					<label style="padding-right: 0;" v-for="(item, index) in data_list" :key="index">
						<view class="list">
							<view class="check">
								<checkbox style="transform:scale(0.6)" color="#006BB3" :checked="ischecked" :value="item.goods_id" />
							</view>
							<view class="list-imgs list-images">
								<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item
								.pic_cover" mode="scaleToFill"></image>
							</view>
							<view 
								class="list-content list-con" 
								@tap.stop="handleDetail(item.goods_id,item.new_group_id,item.promotion_id,item.state)">
								<view class="title">{{ item.goods_name }}</view>
								<view class="date">{{ item.introduction }}</view>
								<view class="uni-flex uni-row">
									<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{ item2 }}</view>
								</view>
								
								<view class="price">
									金额：{{ $c.changePrice(item.ys_price) }}万
								</view>
								
								<!-- <view class="cancel-fav" v-on:click="cancelFavorites(item.fav_id)">取消收藏</view> -->
							</view>
							
						</view>
					</label>
					
				</checkbox-group>
				<view class="check-all">
					<checkbox-group class="shelves" @change="shelvesChange">
						<label>
							<checkbox value="99" color="#006BB3" :checked="allchecked" style="transform:scale(0.6)" />全选
						</label>
					</checkbox-group>
					<view class="shelves-btn" v-if="status == 1">
						<button 
							style="background-color: #006BB3;" 
							size="mini" 
							type="primary"
							@tap="handleShelves">下架</button>
					</view>
				</view>
			</view>	
			
			<!-- 已下架 -->
			<view v-if="status === 0 ? true : false">
				<checkbox-group @change="changeCheckbox">
					<label style="padding-right: 0;" v-for="(item, index) in data_list" :key="index">
						<view class="list">
							<view class="check">
								<checkbox style="transform:scale(0.6)" color="#006BB3" :checked="single" :value="item.goods_id" />
							</view>
							<view class="list-imgs list-images">
								<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item
								.pic_cover" mode="scaleToFill"></image>
							</view>
							<view 
								class="list-content list-con" 
								@tap.stop="handleDetail(item.goods_id,item.new_group_id,item.promotion_id,item.state)">
								<view class="title">{{ item.goods_name }}</view>
								<view class="date">{{ item.introduction }}</view>
								<view class="uni-flex uni-row">
									<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{ item2 }}</view>
								</view>
								
								<view class="price">
									金额：{{ $c.changePrice(item.ys_price) }}万
								</view>
								
								<!-- <view class="cancel-fav" v-on:click="cancelFavorites(item.fav_id)">取消收藏</view> -->
							</view>
							
						</view>
					</label>
					
				</checkbox-group>
				<view class="check-all">
					<checkbox-group class="shelves" @change="changeShelves">
						<label>
							<checkbox value="99" color="#006BB3" :checked="checkedAll" style="transform:scale(0.6)" />全选
						</label>
					</checkbox-group>
				
					<view class="shelves-btn" v-if="status == 0">
						<button 
							style="background-color: #006BB3;" 
							size="mini" 
							type="primary"
							@tap="handlePutaway">上架</button>
					</view>
				</view>
			</view>
			
			<!-- 审核，拒绝，已出售 -->
			<view v-if="status === 0 ? false : status === 1 ? false : status === -1 ? false : true">
				<view class="list" v-for="(item, index) in data_list" :key="index">
					<view class="list-imgs">
						<image style="width: 100%; height: 100%;" lazy-load="true" @error="handleErr($event, index)" :src="item
						.pic_cover" mode="scaleToFill"></image>
					</view>
					<view class="list-content" :class="{borderBom:status == 3}" @tap="handleDetail(item.goods_id,item.new_group_id,item.promotion_id,item.state)">
						<view class="title">{{ item.goods_name }}</view>
						<view class="date">{{ item.introduction }}</view>
						<view class="uni-flex uni-row">
							<view class="flex-item" v-for="(item2, index2) in item.label_arr" :key="index2">{{ item2 }}</view>
						</view>
						
						<view class="price">
							金额：{{ $c.changePrice(item.ys_price) }}万
						</view>
					</view>
					<view class="check-detail" v-if="status == 3" @tap="checkDetail(item.goods_id)">
						<view class="detail">
							查看详情
						</view>
					</view>
					
				</view>
			</view>
			<!-- 直卖议价 -->
			<view v-if="status === -1 ? true : false">
				<view class="list" v-for="(item, index) in data_lists" :key="index" @tap="handleDetail(item.goods_id,item.group_id,item.promotion_id,item.status)">
					<view class="list-imgs">
						<image 
							style="width: 100%; height: 100%;" 
							lazy-load="true" 
							@error="handleErr($event, index)" 
							:src="item.goods_info.pic_cover | filterImg" mode="scaleToFill"></image>
					</view>
					<view class="list-content" :class="{borderBom:status == -1}">
						<view class="title">{{ item.goods_info.goods_name }}</view>
						<view class="date">{{ item.goods_info.introduction }}</view>
						<view class="uni-flex uni-row">
							<view class="flex-item" v-for="(item2, index2) in item.goods_info.label_arr" :key="index2">{{ item2 }}</view>
						</view>
						
						<view class="price" :class="{price1:status == -1}">
							金额：{{ $c.changePrice(item.goods_info.price) }}万
						</view>
						<view class="price" v-if="status == -1">
							申请优惠车价：<text>{{ $c.changePrice(item.offer_price) }}万</text>
						</view>
						<!-- <view class="cancel-fav" v-on:click="cancelFavorites(item.fav_id)">取消收藏</view> -->
					</view>
					<view class="btns" v-if="status == -1 && item.status == 0">
						<view class="refuse" @tap.stop="handleAccept(item.id,index)">
							接受
						</view>
						<view class="refuse accept" @tap.stop="handleRefused(item.id,index)">
							拒绝此价
						</view>
					</view>
				</view>
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
			data_list: [],
			data_lists: [],
			page_index: 1,
			page_count: 0,
			ischecked:false,  // 下架
			checkedArr:[],
			allchecked:false,
			single:false,   // 上架
			checkedAll:false,
			shelvesArr:[],
		};
	},
	props: {
		options: {
			type: Object,
			default: () => {
				return {};
			}
		},
		status: {
			type: Number,
			default: -1
		}
	},
	watch: {
		status:{
			handler(e){
				let _this = this;
				_this.page_idnex = 1;
				_this.status = e;
				_this.ischecked = false;
				_this.allchecked = false;
				_this.checkedArr = [];
				_this.single = false;   // 上架
				_this.checkedAll = false;
				_this.shelvesArr = [];
				_this.getData(_this.page_idnex)
			},
		},
	},
	filters:{
		filterImg(url){
			if(url){
				return config.domain + url
			}
		}
	},
	methods: {
		// 页面跳转
		handleDetail(goodsId,group,promotion_id = 0,state){
			if(state == 2){
				this.$c.msg("商品审核中")
			}else if(state == 3){
				this.$c.msg("审核未通过,请重新发布")
			}else{
				let groupId = parseInt(String(group).substr(0,1));
				this.$c.detailsJump(goodsId,groupId,promotion_id)
			}
			
		},
		

		getData(page_index = 1) {
			let _this = this;
			MemberApi.getUserCarGoodsList({
				page_index: page_index,
				state: _this.status == -1 ? "" : _this.status,
				get_type: _this.status == -1 ? 3 : 0,
			})
			.then(res => {
				if(res.data == null){
					this.data_list = [];
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				let data = res.data.data;
				/* for (let index in data) {
					data[index].pic_cover = config.domain + data[index].pic_cover;
					console.log(data)
				} */
				if (page_index > 1 && _this.status !== -1) {
					data = _this.data_list.concat(data);
				}else if(page_index > 1 && _this.status === -1){
					data = _this.data_lists.concat(data);
				}
				setTimeout(() => {
					if(_this.status === -1){
						_this.data_list = [];
						_this.data_lists = data;
					}else{
						_this.data_lists = [];
						_this.data_list = data;
					}
					console.log(data)
					_this.page_count = res.data.page_count;
					uni.hideLoading();
				}, 500);
					
				
			});
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
		handleErr(e, index) {
			if (e.type == 'error') {
				this.data_list[index].pic_cover = '/static/images/list.jpg';
			}
		},
		// 接受议价
		handleAccept(id,index){
			console.log(index)
			let _this = this;
			MemberApi.agreeyj({
				offer_id:id
			})
			.then((res)=>{
				uni.showLoading({
					title: '加载中'
				});
				if(res.code > 0){
					uni.hideLoading();
					uni.showToast({
						title: '已接受',
						duration: 2000,
						success: () => {
							_this.data_lists[index].status = 1
							_this.data_lists[index].status_name = '同意'
						}
					});
				}
			})
		},
		// 拒绝议价
		handleRefused(id){
			let _this = this;
			MemberApi.cancelyj({
				offer_id:id
			})
			.then((res)=>{
				uni.showLoading({
					title: '加载中'
				});
				if(res.code > 0){
					uni.hideLoading();
					uni.showToast({
						title: '已拒绝',
						duration: 2000,
						success: () => {
							_this.data_lists[index].status = 2
							_this.data_lists[index].status_name = '拒绝'
						}
					});
				}
			})
			
		},
		// 查看详情
		checkDetail(id){
			goWindow(`/other_pages/rejectOptions/rejectOptions?id=${id}`);
		},
		// 选择车源下架
		checkboxChange(e){
			console.log(e.detail.value)
			this.checkedArr = e.detail.value;
			//this.allchecked = false;
			if(this.checkedArr.length > 0 && this.checkedArr.length == this.data_list.length){
				this.allchecked = true;
			}else{
				this.allchecked = false;
			}
		},
		// 全选下架
		shelvesChange(e){
			let value = e.detail.value
			if(value.length > 0){
				this.allchecked = true;
				this.data_list.forEach((item) => {
					//console.log(item)
					let itemId = String(item.goods_id);
					if(!this.checkedArr.includes(itemId)){
						this.checkedArr.push(itemId);
					}
				})
				this.ischecked = true;
			}else{
				this.ischecked = false;
				this.checkedArr = [];
			}
		},
		// 下架
		handleShelves(){
			let _this = this;
			uni.showModal({
			    title: '提示',
			    content: '重新上架需再次审核，确认下架吗？',
				confirmText: '下架',
				confirmColor: '#0657A6',
			    success: function (res) {
			        if (res.confirm) {
						_this.$c.showLoading('加载中')
			           MemberApi.goodsOffline({
			           	goods_ids:_this.checkedArr.join(","),
			           })
			           .then(res => {
							if(res.code > 0){
								setTimeout(() => {
									_this.$c.hideLoading();
									_this.getData(_this.page_idnex)
								},500)
								
							}
			           })
			        } else if (res.cancel) {
						_this.$c.hideLoading();
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		// 选择车源上架
		changeCheckbox(e){
			//console.log(e.detail.value)
			this.shelvesArr = e.detail.value;
			if(this.shelvesArr.length > 0 && this.shelvesArr.length == this.data_list.length){
				this.checkedAll = true;
			}else{
				this.checkedAll = false;
			}
		},
		// 全选上架
		changeShelves(e){
			let value = e.detail.value
			if(value.length > 0){
				this.checkedAll = true;
				this.data_list.forEach((item) => {
					//console.log(item)
					let itemId = String(item.goods_id);
					if(!this.shelvesArr.includes(itemId)){
						this.shelvesArr.push(itemId);
					}
				})
				this.single = true;
			}else{
				this.single = false;
				this.shelvesArr = [];
			}
		},
		
		// 上架
		handlePutaway(){
			let _this = this;
			console.log(_this.shelvesArr)
			MemberApi.goodsOnline({
				goods_ids:_this.checkedArr.join(","),
			})
			.then(res => {
				_this.$c.showLoading('加载中');
				if(res.code > 0){
					setTimeout(() => {
						_this.$c.hideLoading();
						_this.$c.msg("重新审核中，请耐心等待")
						_this.getData(_this.page_idnex)
					},500)
					
				}else{
					_this.$c.hideLoading();
					_this.$c.msg("上架失败")
				}
			})
			
			
		}
	}
}
</script>

<style scoped>
scroll-view {
	height: 100vh;
	
}
.data-none {
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
}
button[size=mini] {
display: inline-block;
line-height: 1.8;
font-size: 13px;
padding: 0 1em;
}
.check-all{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	justify-content: space-between;
}
.check-all .shelves{
	width: 20%;
}
.check-all .shelves-btn{
	width: 16%;
}				
.list {
	background: #fff;
	border-bottom: 10rpx solid #F4F4F4;
	padding: 20rpx 20rpx 0 20rpx;
}
.list .check{
	display: inline-block;
	width: 60rpx;
	vertical-align: middle;
}

.list .list-imgs {
	overflow: hidden;
	display: inline-block;
	width: 256rpx;
	height: 218rpx;
	border-radius: 10rpx;
	vertical-align: middle;
}
.list .list-images{
	width: 218rpx !important;
}
.list .borderBom{
	border-bottom: 1rpx #CCCCCC solid;
}
.list .check-detail .detail{
	padding: 5rpx 10rpx;
	text-align: right;
	color: #006BB3;
}
.list .btns{
	overflow:hidden;
	padding: 10rpx;
}

.list .btns .refuse{
	float: right;
	display: inline-block;
	width: 120rpx;
	border: 1px solid #006BB3;
	border-radius: 20rpx;
	color: #006BB3;
	font-size: 22rpx;
	text-align: center;
}
.list .btns .accept{
	margin-right: 20rpx;
	border: 1px solid #FF1A1A !important;
	color: #FF1A1A !important;
}
.list .list-content {
	position: relative;
	display: inline-block;
	width: 418rpx;
	height: 218rpx;
	margin-left: 3%;
	vertical-align: middle;
}
.list .list-con{
	width: 410rpx !important;
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
.list-content .price1{
	position: absolute;
	bottom: 18%;
	right: 0;
}
.list-content .price {
	font-size: 24rpx;
	color: #666;
	text-align: right;
	font-weight: bold;
}
.list-content .price text{
	color: #FF1A1A;
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
.list .list-action{
	width: 100%;
}
.list .list-action .action-close{
	border: 1px solid #ccc;
	color: #ccc;
	border-radius: 50rpx;
	font-size: 24rpx;
	margin-left: 78%;
	width: 20%;
	display: inline-block;
	text-align: center;
}
</style>
