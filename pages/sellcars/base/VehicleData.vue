<template>
	<view class="vehicle-data">
		<form @submit="getPhone">
		<view class="uni-flex uni-column">
			<view class="flex-item">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<text>车型</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" placeholder-style="color:#222222" :value="array[index]" name="cat_type" disabled="true" placeholder="请选择" />	
				</picker>	
			</view>
			<view class="flex-item">
				<picker @change="bindPickerCity" @columnchange="columnchange" mode='multiSelector' :value="multiindex" :range="multiArray" >
					<text>所在城市</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="province" placeholder-style="color:#222222" name="province"  disabled="true"  placeholder="请选择" />
				</picker>	
			</view>
			<view class="flex-item" @tap="clickBrand">
				<text>品牌车系</text>
				<icon class="iconfont icon-jiantou"></icon>
				<input class="uni-input" placeholder-style="color:#222222" :value="carName" name="brands" disabled="true" placeholder="请选择" />
			</view>
			
			<view class="flex-item">
				<picker @change="bindChangeRl" :value="rlId" :range="rlType">
					<text>燃料类型</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" placeholder-style="color:#222222" :value="rlType[rlId]" name="rl_type" disabled="true" placeholder="请选择" />	
				</picker>	
			</view>
			
			<view class="flex-item">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<text>营运证年检期</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="date" name="aip_date" disabled="true" placeholder="请选择" />
				</picker>
			</view>
			
			<view class="flex-item">
				<picker mode="date" :value="vehicleDate" fields="month" :start="startVehicle" :end="endVehicle" @change="bindVehicleChange">
					<text>行驶证检验有效期</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="vehicleDate" name="vehicle_date" disabled="true" placeholder="请选择" />
				</picker>
			</view>
			
			<view class="horsepower on flex-item" @tap="clickSlider">
				<text>马力</text>
				<icon class="iconfont icon-jiantou"></icon>
				<input type="text" disabled="true" placeholder="请选择" :value="sliderData + '匹'" name="ml_num"/>
				<view class="slider">
					<slider v-if="slider" value="600"  activeColor="#0657A6" show-value="true" min="0" max="600" @change="sliderChange" />
				</view>
			</view>
			<view class="horsepower one flex-item">
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<text>排放</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input type="text" :value="array1[index1]" disabled="true" name="pf_id"/>
				</picker>
				
			</view>
			<view class="horsepower one flex-item">
				<picker @change="bindPickerChange2" :value="index2" :range="array2">
					<text>驱动</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input type="text" :value="array2[index2]" disabled="true" name="qd_id"/>
				</picker>
			</view>
			
			<view class="flex-item">
				<text>轮胎规格</text>
				<text style="color: #0657A6; font-size: 22rpx;">(选填)</text>
				<icon class="iconfont icon-jiantou"></icon>
				<input type="text" @blur="blurLuntai" placeholder="请填写轮胎规格" placeholder-style="color:#222222"/>
			</view>
			
			<view class="flex-item">
				<text>发动机品牌</text>
				<text style="color: #0657A6; font-size: 22rpx;">(选填)</text>
				<icon class="iconfont icon-jiantou"></icon>
				<input type="text" @blur="blurPinpai" placeholder="请填写发动机品牌" placeholder-style="color:#222222"/>
			</view>
			
			<view class="flex-item">
				<text>保险</text>
				<text style="color: #0657A6; font-size: 22rpx;">(可多选)</text>
				<checkbox-group class="check" @change="changeCheck" name="bx_id">
					<label>
						<checkbox value="0" color="#0657A6" style="transform: scale(0.6)" />强险
					</label>
					<label>
						<checkbox value="1" color="#0657A6" style="transform: scale(0.6)" />第三者
					</label>
					<label>
						<checkbox value="2" color="#0657A6" style="transform: scale(0.6)" />车损险
					</label>
				</checkbox-group>
			</view>
			
			<view class="flex-item">
				<text>所有人类型</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio" @change="changeType"  name="al_type">
					<label><radio color="#0657A6" :disabled="state" style="transform: scale(0.6)" value="1" />个人</label>
					<label><radio color="#0657A6" :disabled="state" style="transform: scale(0.6)" value="2" />企业</label>
					<label><radio color="#0657A6" :disabled="!state" style="transform: scale(0.6)" value="3" />店铺</label>
				</radio-group>
				
			</view>
			
			<view class="flex-item">
				<text>是否包提档</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio" @change="changeArchives" name="is_btd">
					<label><radio color="#0657A6" style="transform: scale(0.6)" checked="true" value="1" />是</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="0" />否</label>
				</radio-group>
			</view>
			<view class="flex-item" v-if="index == 0">
				<text>是否带挂出售</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio" @change="handleHang" name="is_dgcs">
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="1" />是</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" checked="true" value="0" />否</label>
				</radio-group>
			</view>
			<view class="flex-item">
				<text>是否可议价</text>
				<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
				<radio-group class="radio" @change="changeBargain" name="is_yj">
					<label><radio color="#0657A6" style="transform: scale(0.6)" checked="true" value="1" />是</label>
					<label><radio color="#0657A6" style="transform: scale(0.6)" value="0" />否</label>
				</radio-group>
			</view>
			
			<view class="flex-item">
				<picker @change="bindChangeColumn" :value="columnIdx" :range="column">
					<text>展示栏目</text>
					<icon class="iconfont icon-jiancefengxian" @tap.stop="handleLanmu"></icon>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" :value="column[columnIdx]" name="column_type" disabled="true" placeholder="请选择" />	
				</picker>	
			</view>
			
			<view class="flex-item">
				<text>预售价格</text>
				<input class="uni-input" type="number" @input="changePrice" placeholder="请填写预售价格(元)" name="ys_price"/>
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
			jsonId1:{  // 行驶证数据json
				type:Object
			},
			front:{ // 行驶证正面图片地址
				type:String
			},
			behind:{ // 行驶证反面图片地址
				type:String
			},
			issue_date:{  // 使用年限
				type:Number
			},
			state:{
				type:Boolean
			}
		},
		data(){
			const currentDate = this.getDate({
				format: true
			})
			const xszDate = this.getVehicleDate({
				format: true
			})
			return{
				array: [],
				index: 0,  // 车型id
				array1: [],
				index1:0,  // 排放id
				array2: [],
				index2:0,  // 驱动id
				date: currentDate,
				vehicleDate: xszDate,
				slider: false,
				sliderData:0, // 马力值
				multiArray:[[],["台湾省"]],
				multiindex:[0,0],
				provList:[],
				citysList:[],
				provId:0,   // 省份id
				cityId:0,   // 城市id
				province: '',
				citys: '',
				carName:'',
				brandId:0,  // 品牌id
				categoryId:0, //车系id
				insurance:[], // 保险
				genre:1, // 所有人类型
				archives:1, // 是否包提档
				hang:0, // 是否带挂
				bargain:1, // 是否议价
				price:0,  // 预售价格
				rlType:["请选择","柴油","天然气","汽油"],
				rlId:0,
				columnIdx:0,
				column:[],  // 栏目
				group_idx:0,
				group_id:[],
				tyre_spec:"",  // 轮胎规格
				engine_brand:"", // 发动机品牌
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			startVehicle() {
				return this.getVehicleDate('start');
			},
			endVehicle() {
				return this.getVehicleDate('end');
			},
		},
		created(){
			_this = this;
			this.getProvince();
			this.getModels();
			this.getColumnn();
		},
		watch:{
			"$store.state.cars":(v)=>{
				_this.carName = v.brandName + " " + v.categoryName;
				_this.brandId = v.brandId;
				_this.categoryId = v.categoryId;
			}
		},
		methods:{
			// 驱动
			bindPickerChange2(e){
				this.index2 = parseInt(e.target.value)
			},
			// 排放
			bindPickerChange1(e){
				this.index1 = parseInt(e.target.value)
			},
			// 燃料类型
			bindChangeRl(e){
				this.rlId = parseInt(e.target.value)
			},
			// 栏目选择
			bindChangeColumn(e){
				this.columnIdx = parseInt(e.target.value)
				this.group_idx = this.group_id[this.columnIdx];
			},
			// 车型
			bindPickerChange(e){
				let index = this.index
				this.index = parseInt(e.target.value)
				if(e.target.value == 1){
					this.$c.msg('发布挂车请先上传挂车行驶证！')
					this.index = index
					return 
				}
				
			},
			// 选择车系
			clickBrand(){
				goWindow("/pages/common/brand")
			},
			// 营运证年检期
			bindDateChange(e) {
			    this.date = e.target.value
			},
			// 营运证年检期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 20;
				} else if (type === 'end') {
					year = year + 5;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 行驶证有效期
			bindVehicleChange(e){
				this.vehicleDate = e.target.value
				//console.log(this.vehicleDate)
			},
			// 行驶证有效期
			getVehicleDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				//let day = date.getDate();
				
				if (type === 'start') {
					year = year - 20;
				} else if (type === 'end') {
					year = year + 5;
				}
				month = month > 9 ? month : '0' + month;;
				//day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			},
			// 马力值
			sliderChange(e) {
				this.sliderData =  e.detail.value;
				this.slider = false
			},
			// 保险
			changeCheck(e){
				this.insurance = e.detail.value
			},
			// 所有人类型
			changeType(e){
				this.genre = parseInt(e.detail.value)
			},
			// 是否提档
			changeArchives(e){
				this.archives = parseInt(e.detail.value)
			},
			// 是否带挂
			handleHang(e){
				this.hang = parseInt(e.detail.value)
			},
			// 是否议价
			changeBargain(e){
				this.bargain = parseInt(e.detail.value)
			},
			// 预售价格
			changePrice(e){
				this.price = parseInt(e.detail.value)
			},
			clickSlider(){
				this.slider = true
			},
			// 轮胎规格
			blurLuntai(e){
				this.tyre_spec = e.detail.value
			},
			// 发动机品牌
			blurPinpai(e){
				this.engine_brand = e.detail.value
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
						token:token,
					},"POST")
					.then((res)=>{
						if(res.data.data === 1){
							_this.judge();
						}else{
							goWindow('/pages/common/phonenumber')
						}
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			// 实名认证
			judge(){
				let _this = this;
				request('/member/isBindId',{
					token: uni.getStorageSync('token'),
				},'POST').then((res)=>{
					if(res.data.data !== 1){
						uni.showModal({
						    title: '提示',
						    content: '请先完成实名认证!',
							confirmColor: '#0657A6',
						    success(res) {
						        if (res.confirm) {
									goWindow('/other_pages/RealName/RealName')
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}else{
						_this.pageJump();	
					}
				})
			},
			
			validata(data){
				let msg = '';
				let _this = this;
				if(data.cat_type == '' && msg == ''){
					msg = '车辆类型不能为空';
				}
				
				if(data.province == '' && msg == ''){
					msg = '请选择所在城市';
				}
				
				if(data.brands == '' && msg == ''){
					msg = '请选择品牌';
				}
				
				if(data.rl_type == '请选择' && msg == ''){
					msg = '请选择燃料类型';
				}
				
				if(data.aip_date == '' && msg == ''){
					msg = '请选择年检期时间';
				}
				
				if(data.vehicle_date == "" && msg == ''){
					msg = '请选择行驶证检验有效期';
				}
				
				if(data.ml_num == "0匹" && msg == ''){
					msg = '请选择马力';
				}
				
				if(data.pf_id == '请选择排放' && msg == ''){
					msg = '请选择排放';
				}
				
				if(data.qd_id == '请选择驱动' && msg == ''){
					msg = '请选择驱动';
				}
				
				if(data.bx_id.length <= 0 && msg == ''){
					msg = '请选择保险';
				}
				
				if(data.all_type == '' && msg == ''){
					msg = '请选择所有人';
				}
				
				if(data.column_type == '请选择' && msg == ''){
					msg = '请选展示栏目';
				}
				
				if(data.ys_price <= 0 && msg == ''){
					msg = '请填写车辆预售价格';
				}
				
				
				
				if(msg == ''){
					return true;
				}else{
					_this.$c.msg(msg);
					return false;
				}
			},
			
			// 页面跳转
			pageJump(){
				Object.assign(this._data,this._props)
				let jsonObj = this._data;
				delete jsonObj.array;
				delete jsonObj.array1;
				delete jsonObj.array2;
				delete jsonObj.slider;
				delete jsonObj.multiArray;
				delete jsonObj.multiindex;
				delete jsonObj.provList;
				delete jsonObj.citysList;
				delete jsonObj.province;
				delete jsonObj.citys;
				delete jsonObj.carName;
				delete jsonObj.show;
				delete jsonObj.rlType;
				delete jsonObj.column;
				delete jsonObj.columnIdx;
				delete jsonObj.group_id;
				if(jsonObj.behind !== "" && jsonObj.front !== ""){
					jsonObj = JSON.stringify(jsonObj);
					if(this.hang == 0){
						goWindow("/other_pages/VehicleImg/VehicleImg?json=",jsonObj)
					}else if(this.hang == 1){
						goWindow("/other_pages/daiguaSell/SellCars?json=",jsonObj)
					}
				}else{
					this.$c.msg("请上传行驶证")
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
			// 获取车型,排放,驱动
			getModels(){
				request('/index/getSearchCondition',{},"GET")
				.then((res)=>{
					let array = res.data.data.car_type;
					let array1 = res.data.data.pf_type;
					let array2 = res.data.data.qd_type;
					this.array = array.slice(1);
					this.array1 = array1;
					this.array2 = array2;
				})
			},
			// 获取栏目
			getColumnn(){
				let _this = this;
				request('/goods/getGoodsGroupList',{},"POST")
				.then((res)=>{
					let column = res.data.data.data;
					column.forEach((item,index)=>{
						_this.column.push(item.group_name);
						_this.group_id.push(item.group_id);
						_this.group_idx = _this.group_id[_this.columnIdx];
					})
					
				})
			},
			// 栏目说明
			handleLanmu(){
				goWindow("/other_pages/help/index?help_id=",19)
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
				padding 19rpx 25rpx
				vertical-align middle
				text-align right
			.icon-jiancefengxian
				padding 0 10rpx 
				vertical-align middle
				line-height 90rpx
				font-size 28rpx
				color #0657a6
			.icon-jiantou
				float right
				vertical-align middle
				line-height 90rpx
				font-size 21rpx
				color #999999
			.one
				padding-left 10rpx
			.on
				padding-right 10rpx
		.horsepower
			position relative
			.slider
				position absolute
				bottom -95rpx
				left 0
				width 100%
				z-index 10
				background-color #F4F4F4
				border-radius 50rpx
			text
				display inline-block
				line-height 91rpx
				vertical-align middle
				font-size 26rpx
			input
				float right
				padding 0
				height 91rpx
				display inline-block
				vertical-align middle
				font-size 26rpx
				line-height 91rpx
			icon
				float right
				padding-left 15rpx
				vertical-align middle
				line-height 91rpx
				font-size 21rpx
				color #999999	
</style>

