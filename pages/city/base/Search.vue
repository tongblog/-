<template>
   
</template>

<script>
	var _this;
	import amap from '@/libs/amap-wx.js'
	export default{
		data(){
			return{
				currentCity:'',
				amapPlugin:null,
				key:'ab9155f187d904b106f65bf678929bfd',
				hot:['北京','上海','广州','深圳','杭州','成都'],
				off:false
			}
		},
		created() {
			 _this = this
			 this.currentCity = this.$store.state.city
		},
		watch:{
			'$store.state.city':(newValue)=>{
				_this.currentCity = newValue;
			}
		},
		methods:{
			clickAgain(){
				this.amapPlugin = new amap.AMapWX({
					key:this.key
				});
				this.amapPlugin.getRegeo({
					success: (data) => {  
						//console.log(data)
						this.addressName = data[0].regeocodeData.addressComponent.city; 
						this.$store.commit("changeCity",this.addressName);
						this.off = !this.off
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
			
			
			clickHot(item){
				this.$store.commit("changeCity",item) 
				uni.navigateBack({
				    delta: 1
				});
			}
		}
		
	}

</script>

<style lang="stylus" scoped>
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
</style>
