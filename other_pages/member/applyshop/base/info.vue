<template>
	<view class="content">
		<view class="apply-info" v-if="shop_state == -2">
			<image src="/static/images/apply_shop_success.png" mode="scaleToFill" class="apply-success-img"></image>
			<button type="primary" class="apply-success-button" @click="goUrl('/pages/personalcenter/PersonalCenter', 2)">返回首页</button>
		</view>
		<view class="apply-info" v-if="shop_state == 2">
			<image src="/static/images/apply_shop_chuli.png" mode="scaleToFill" class="apply-img"></image>
			<view class="p">处理中，待工作人员审核...</view>
		</view>
		<view class="apply-info" v-if="shop_state == 3">
			<image src="/static/images/apply_shop_shibai.png" mode="scaleToFill" class="apply-img"></image>
			<view class="shop-refuse">{{ shop_data.shop_refuse_info }}</view>
			<view class="p">修改后请重新提交审核</view>
		</view>
		<view class="info" v-if="shop_state == -1 || shop_state == 2 || shop_state == 3">
			<form @submit="formSubmit">
				<view class="info-item">
					<view class="item-left">请选择门店类型</view>
					<view class="item-right">
						<radio-group class="radio" @change="changeShopType" name="shop_type">
							<label>
								<radio color="#0657A6" style="transform: scale(0.6)" value="2" :checked="shop_type == 2 ? true : false" />
								企业
							</label>
							<label>
								<radio color="#0657A6" style="transform: scale(0.6)" value="1" :checked="shop_type == 1 ? true : false" />
								个人
							</label>
						</radio-group>
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">门店名称</view>
					<view class="item-right">
						<input class="uni-input" name="shop_name" type="text" placeholder="请输入门店名称" :value="getDataValue('shop_name')" />
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">门店电话</view>
					<view class="item-right">
						<input class="uni-input" name="shop_phone" type="number" placeholder="请输入门店电话" :value="getDataValue('shop_phone')" />
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">门店地址</view>
					<view class="item-right">
						<input class="uni-input" name="shop_address" type="text" placeholder="请输入门店地址" :value="getDataValue('shop_address')" />
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">经营范围</view>
					<view class="item-right">
						<input class="uni-input" type="text" name="shop_scope" placeholder="请输入经营范围" :value="getDataValue('shop_scope')" />
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">特色服务</view>
					<view class="item-right">
						<checkbox-group name="shop_service" class="check">
							<label>
								<checkbox value="1" color="#0657A6" style="transform: scale(0.6)" :checked="isService(1)"/>
								代驾
							</label>
							<label>
								<checkbox value="2" color="#0657A6" style="transform: scale(0.6)" :checked="isService(2)"/>
								分期
							</label>
							<label>
								<checkbox value="3" color="#0657A6" style="transform: scale(0.6)" :checked="isService(3)"/>
								保险
							</label>
							<label>
								<checkbox value="4" color="#0657A6" style="transform: scale(0.6)" :checked="isService(4)"/>
								代办
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="info-item">
					<view class="item-left">门店简介</view>
					<view class="item-right">
						<!-- <input
							class="uni-input"
							name="shop_desc"
							type="text"
							placeholder="请输入门店简介"
							:value="getDataValue('shop_desc')"
						/> -->
						<textarea 
							class="tarea"
							name="shop_desc"
							placeholder="请输入门店简介"
							maxlength="50"
							:value="getDataValue('shop_desc')"/>
					</view>
				</view>
				<view class="pictures" v-if="shop_type == 2 ? 'style=display:none;' : ''">
					<view class="item-left img-left">证件图片</view>
					<view class="item-right img-right">
						<view class="img-div">
							<view class="on img-content">
								<view class="add">+</view>
								<view class="front">
									上传
								</view>
								<image :src="getDataImg('shop_img1')" mode="scaleToFill" @click="uploadImg(1)"></image>
							</view>
							<view class="on img-title"><text>*</text> 企业营业执照</view>
						</view>
						<view class="img-div">
							<view class="on img-content">
								<view class="add">+</view>
								<view class="front">
									上传
								</view>
								<image :src="getDataImg('shop_img2')" mode="scaleToFill" @click="uploadImg(2)"></image>
							</view>
							<view class="on img-title">实体店实景照</view>
						</view>
						<view class="img-div">
							<view class="on img-content">
								<view class="add">+</view>
								<view class="front">
									上传
								</view>
								<image :src="getDataImg('shop_img3')" mode="scaleToFill" @click="uploadImg(3)"></image>
							</view>
							<view class="on img-title">品牌授权书</view>
						</view>
						<view class="img-div">
							<view class="on img-content">
								<view class="add">+</view>
								<view class="front">
									上传
								</view>
								<image :src="getDataImg('shop_img4')" mode="scaleToFill"  @click="uploadImg(4)"></image>
							</view>
							<view class="on img-title">实体店权属证明</view>
						</view>
					</view>
				</view>
				<view class="pictures" v-if="shop_type == 1 ? 'style=display:none;' : ''">
					<view class="item-left img-left">请上传门店形象(选填)</view>
					<view class="img-optional">
						<icon class="iconfont icon-paizhaotianjia"></icon>
						<image mode="scaleToFill" :src="getDataImg('shop_img5')" @click="uploadImg(5)"></image>
					</view>
				</view>
				<view class="btn" v-if="shop_state == 3 || shop_state == -1">
					<button form-type="submit" class="form-submit" @tap="tapSubmit">确定</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
// 首页商品
import * as MemberApi from '@/api/member/member.js';
import config from '@/api/config.js';
import { upload } from '@/api/upload.js';

export default {
	data() {
		return {
			shop_type: 2, // 1.个人 2.企业
			shop_data: {},
			shop_img1: '',
			shop_img2: '',
			shop_img3: '',
			shop_img4: '',
			shop_img5: '',
			shop_img1_value: '',
			shop_img2_value: '',
			shop_img3_value: '',
			shop_img4_value: '',
			shop_img5_value: '',
			shop_refuse_info: '',
			shop_state: -1, // -2第一回申请 -1添加店铺 0.店铺关闭 1.审批通过 2.审批中 3.拒绝
			shop_id : 0,
			flag: true,
			is_tap : false,
		};
	},
	props: {
		
	},
	created() {
		let _this = this;
		_this.getData();
	},
	methods: {
		// 页面跳转
		handlePric(goodsId, geoup_id) {
			goWindow('/pages/general/details?id=', goodsId);
		},

		changeShopType(e) {
			this.shop_type = parseInt(e.detail.value);
		},
		
		getDataValue(key){
			if(this.shop_data.length<=0) return ''
			return this.shop_data[key]
		},
		
		isService(value){
			if(this.shop_data.length<=0) return false
			let res = false
			for(let index in this.shop_data.shop_service){
				if(value == this.shop_data.shop_service[index]){
				res = true	
				}
			}
			return res
		},
		
		getDataImg(key){
			return this[key] == '' ? '/static/pullDown.jpg' : config.domain + this[key]
		},

		getData() {
			let _this = this;
			uni.showLoading({
				title: '加载中'
			});
			MemberApi.getMemberShopInfo().then(res => {
				let data = res.data;
				if (data == undefined || data == null) {
					data = {};
				}
				
				if (JSON.stringify(data) != "{}") {
					_this.shop_state = parseInt(data.shop_state);
					_this.shop_id = data.shop_id;
					_this.shop_type = data.shop_type;
					_this.shop_service = data.shop_service.split(',');
					_this.shop_img1 = data.shop_img1;
					_this.shop_img1_value = data.shop_img1;
					_this.shop_img2 = data.shop_img2;
					_this.shop_img2_value = data.shop_img2;
					_this.shop_img3 = data.shop_img3;
					_this.shop_img3_value = data.shop_img3;
					_this.shop_img4 = data.shop_img4;
					_this.shop_img4_value = data.shop_img1;
					_this.shop_img5 = data.shop_img5;
					_this.shop_img5_value = data.shop_img5;
				} else {
					_this.shop_state = -1;
				}
				setTimeout(() => {
					
					_this.shop_data = data;
					
					uni.hideLoading();
				}, 500);
			});
		},

		uploadImg(type) {
			let _this = this;
			if (_this.shop_state == 3 || _this.shop_state == -1) {
				upload().then(res => {
					let type_name = 'shop_img' + type;
					let type_value_name = 'shop_img' + type + '_value';
					this[type_name] = res;
					this[type_value_name] = res;
				});
			}
		},
		tapSubmit(e){
			let _this = this
			if(_this.flag == true)return
			_this.is_tap = false
			_this.$c.appletMessageNotify('verify_end', 1).then((res) => {
				_this.is_tap = true
			})
		},
		formSubmit(e) {
			let _this = this;
			let detail = e.detail.value;
			if (!_this.flag) return false;
			_this.flag = false;
			if (_this.validate(detail)) {
				detail.shop_img1 = _this.shop_img1_value;
				detail.shop_img2 = _this.shop_img2_value;
				detail.shop_img3 = _this.shop_img3_value;
				detail.shop_img4 = _this.shop_img4_value;
				detail.shop_img5 = _this.shop_img5_value;
				detail.shop_id = _this.shop_id;
				detail.shop_service = detail.shop_service.join(',');
				let setTimeoutFlag
				setTimeoutFlag = setInterval(function(){
					if(_this.is_tap){
						clearInterval(setTimeoutFlag)
						MemberApi.addShop(detail).then(res => {
							if (res.code > 0) {
								_this.$c.msg('申请店铺成功,请等待审批！');
						
								setTimeout(() => {
									if (_this.shop_id > 0 && _this.shop_state != 3) {
									} else {
										_this.shop_state = -2;
									}
									_this.flag = true;
									// _this.getData()
								}, 1500);
							} else {
								_this.$c.msg(res.message);
								_this.flag = true;
								return false;
							}
						});
					}
				},500)
				
			} else {
				_this.flag = true;
			}
		},

		validate(data) {
			let _this = this;
			if (data.shop_name == '' || data.shop_name == undefined) {
				_this.$c.msg('门店名称不能为空');
				return false;
			}
			if (data.shop_phone == '' || data.shop_phone == undefined) {
				_this.$c.msg('门店电话不能为空');
				return false;
			}
			if (data.shop_address == '' || data.shop_address == undefined) {
				_this.$c.msg('门店地址不能为空');
				return false;
			}
			if (data.shop_scope == '' || data.shop_scope == undefined) {
				_this.$c.msg('经营范围不能为空');
				return false;
			}
			if (data.shop_service.length <= 0) {
				_this.$c.msg('请选择店铺特色服务');
				return false;
			}

			if (data.shop_desc == '' || data.shop_desc == undefined) {
				_this.$c.msg('门店简介不能为空');
				return false;
			}

			if (data.shop_type == '2' && _this.shop_img1 == '') {
				_this.$c.msg('请上传企业营业执照');
				return false;
			}
			return true;
		},

		handleErr(e, index) {
			if (e.type == 'error') {
				this.data.order_goods[0].picture_info.pic_cover = '/static/images/list.jpg';
			}
		},

		goUrl(url, type = 0) {
			let _this = this;
			_this.$c.goUrl(url, type);
		}
	}
};
</script>

<style scoped lang="stylus">
.apply-info
	width 100%
	padding 30rpx 0
	text-align center
.apply-info .apply-success-img
	width 250rpx
	height 250rpx
.apply-info .apply-img
	width 150rpx
	height 150rpx
	margin-bottom 20rpx
.apply-info .apply-success-button
	width 80%
	margin 200rpx auto
	font-size 30rpx
	background #0657A6
.apply-info .shop-refuse
	color #FF2F2F
	font-size 24rpx
	text-align center
.apply-info .p
	color #666666
	text-align center
	font-size 26rpx
.content
	height 100vh
	background #fff
	padding 0 20rpx
.content .info .info-item .info-title
	font-size 24rpx
	margin 15rpx 0
.content .info .btn
	width 100%
	float left
	border-top 24rpx #F4F4F4 solid
.content .info .btn .form-submit
	width 100%
.content .info .pictures
	margin-top 20rpx
.content .info .pictures .img-optional
	display inline-block
	position relative
	overflow hidden
	float right
	width 200rpx
	height 200rpx
	margin-bottom 20rpx
	border-radius 15rpx
	background-color #E1EEFF
	text-align center
	icon
		line-height 200rpx
		font-size 45rpx
		color #0657A6
	image
		position absolute
		top 0
		left 0
		width 100%
		height 100%
.content .info .pictures .img-left
	display inline-block
	font-size 28rpx
	color #444444
.content .info .pictures .img-right
	display flex
	flex-wrap wrap
	justify-content space-between
	padding 30rpx 50rpx
	.img-div
		display flex
		width 45%
		height 200rpx
		flex-wrap wrap
		margin-bottom 85rpx
		.on
			position relative
			width 100%
			font-size 22rpx
			color #0657A6
			text-align center
			image
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			.add
				padding-top 40rpx
				font-size 50rpx
				font-weight bold
				line-height 55rpx
			.front
				font-size 30rpx
		.img-content
			border 1rpx dashed #0657A6
			height 200rpx
		.img-title
			padding 20rpx 0
			font-size 24rpx
			color #444444
			text
				color #FF2E1A
				font-size 28rpx
		
.content .info .info-item
	display flex
	width 100%
	height 87rpx
	border-bottom 1px solid #F4F4F4
.content .info .info-item .item-left
	width 30%
	font-size 28rpx
	color #444444
	line-height 87rpx
.content .info .info-item .item-right
	width 70%
	font-size 26rpx
	color #222222
	line-height 87rpx
	text-align right
.content .info .info-item .item-right .tarea
	width 92%
	height 40rpx
	padding 25rpx
	line-height 32px
	font-size 28rpx
	background #FFF
	flex 1

.content .info .info-item .item-right .check
	text-align center
.content .info .info-item .item-right .check label
	padding-right 6rpx
.content .info .info-item .item-right .img-div
	width 49%
	display inline-block
	vertical-align top
.content .info .info-item .item-right .img-div .img-content
	text-align center
	width 100%
.content .info .info-item .item-right .img-div .img-content image
	width 150rpx
	height 150rpx
.content .info .info-item .item-right .img-div .img-title
	font-size 24rpx
	text-align center
form .form-submit
	width 80%
	background #0657A6
	margin 20rpx auto
	color #Fff
</style>
