<template>
	<view class="all-city">
		<scroll-view class="scroll-view" scroll-y="true" @scroll="scroll" :scroll-into-view="letter" scroll-with-animation="true">
			<view class="current">
				<view class="current-title">
					<text>当前定位</text>
				</view>
				<view class="current-list">
					<view class="current-city">{{currentCity}}</view>
					<view class="positioning" @tap="clickAgain">
						<icon :class="{iconft:off}" class="iconfont icon-zhongzhi"></icon>
						重新定位
					</view>
				</view>
				<view class="hot-city">
					<text>全国</text>
				</view>
				<view class="national">
					<view class="national-item" @click="clickNational">全国</view>
				</view>	
				<view class="hot-city">
					<text>热门城市</text>
				</view>
				<view class="hot-list uni-flex uni-row">
					<view class="flex-item" @click="clickHot(item)"  v-for="(item,index) in hot" :key="index">{{item}}</view>
				</view>		
			</view>
			<view class="all-letter" v-for="(citys,key) in letters" :key="key">
				<view class="letters" :id="'letter'+key">{{key}}</view>
				<view class="all-list uni-flex uni-column" v-for="(item,index) in citys" :key="index">
					<view class="flex-item" @tap="handleCity(item.city_name)">{{item.city_name}}</view>
				</view>
			</view> 	
		</scroll-view>
	</view>
    
</template>

<script>
	var _this
	import amap from '@/libs/amap-wx.js'
	import {getCity} from "@/api/home/city.js"
	export default{
		data(){
			return{
				currentCity:'',
				amapPlugin:null,
				key:'ab9155f187d904b106f65bf678929bfd',
				hot:['北京','上海','广州','深圳','杭州','成都'],
				off:false,
				letters:[],
				letter:"",
			}
		},
		created() {
			this.getCitys();
			_this = this
			this.currentCity = this.$store.state.city
		},
		methods:{
			async getCitys(){
				await getCity().then((res)=>{
					this.letters = res.data
					//console.log(res)
				})
			},
			handleCity(city){
				this.$store.commit("changeCity",city) 
				uni.navigateBack({
				    delta: 1
				});
			},
			clickAgain(){
				this.amapPlugin = new amap.AMapWX({
					key:this.key
				});
				this.amapPlugin.getRegeo({
					success: (data) => {  
						//console.log(data)
						this.addressName = data[0].regeocodeData.addressComponent.city; 
						this.$store.commit("changeCity",this.addressName);
						this.off = !this.off;
						uni.navigateBack({
						    delta: 1
						});
					},
					fail(rej){
						if(parseInt(rej.errCode) == 0){
							uni.showModal({
							    title: '提示',
							    content: '检测到您未打开地理位置权限,是否前往开启',
								cancelText: "手动定位",
								confirmText:"前往开启",
							    success(res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.openSetting({
										  success(res) {
										    console.log(res.authSetting)
										  }
										});
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
					}
				});  
			},
			clickNational(){
				this.$store.commit("changeCity","全国")
				uni.navigateBack({
				    delta: 1
				});
			},
			
			clickHot(item){
				this.$store.commit("changeCity",item) 
				uni.navigateBack({
				    delta: 1
				});
			},
			scroll(){
				this.$store.state.letter = ""
			}
		},
		watch:{
			"$store.state.letter":(v)=>{
				_this.letter = 'letter'+v;
			},
			'$store.state.city':(newValue)=>{
				_this.currentCity = newValue;
			}
		}
		
	}

</script>

<style lang="stylus" scoped>
	.scroll-view
		height 100vh
	.all-city .all-letter
		width 100%
		.letters
			background-color #F4F4F4
			color #444444
			line-height 50rpx
			padding-left 20rpx
		.all-list .flex-item
			padding 0 20rpx
			line-height 80rpx
			border-bottom 1rpx #F4F4F4 solid
	.current-title,.hot-city
		width 100%
		background-color #F4F4F4
		color #444444
		line-height 50rpx
		padding-left 20rpx
	.current-list
		padding 0 20rpx
		line-height 80rpx
		.current-city
			display inline-block
			padding-right 50rpx
			line-height 80rpx
			vertical-align middle
		.positioning
			display inline-block
			float right
			margin-top 5rpx
			font-size 26rpx
			icon.iconft
				transform rotate(1080deg)
				transition 2s
			
	.hot-list
		flex-wrap wrap
		justify-content space-around
		.flex-item
			width 25%
			border 1px #CCCCCC solid
			border-radius 5rpx
			margin 15rpx 0
			text-align center
	.national
		padding 0 28rpx
		line-height 80rpx
		.national-item
			width 190rpx
			border 1px #CCCCCC solid
			margin 15rpx 0
			border-radius 5rpx
			text-align center
</style>
