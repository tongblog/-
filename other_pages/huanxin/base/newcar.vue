<template>
	<view class="newcar">
		<view class="newcar-title">
			<text>请填写新车需求</text>
		</view>
		<form @submit="getPhone">
			<view class="uni-flex uni-column">
				<view class="flex-item">
					<picker @change="bindPickerChange" mode="selector" name="car_type" :value="index" :range="array">
						<text>车型</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" :value="array[index]" disabled="true" placeholder="请选择车型" />
					</picker> 
				</view>
				<view class="flex-item" @click="handleBrand">
					<text>品牌</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="carName" name="brand" disabled="true" placeholder="请选择品牌" />
				</view>
			</view>
			
			<view class="btn">
				<button form-type="submit" style="color:#fff;">下一步</button>
			</view>
			
		</form>
		
	</view>
</template>

<script>
	let _this;
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default{
		props:{
			price:{
				type:String,
			},
			posImg:{
				type:String,
			},
			revImg:{
				type:String,
			},
			posData:{
				type:Object,
			}
		},
		data(){
			return{
				array: [],
				index: 0,
				carName:"",
				brandId:0,
				categoryId:0
			}
		},
		watch:{
			"$store.state.cars":(v)=>{
				_this.carName = v.brandName + " " + v.categoryName;
				_this.brandId = v.brandId;
				_this.categoryId = v.categoryId
			}
		},
		created() {
			_this = this;
			this.getModels()
		},
		methods:{
			// 获取车型,排放,驱动
			getModels(){
				request('/index/getSearchCondition',{},"GET")
				.then((res)=>{
					let array = res.data.data.car_type;
					this.array = array.slice(1);	
				})
			},
			// 车型
			bindPickerChange(e) {
				this.index = e.target.value
			},
			// 获取品牌
			handleBrand(){
				goWindow("/pages/common/brand")
			},
			// 获取用户手机号
			getPhone(e){
				let _this = this;
				if(!_this.validata(e.detail.value)){
					return false;
				}
				let token = uni.getStorageSync('token');
				if(token !== ''){
					request("/member/isbindmobile",{
						token:uni.getStorageSync('token'),
					},"POST")
					.then((res)=>{
						if(res.data.data === 1){
							_this.pageJump();	
						}else{
							goWindow('/pages/common/phonenumber')
						}
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			
			// 页面跳转
			pageJump(){
				Object.assign(this._data,this._props)
				let jsonObj = this._data;
				delete jsonObj.array;
				delete jsonObj.carName;
				if(jsonObj.posImg !== "" && jsonObj.revImg !== ""){
					if(jsonObj.price !== ""){
						jsonObj = JSON.stringify(jsonObj);
						goWindow("/other_pages/oldVehicleImg/VehicleImg?json=",jsonObj)
					}else{
						this.$c.msg("请填写预售价格")
					}
				}else{
					this.$c.msg("请上传行驶证照片")
				}
				
			},
			validata(data){
				let msg = '';
				let _this = this;
				if(data.brand == "" && msg == ""){
					msg = '请选择品牌';
				}
				
				
				if(msg == ''){
					return true;
				}else{
					_this.$c.msg(msg);
					return false;
				}
			},	
		}
	}
</script>

<style scoped lang="stylus">
	.newcar-title
		background-color #F4F4F4
		line-height 77rpx 
		font-size 29rpx
		font-weight bold
		color #222222!important
		text-align center
	.btn
		padding 40rpx 25rpx
		button
			background-color #0657A6
	.uni-flex
		padding 0 20rpx
		.flex-item
			border-bottom 1rpx solid #EEEEEE 
			text
				display inline-block
				line-height 81rpx
				vertical-align middle
			input
				float right
				width 60%
				display inline-block
				vertical-align middle
				text-align right
			icon
				float right
				vertical-align middle
				font-size 21rpx
				color #999999
	.brand
		position absolute
		top 0
		left 0
		width 100%
		z-index 1
</style>
