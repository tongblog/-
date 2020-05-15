<template>
	<view>
		<view v-if="gzh" style="width:100%;position:absolute;top:0;z-index: 300;">
		  <official-account style="width:100%;"></official-account>
		</view>
		<home-header></home-header>
		<home-swiper :advList="advList"></home-swiper>
		<home-nav :scrollS="scrollS"></home-nav>
		<home-bidding></home-bidding>
		<home-tuijian :shopList="shopList"></home-tuijian>
		<sell 
			:class="{test:zhimai}"
			@handleOld="handleOld" 
			@handleCarType="handleCarType"
			@handleBrands="handleBrands"
			@handlePrice="handlePrice"
			@bindPickerChange1="bindPickerChange1"
			@bindPickerChange2="bindPickerChange2"
			@bindScreening="bindScreening"
			:status="status">
			<view class="uni-title">
				<view style="display: inline-block; width: 5rpx;height: 28rpx; margin-right: 15rpx; background-color: #007AFF;"></view> 
				路运直卖
			</view>
		</sell>
		<list
			:goodsList="goodsList" 
			:mark="mark"
			@handleAll="handleAll"></list>
			
	</view>
</template>

<script>
	// 首页
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import config from '@/api/config.js'
	import amap from '@/libs/amap-wx.js'
	import {getIndexData} from '@/api/home/home.js'
	import HomeHeader from './home/header';
	import HomeSwiper from './home/swiper';
	import HomeNav from "./home/nav";
	import HomeBidding from "./home/bidding";
	import HomeTuijian from "./home/tuijian";
	import Sell from "@/pages/common/sell.vue";
	import List from "./home/list.vue";
	var _this;
	export default {
		data() {
			return {
				amapPlugin:null,
				key:'c7bc0f3a90a4ed36a59449e25c53c9fb',
				addressName:'',
				advList:[],
				num:"",
				carId:"",
				brandId:"",
				categoryId:"",
				priceIndex:"",
				max:"",
				min:"",
				gather:false,
				pfId:"",
				qdId:"",
				min_ml:"",
				max_ml:"",
				scrollS:true,
				zhimai:false,
				shopList:[],
				goodsList:[],
				mark:false,
				page_index:1,
				page_count:0,
				status:0,
				gzh:true,
			}
		},
		onLoad() {
			_this = this;
			this.amapPlugin = new amap.AMapWX({
				key:this.key
			});
			this.getRegeo();
			/* this.$EventBus.$on('handleBrands',(data)=>{
				_this.goodsList = data;
			}) */
			setTimeout(()=>{
				_this.gzh = false
			},10000)
		},
		onShow() {
			this.$store.commit("changeGroup",3);
			this.$children[3].getIndexData();
			uni.showShareMenu({
				withShareTicket: true,
			})
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.page_index = 1;
			this.num = "";
			this.carId = "";
			this.brandId = "";
			this.categoryId = "",
			this.priceIndex = "";
			this.min = "";
			this.max = "";
			this.pfId = "";
			this.qdId = "";
			this.min_ml = "";
			this.max_ml = "";
			this.getRegeo();
			this.getIndexData();
			this.getGoodsList();
			this.$children[3].getIndexData();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 2000)
			
		},
		// 上拉加载
		onReachBottom(){
			if (_this.page_index < _this.page_count) {
				_this.page_index++;
				_this.getGoodsList(_this.page_index);
			}else{
				return
			}
			
		},
		// 页面滚动
		onPageScroll(e) {
			if(e.scrollTop > 600){
				setTimeout(()=>{
					this.scrollS = false;
					this.zhimai = true;
				},500)
			}else if(e.scrollTop < 500){
				setTimeout(()=>{
					this.scrollS = true;
					this.zhimai = false;
				},500)
				
				
			}
			
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'pages/index/index',
					imageUrl:config.domain + 'upload/applet/index-share.jpg'
				}
			}
			    
		},
		components:{
			HomeHeader,
			HomeSwiper,
			HomeNav,
			HomeBidding,
			HomeTuijian,
			Sell,
			List
		},
		created() {
			this.getIndexData();
		},
		watch:{
			"$store.state.city":(v)=>{
				_this.addressName = v;
				_this.num = "";
				_this.carId = "";
				_this.brandId = "";
				_this.categoryId = "",
				_this.priceIndex = "";
				_this.min = "";
				_this.max = "";
				_this.pfId = "";
				_this.qdId = "";
				_this.min_ml = "";
				_this.max_ml = "";
				_this.getGoodsList();
			},
			num(id){
				_this.num = id;
				_this.page_index = 1;
				_this.getGoodsList(_this.page_index);
			},
			carId(id){
				_this.carId = id;
				_this.page_index = 1;
				_this.getGoodsList(_this.page_index)
			},
			brandId(id){
				_this.brandId = id;
				_this.page_index = 1;
				_this.getGoodsList(_this.page_index)
			},
			priceIndex(id){
				_this.page_index = 1;
				_this.getGoodsList(_this.page_index);
				_this.priceIndex = ""
			},
			gather(bool){
				if(bool){
					_this.page_index = 1;
					_this.getGoodsList(_this.page_index);
					_this.gather = false;
				}
			}
			
		},
		methods: {
			//数据请求
			async getIndexData(){
				await getIndexData().then((res)=>{
					this.advList = res.data.adv_list.adv_index.adv_list;
					this.shopList = res.data.shop_list;
				});
					
			},
			
			
			// 获取商品列表
			getGoodsList(page_index = 1){
				this.$store.commit("changeGroup",3) 
				request("/index/getUsedCarGoodsList",{
					group_id:3,
					page_index:page_index,
					page_size:10,
					city_name:this.addressName,
					ai_sort:this.num,
					car_type:this.carId,
					brands_id:this.brandId,
					system_id:this.categoryId,
					min_price:this.min,
					max_price:this.max,
					pf_id:this.pfId,
					qd_id:this.qdId,
					min_ml:this.min_ml,
					max_ml:this.max_ml
				},"GET")
				.then((res)=>{
					let data = res.data.data.data
					if(page_index > 1){
						data = _this.goodsList.concat(data)
					}
					_this.goodsList = data;
					//console.log(_this.goodsList)
					_this.page_count = res.data.data.page_count;
					
				})
			},
			// 定位城市
			getRegeo() {   
				this.amapPlugin.getRegeo({  
					success: (data) => {
						this.addressName = data[0].regeocodeData.addressComponent.city || "";  // 城市
						this.$store.commit("changeCity",this.addressName);
						this.getGoodsList();
					},
					fail(rej){
						_this.getGoodsList();
						//console.log(rej)
					}
				});  
			},
			
			// 车龄最短,价格，最新上线
			handleOld(num){
				this.num = num
			},
			// 车辆类型筛选
			handleCarType(index){
				this.carId = parseInt(index);	
			},
			// 品牌筛选
			handleBrands(obj){
				_this.brandId = obj.brandId;
				_this.categoryId = obj.categoryId;
				_this.page_index = 1;
				_this.getGoodsList(_this.page_index)
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
			// 重置按钮
			bindPickerChange2(bol){
				if(bol){
					this.status = 2;
					this.gather = false;
					this.pfId = "";
					this.qdId = "";
					this.min_ml = "";
					this.max_ml = "";
					this.getGoodsList();
					this.$children[3].getIndexData();
				}
			},
			// 重置按钮11
			bindScreening(mark){
				if(mark){
					this.num = "";
					this.carId = "";
					this.brandId = "";
					this.categoryId = "";
					this.priceIndex = "";
					this.min = "";
					this.max = "";
					this.getGoodsList();
				}
			},
			// 点击获取全国数据
			handleAll(bool){
				if(bool){
					this.status = 1;
					this.addressName = "";
					this.num = "";
					this.carId = "";
					this.brandId = "";
					this.categoryId = "",
					this.priceIndex = "";
					this.min = "";
					this.max = "";
					this.pfId = "";
					this.qdId = "";
					this.min_ml = "";
					this.max_ml = "";
					this.getGoodsList();
				}
			},
			// 公众号
			bindload(e){
				console.log(e)
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.test
		position fixed
		top 70rpx
		width 100%
		background-color #FFFFFF
		opacity 1
		transition .5s
	.uni-title
		padding 15rpx 30rpx
		font-size 28rpx
		background-color #F4F4F4
	
</style>
