<template>
	<view class="vehicle-data">
		<form @submit="getPhone">
			<view class="sheet uni-flex uni-column">
				<view class="flex-item sheet-item">
					<text>车牌号</text>
					<input class="uni-input" disabled="true" :value="car_info.plate_num" placeholder="上传后自动识别" />
				</view>
				<view class="flex-item sheet-item">
					<text>品牌型号</text>
					<input class="uni-input" disabled="true" :value="car_info.model" placeholder="上传后自动识别" />
				</view>
				<view class="flex-item sheet-item">
					<text>使用年限</text>
					<input class="uni-input" disabled="true" :value="car_info.issue_date | filterIssue" placeholder="上传后自动识别" />
				</view>
				<view class="flex-item sheet-item">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<text>车型</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" placeholder-style="color:#222222" :value="array[index]" name="cat_type" disabled="true" placeholder="请选择" />	
					</picker>	
				</view>
				<view class="flex-item sheet-item" v-if="unfold">
					<picker @change="bindPickerCity" @columnchange="columnchange" mode='multiSelector' :value="multiindex" :range="multiArray" >
						<text>所在城市</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" :value="province || introduction" placeholder-style="color:#222222" name="province"  disabled="true"  placeholder="请选择" />
					</picker>	
				</view>
				<view class="flex-item sheet-item" v-if="unfold" @tap="clickBrand">
					<text>品牌车系</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input class="uni-input" placeholder-style="color:#222222" :value="carName || changeGoodsName" name="brands" disabled="true" placeholder="请选择" />
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<picker @change="bindChangeRl" :value="rlId" :range="rlType">
						<text>燃料类型</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" placeholder-style="color:#222222" :value="rlType[rlId]" name="rl_type" disabled="true" placeholder="请选择" />	
					</picker>	
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text>营运证年检期</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" :value="date" name="aip_date" disabled="true" placeholder="请选择" />
					</picker>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<picker mode="date" :value="vehicleDate" fields="month" :start="startVehicle" :end="endVehicle" @change="bindVehicleChange">
						<text>行驶证检验有效期</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" :value="vehicleDate" name="vehicle_date" disabled="true" placeholder="请选择" />
					</picker>
				</view>
				
				<view class="horsepower on flex-item sheet-item" v-if="unfold" @tap="clickSlider">
					<text>马力</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input type="text" disabled="true" placeholder="请选择" :value="sliderData + '匹'" name="ml_num"/>
					<view class="slider">
						<slider v-if="slider" value="600"  activeColor="#0657A6" show-value="true" min="0" max="600" @change="sliderChange" />
					</view>
				</view>
				<view class="horsepower one flex-item sheet-item" v-if="unfold">
					<picker @change="bindPickerChange1" :value="index1" :range="array1">
						<text>排放</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input type="text" :value="array1[index1]" disabled="true" name="pf_id"/>
					</picker>
					
				</view>
				<view class="horsepower one flex-item sheet-item" v-if="unfold">
					<picker @change="bindPickerChange2" :value="index2" :range="array2">
						<text>驱动</text>
						<icon class="iconfont icon-jiantou"></icon>
						<input type="text" :value="array2[index2]" disabled="true" name="qd_id"/>
					</picker>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>轮胎规格</text>
					<text style="color: #0657A6; font-size: 22rpx;">(选填)</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input type="text" :value="tyre_spec" @blur="blurLuntai" placeholder="请填写轮胎规格" placeholder-style="color:#222222"/>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>发动机品牌</text>
					<text style="color: #0657A6; font-size: 22rpx;">(选填)</text>
					<icon class="iconfont icon-jiantou"></icon>
					<input type="text" :value="engine_brand" @blur="blurPinpai" placeholder="请填写发动机品牌" placeholder-style="color:#222222"/>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>保险</text>
					<text style="color: #0657A6; font-size: 22rpx;">(可多选)</text>
					<checkbox-group class="check" @change="changeCheck" name="bx_id">
						<label>
							<checkbox value="0" color="#0657A6" :checked="qiangxian" style="transform: scale(0.6)" />强险
						</label>
						<label>
							<checkbox value="1" color="#0657A6" :checked="disan" style="transform: scale(0.6)" />第三者
						</label>
						<label>
							<checkbox value="2" color="#0657A6" :checked="chesun" style="transform: scale(0.6)" />车损险
						</label>
					</checkbox-group>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>所有人类型</text>
					<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
					<radio-group class="radio" @change="changeType"  name="al_type">
						<label><radio color="#0657A6" :disabled="state" :checked="genre == 1" style="transform: scale(0.6)" value="1" />个人</label>
						<label><radio color="#0657A6" :disabled="state" :checked="genre == 2" style="transform: scale(0.6)" value="2" />企业</label>
						<label><radio color="#0657A6" :disabled="!state" :checked="genre == 3" style="transform: scale(0.6)" value="3" />店铺</label>
					</radio-group>
					
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>是否包提档</text>
					<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
					<radio-group class="radio" @change="changeArchives" name="is_btd">
						<label><radio color="#0657A6" style="transform: scale(0.6)" :checked="is_btd" value="1" />是</label>
						<label><radio color="#0657A6" style="transform: scale(0.6)" :checked="!is_btd" value="0" />否</label>
					</radio-group>
				</view>
				<view class="flex-item sheet-item" v-if="index == 0 && unfold">
					<text>是否带挂出售</text>
					<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
					<radio-group class="radio" @change="handleHang" name="is_dgcs">
						<label><radio color="#0657A6" style="transform: scale(0.6)" value="1" />是</label>
						<label><radio color="#0657A6" style="transform: scale(0.6)" checked="true" value="0" />否</label>
					</radio-group>
				</view>
				<view class="flex-item sheet-item" v-if="unfold">
					<text>是否可议价</text>
					<text style="color: #0657A6; font-size: 22rpx;">(请勾选)</text>
					<radio-group class="radio" @change="changeBargain" name="is_yj">
						<label><radio color="#0657A6" style="transform: scale(0.6)" :checked="is_yj" value="1" />是</label>
						<label><radio color="#0657A6" style="transform: scale(0.6)" :checked="!is_yj" value="0" />否</label>
					</radio-group>
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<picker @change="bindChangeColumn" :value="columnIdx" :range="column">
						<text>展示栏目</text>
						<icon class="iconfont icon-jiancefengxian" @tap.stop="handleLanmu"></icon>
						<icon class="iconfont icon-jiantou"></icon>
						<input class="uni-input" :value="column[columnIdx]" name="column_type" disabled="true" placeholder="请选择" />	
					</picker>	
				</view>
				
				<view class="flex-item sheet-item" v-if="unfold">
					<text>预售价格</text>
					<input class="uni-input" type="number" :value="price" @input="changePrice" placeholder="请填写预售价格(元)" name="ys_price"/>
				</view>
				
			</view>
			
			<view class="uni-flex uni-row" v-if="unfold">
				<view class="flex-item row-item" @tap="handleLeft">
					<icon class="iconfont icon-paizhaotianjia"></icon>
					<view class="item-botm">
						<icon class="iconfont icon-paizhao"></icon>
						<text>拍摄车辆左前45°图片</text>
					</view>
					<image 
						lazy-load 
						:src="img_list[0].pic_cover | filterImg" 
						mode="scaleToFill"></image>
				</view>
				<view class="flex-item row-item" @tap="handleRight">
					<icon class="iconfont icon-paizhaotianjia"></icon>
					<view class="item-botm">
						<icon class="iconfont icon-paizhao"></icon>
						<text>拍摄车辆右前45°图片</text>
					</view>
					<image
						v-if="img_list.length != 0"
						lazy-load 
						:src="img_list[1].pic_cover | filterImg" 
						mode="scaleToFill"></image>
				</view>
				<view class="flex-item row-item" @tap="handleLafter">
					<icon class="iconfont icon-paizhaotianjia"></icon>
					<view class="item-botm">
						<icon class="iconfont icon-paizhao"></icon>
						<text>拍摄车辆左后45°图片</text>
					</view>
					<image
						v-if="img_list.length != 0"
						lazy-load 
						:src="img_list[2].pic_cover | filterImg" 
						mode="scaleToFill"></image>
				</view>
				<view class="flex-item row-item" @tap="handleRafter">
					<icon class="iconfont icon-paizhaotianjia"></icon>
					<view class="item-botm">
						<icon class="iconfont icon-paizhao"></icon>
						<text>拍摄车辆左后45°图片</text>
					</view>
					<image 
						v-if="img_list.length != 0"
						lazy-load="true" 
						:src="img_list[3].pic_cover | filterImg" 
						mode="scaleToFill"></image>
				</view>
			</view>
			<view class="fold">
				<text class="unfold" v-if="!unfold" @tap="handleUnfold">展开</text>
				<text class="packup" v-if="unfold" @tap="handlePackup">收起</text>
				<icon class="iconfont icon--shouyesousuojiantou" :class="{font:unfold}"></icon>
			</view>
			<view class="btn">
				<view class="service-phone">
					客服电话: <text style="padding-left: 15rpx;">4000519898</text>
				</view>
				<button form-type="submit" style="color:#fff;">提交</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	let _this;
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import * as MemberApi from '@/api/member/member.js'
	import {upload} from "@/api/uploadFile.js"
	import config from '@/api/config.js';
	export default{
		props:{
			car_info:{
				type:Object
			},
			introduction:{
				type:String
			},
			goods_name:{
				type:String
			},
			img_list:{
				type:Array,
				default:() => {
					return []
				}
			},
			img_array:{
				type:Array,
				default:() => {
					return []
				}
			},
			description:{
				type:String
			},
			goods_id:{
				type:Number
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
				unfold:false,
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
				issue_date:0, // 使用年限
				qiangxian:false,
				disan:false,
				chesun:false,
				is_btd:true, // 是否包提档
				is_yj:true, // 是否议价
				state:false, // 所有人类型
				imgSrc1:'',
				imgSrc2:'',
				imgSrc3:'',
				imgSrc4:'',
			}
		},
		filters:{
			filterIssue(value){
				if(value == undefined)return
				let date = new Date();
				let year = date.getFullYear();
				let lastYear = value.split('').slice(0,4).join("");
				let issue_date = year - lastYear;
				return issue_date
			},
			filterImg(url){
				return config.domain + url	
			}
		},
		computed: {
			changeGoodsName(){
				let goodsName = this.goods_name.split(" ");
				return goodsName[0] + goodsName[1]
			},
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
			this.getMemberDetail()
		},
		watch:{
			"$store.state.cars":(v)=>{
				_this.carName = v.brandName + " " + v.categoryName;
				_this.brandId = v.brandId;
				_this.categoryId = v.categoryId;
			},
			"car_info.car_type":(v)=>{
				_this.index = v - 1
			},
			"car_info.rl_type":(v)=>{
				_this.rlId = v
			},
			"car_info.aip_date":(v)=>{
				_this.date = v
			},
			"car_info.inspection_record":(v)=>{
				_this.vehicleDate = v
			},
			"car_info.ml_num":(v)=>{
				_this.sliderData = v
			},
			"car_info.pf_id":(v)=>{
				_this.index1 = v
			},
			"car_info.qd_id":(v)=>{
				_this.index2 = v
			},
			"car_info.bx_id":(str)=>{
				let  arr = str.split(",");
				arr.forEach(value => {
					if(value == 0){
						_this.qiangxian = true;
					}
					if(value == 1){
						_this.disan = true;
					}
					if(value == 2){
						_this.chesun = true;
					}
				})
			},
			"car_info.is_btd":(num) => {
				num >= 1 ? _this.is_btd = true : _this.is_btd = false;
			},
			"car_info.is_yj":(num) => {
				num >= 1 ? _this.is_yj = true : _this.is_yj = false;
			},
			"car_info.all_type":(num) => {
				_this.genre = num
			},
			"car_info.ys_price":(str) => {
				_this.price = str;
			},
			"car_info.engine_brand":(str) => {
				if(str){
					_this.engine_brand = str;
				}
			},
			"car_info.engine_brand":(str) => {
				if(str){
					_this.engine_brand = str;
				}
			},
			"car_info.tyre_spec":(str) => {
				if(str){
					_this.tyre_spec = tyre_spec
				}
			}
			
			
		},
		methods:{
			// 获取会员详情
			getMemberDetail(){
				MemberApi.getMemberInfo().then(res=>{
					let instance_id = parseInt(res.data.user_info.instance_id);
					if(instance_id !== 0){
						this.state = true;
					}
				})
			},
			// 左前
			handleLeft(){
				console.log()
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc1 = config.domain + res.img_path;
					this.img_array.splice(0,1,res.picture_id)
					
				})
			},
			// 右前
			handleRight(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc2 = config.domain + res.img_path;
					this.img_array.splice(1,1,res.picture_id)
				})
			},
			// 左后
			handleLafter(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc3 = config.domain + res.img_path;
					this.img_array.splice(2,1,res.picture_id)
				})
			},
			// 右后
			handleRafter(){
				upload("upload/goods/",0).then((res)=>{
					this.imgSrc4 = config.domain + res.img_path;
					this.img_array.splice(3,1,res.picture_id)
				})
			},
			// 展开
			handleUnfold(){
				this.unfold = true
			},
			// 收起
			handlePackup(){
				this.unfold = false
			},
			// 驱动
			bindPickerChange2(e){
				this.index2 = parseInt(e.target.value)
				this.car_info.qd_id = parseInt(e.target.value)
			},
			// 排放
			bindPickerChange1(e){
				this.index1 = parseInt(e.target.value)
				this.car_info.pf_id = parseInt(e.target.value)
			},
			// 燃料类型
			bindChangeRl(e){
				this.rlId = parseInt(e.target.value)
				this.car_info.rl_type = parseInt(e.target.value)
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
				this.car_info.car_type = parseInt(e.target.value)
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
				this.car_info.aip_date = e.target.value
				
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
				this.car_info.inspection_record = e.target.value
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
				this.car_info.ml_num = e.target.value
				this.slider = false
			},
			// 保险
			changeCheck(e){
				this.insurance = e.detail.value
				this.car_info.ml_num = e.target.value
			},
			// 所有人类型
			changeType(e){
				this.genre = parseInt(e.detail.value)
				this.car_info.all_type = parseInt(e.detail.value)
			},
			// 是否提档
			changeArchives(e){
				this.archives = parseInt(e.detail.value)
				this.car_info.is_btd = parseInt(e.detail.value)
			},
			// 是否带挂
			handleHang(e){
				this.hang = parseInt(e.detail.value)
				this.car_info.is_dgcs = parseInt(e.detail.value)
			},
			// 是否议价
			changeBargain(e){
				this.bargain = parseInt(e.detail.value)
				this.car_info.is_yj = parseInt(e.detail.value)
			},
			// 预售价格
			changePrice(e){
				this.price = parseInt(e.detail.value)
				this.car_info.ys_price = parseInt(e.detail.value)
			},
			clickSlider(){
				this.slider = true
			},
			// 轮胎规格
			blurLuntai(e){
				this.tyre_spec = e.detail.value
				this.car_info.tyre_spec = e.detail.value
			},
			// 发动机品牌
			blurPinpai(e){
				this.engine_brand = e.detail.value
				this.car_info.engine_brand = e.detail.value
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
				let _this = this;
				let carcard_json = {
					addr:this.car_info.addr,
					appproved_passenger_capacity:this.car_info.appproved_passenger_capacity,
					approved_load: this.car_info.approved_load,
					engine_num:this.car_info.engine_num,
					file_no: this.car_info.file_no,
					gross_mass: this.car_info.gross_mass,
					inspection_record: this.car_info.inspection_record,
					issue_date: this.car_info.issue_date,
					model: this.car_info.model,
					overall_dimension: this.car_info.overall_dimension,
					owner: this.car_info.owner,
					plate_num: this.car_info.plate_num,
					register_date: this.car_info.register_date,
					traction_mass: this.car_info.traction_mass,
					unladen_mass: this.car_info.unladen_mass,
					use_character: this.car_info.use_character,
					vehicle_type: this.car_info.vehicle_type,
					vin: this.car_info.vin,
				};
				let carcard_str = JSON.stringify(carcard_json);
				let used_car_json = {
					carcard_json:carcard_str,
					card_1:this.car_info.card_1,
					card_2:this.car_info.card_2,
					brands_id:this.car_info.brands_id,
					car_type:this.car_info.car_type,
					system_id:this.car_info.system_id,
					synx:this.car_info.synx,
					ml_num:this.car_info.ml_num,
					pf_id:this.car_info.pf_id,
					qd_id:this.car_info.qd_id,
					bx_id:this.car_info.bx_id,
					is_dgcs:this.car_info.is_dgcs,
					all_type:this.car_info.all_type,
					is_yj:this.car_info.is_yj,
					is_btd:this.car_info.is_btd,
					sale_price:this.car_info.ys_price,
					rl_type:this.car_info.rl_type,
					tyre_spec:this.car_info.tyre_spec,
					engine_brand:this.car_info.engine_brand,
					aip_date:this.car_info.aip_date,

				};
				let used_car_str = JSON.stringify(used_car_json);
				
				request('/goods/applyCarGoods',{
					token:uni.getStorageSync('token'),
					product:JSON.stringify({
						used_car_json:used_car_str,
						description:_this.description,
						picture:_this.img_array[0],
						imageArray:_this.img_array.join(","),
						// city_id:cityId,
						// province_id:provId,
						sale_price:this.car_info.ys_price,
						groupArray:_this.group_idx,
						
					}),
					goods_id:_this.goods_id,
				},"POST")
				.then((res)=>{
					let goodsId = parseInt(res.data.data);
					if(goodsId > 0){
						uni.reLaunch({
						    url: '/pages/common/release'
						});
					}else{
						_this.$c.msg(res.data.message)
					}
				})
				
				
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
	.fold
		color #CCCCCC
		font-size 24rpx
		text-align center
		line-height 70rpx
		text
			padding-right 15rpx
			vertical-align middle
		.font
			transform rotate(180deg)
		.icon--shouyesousuojiantou
			font-size 12rpx
			vertical-align middle
			
	.btn
		border-top 16rpx #eee solid
		padding 30rpx 25rpx
		button
			background-color #0657A6
		.service-phone
			text-align center
			color #777777
			font-size 24rpx
			text
				color #FF2E2E
	.uni-row
		padding 24rpx 18rpx 10rpx 18rpx
		flex-wrap wrap
		justify-content space-between
		.row-item:nth-child(1)
			margin-bottom 20rpx
		.row-item:nth-child(2)
			margin-bottom 20rpx	
		.row-item
			position relative
			overflow hidden
			width 48.5%
			height 213rpx
			background-color #E1EEFF
			border-radius 10rpx
			text-align center
			image
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			icon
				margin-top 15rpx
				font-size 62rpx
				color #0657A6
			.item-botm icon
				font-size 30rpx
			.item-botm text
				padding-left 15rpx
				font-size 24rpx
				color #0657A6		
	.sheet
		padding 0 20rpx
		.sheet-item
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

