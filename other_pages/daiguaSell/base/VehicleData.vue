<template>
	<view class="vehicle-data">
		<form @submit="getPhone">
		<view class="uni-flex uni-column">
			<view class="flex-item">
				<picker @change="bindPickerChange" :value="modelIdx" :range="modelArr" disabled="true">
					<text>车型</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="modelArr[modelIdx]" disabled="true" placeholder="请选择" name="car_type"/>	
				</picker>	
			</view>
			<view class="flex-item" @tap="clickBrand">
				<text>品牌车系</text>
				<icon class="iconfont icon-jiantou"></icon>
				<input class="uni-input" :value="cateName" disabled="true" placeholder="请选择" name="car_type"/>
			</view>
			<view class="flex-item">
				<picker @change="changeShaft" :value="shaftIdx" :range="shaftArr">
					<text>轴型</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="shaftArr[shaftIdx]" disabled="true" placeholder="请选择" name="zx_id"/>	
				</picker>	
			</view>
			<view class="flex-item" v-if="is_hand == true">
				<picker @change="bindPickerCity" @columnchange="columnchange" mode='multiSelector' :value="multiindex" :range="multiArray" >
					<text>所在城市</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="province" name="province"  disabled="true"  placeholder="请选择" />
				</picker>	
			</view>
			<view class="flex-item" v-if="is_hand == true">
				<text>所有人类型</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio"  name="all_type" @change="changeType"  >
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="1" />个人</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="2" />企业</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="3" />店铺</label>
				</radio-group>
				
			</view>
			<view class="flex-item" v-if="is_hand == true" >
				<text>是否可议价</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio"  name="is_yj"  @change="changeBargain">
					<label><radio color="#0657A6" style="transform: scale(0.6)" checked="true" value="1" />是</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="0" />否</label>
				</radio-group>
			</view>
			
			<view class="flex-item" v-if="is_hand == true">
				<text>预售价格</text>
				<input class="uni-input" placeholder="请填写预售价格" @input="changePrice"  name="ys_price" />
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
			guaId1:{
				type:Object,
			},
			before:{
				type:String,
			},
			after:{
				type:String,
			},
			gua_date:{
				type:Number,
			},
			jsonData:{
				type:Object
			},
			is_hand:{
				type: Boolean
			}
		},
		data(){
			return{
				modelArr: [],
				modelIdx: 0,  // 车型id
				cateName:"",
				gc_categoryId:'',  // 车系id
				gc_brandId: '',	
				shaftArr:[],
				shaftIdx:0,  // 轴型id
				multiArray:[[],["台湾省"]],
				multiindex:[0,0],
				provList:[],
				citysList:[],
				provId:0,   // 省份id
				cityId:0,   // 城市id
				province: '',
				citys: '',
				genre:1, // 所有人类型
				bargain:1, // 是否议价
				price:0,  // 预售价格
			}
		},
		created(){
			_this = this;
			this.getProvince();
			this.getModels();
		},
		watch:{
			"$store.state.cars":(v)=>{
				_this.cateName = v.brandName + " " + v.categoryName;
				_this.gc_brandId = v.brandId;
				_this.gc_categoryId = v.categoryId;
			},
			
			"is_hand" : (value) => {
				if(value){
					_this.modelIdx = 1
				}else{
					_this.modelIdx = 0
				}
			}
		},
		methods:{
			// 车型
			bindPickerChange(e){
				this.modelIdx = e.target.value
			},
			// 选择车系
			clickBrand(){
				goWindow("/pages/common/brand")
			},
			changeShaft(e){
				this.shaftIdx = e.target.value
			},
			// 所有人类型
			changeType(e){
				this.genre = parseInt(e.detail.value)
			},
			// 是否议价
			changeBargain(e){
				this.bargain = parseInt(e.detail.value)
			},
			// 预售价格
			changePrice(e){
				this.price = parseInt(e.detail.value)
			},
			// 获取车型,轴型
			getModels(){
				request('/index/getSearchCondition',{},"GET")
				.then((res)=>{
					let modelArr = res.data.data.car_type;
					this.modelArr = modelArr.slice(1);
					let shaftArr = res.data.data.zx_type;
					this.shaftArr = shaftArr.slice(1);
				})
			},
			validata(data){
				let msg = '';
				let _this = this;
				let is_hand = _this.is_hand
				if(data.car_type == '' && msg == ''){
					msg = '车辆类型不能为空';
				}
				
				if(data.brands == '' && msg == ''){
					msg = '请选择品牌';
				}
				
				
				if(data.zx_id == '' && msg == ''){
					msg = '请选择轴型';
				}
				
				if(data.province == '' && msg == '' && is_hand){
					msg = '请选择所在城市';
				}
				
				if(data.all_type == '' && msg == ''  && is_hand){
					msg = '请选择所有人';
				}
			
				if(data.ys_price <= 0 && msg == ''  && is_hand){
					msg = '请填写车辆预售价格';
				}
				
				
				
				if(msg == ''){
					return true;
				}else{
					_this.$c.msg(msg);
					return false;
				}
			},
			
			// 省市变化时
			bindPickerCity(e){
				
				this.multiindex[0] = e.detail.value[0];
				this.multiindex[1] = e.detail.value[1]
				this.province = this.multiArray[0][this.multiindex[0]]
				this.citys = this.multiArray[1][this.multiindex[1]]
				this.province = this.province + ',' + this.citys
				
			},
			// 获取省份
			getProvince(){
				request("/index/getProvince",{},"POST")
				.then((res)=>{
					let prov = res.data.data;
					prov.forEach((v,i)=>{
						this.provList.push({
							province_name:v.province_name,
							province_id:v.province_id
						})
						this.provId = this.provList[0].province_id
						this.multiArray[0] = this.provList.map(item=>{
							return item.province_name
						})
						
					});
				})
			},
			// 省份,城市变化时
			columnchange(e){
				if(e.detail.column == 0){
					let provId = this.provList[e.detail.value].province_id;
					this.provId = provId
					this.getCitys(provId)	
				}else if(e.detail.column == 1){
					this.cityId = this.citysList[e.detail.value].city_id;
				}
			},
			// 获取城市
			getCitys(provId){
				request('/index/getCity',{
					province_id:this.provId
				},"POST")
				.then((res)=>{
					this.citysList = [];
					let citys = res.data.data;
					citys.forEach((v,i)=>{
						this.citysList.push({
							city_name:v.city_name,
							city_id:v.city_id
						})
						this.cityId = this.citysList[0].city_id;
						this.multiArray[1] = this.citysList.map(item=>{
							return item.city_name
						})	
					});
				})
			},
			
			// 获取用户手机号
			getPhone(e){
				if(_this.is_hand){
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
								/* let jsonObj = JSON.stringify(Object.assign(_this._data,_this._props)) */
								_this.handleNext();	
							}else{
								goWindow('/pages/common/phonenumber')
							}
						})
					}else{
						goWindow('/pages/common/login')
					}
				}else{
					this.handleNext()
				}
				
			},
			// 页面跳转
			handleNext(){
				let guaData = this._data;
				if(_this.before !== "" && _this.after !== ""){
					if(_this.is_hand){
						delete this._data.multiArray;
						delete this._data.provList;
						delete this._data.citysList;
					}else{
						delete this._data.multiArray;
						delete this._data.multiindex;
						delete this._data.provList;
						delete this._data.citysList;
						delete this._data.provId;
						delete this._data.cityId;
						delete this._data.province;
						delete this._data.citys;
						delete this._data.genre;
						delete this._data.bargain;
						delete this._data.price;
					}
					Object.assign(this._data,this.jsonData,this._props);
					let guaStr = JSON.stringify(guaData)
					goWindow("/other_pages/VehicleImg/VehicleImg?json=",guaStr)
				}else{
					this.$c.msg("请上传挂车行驶证")
				}
				
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.brand
		position absolute
		top 0
		left 0
		width 100%
		z-index 3
	.btn
		background-color #F4F4F4
		padding 40rpx 25rpx
		button
			background-color #0657A6
	.uni-flex
		padding 0 20rpx
		.flex-item
			border-bottom 1rpx solid #EEEEEE 
			font-size 26rpx
			color #222222
			.radio
				display inline-block
				float right
				line-height 90rpx
				width auto
			.check
				display inline-block
				width auto
				float right
				line-height 90rpx
				label
					padding 0 20rpx
			text
				display inline-block
				line-height 91rpx
				vertical-align middle
			input
				float right
				display inline-block
				padding 18rpx 25rpx
				vertical-align middle
				text-align right
			icon
				float right
				vertical-align middle
				line-height 90rpx
				font-size 21rpx
				color #999999
			.one
				padding-left 10rpx
			.on
				padding-right 10rpx
</style>

