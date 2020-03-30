<script>
	import {getTempIdArr} from '../../api/index/index.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	export default {
		msg: function(title, duration = 1500, mask = false, icon = 'none') {
			//统一提示方便全局修改
			if (Boolean(title) === false) {
				return;
			}
			uni.showToast({
				title,
				duration,
				mask,
				icon
			});
		},
		// 显示弹窗 确定 取消
		showModal: function(title, content, confirm = function() {}, confirmText = '确定', cancelText = '取消', cancel = function() {}) {
			if (Boolean(title) === false) {
				return;
			}
			uni.showModal({
				title: title,
				content: content,
				confirmText: confirmText,
				cancelText: cancelText,
				success: function(res) {
					if (res.confirm) {
						confirm();
					} else if (res.cancel) {
						cancel();
					}
				}
			});
		},

		// loading加载提示框
		showLoading: function(title = '加载中') {
			uni.showLoading({
				title: title
			});
		},

		// 隐藏加载提示框
		hideLoading: function() {
			uni.hideLoading();
		},
		// 价格换算
		changePrice: function(price) {
			return (price / 10000).toFixed(2)
		},
		//请求接口
		request: function(param = {}) {
			param = this.jsonExtend({
				url: '',
				data: {},
				dataType: 'json',
				header: {
					'Authorization': getApp().globalData.token || '',
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'GET',
				success: function(res) {},
				fail: function(res) {
					console.log(res)
				},
				complete: function(res) {}
			}, param);

			param.url = getApp().globalData.api_url + param.url;
			param.method = param.method.toUpperCase();
			if (param.method == 'POST') {
				param.data = qs.stringify(param.data);
			}
			uni.request(param);
			return true;
		},

		/**
		 * 跳转地址
		 * type:0.普通 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
		 * 1.关闭当前页面，跳转到应用内的某个页面。
		 * 2.跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
		 * 3.返回上一页面
		 */
		goUrl: function(url, type = 0, time = 1500) {
			switch (type) {
				case 0:
					uni.navigateTo({
						url: url
					});
					break;

				case 1:
					uni.redirectTo({
						url: url
					});
					break;

				case 2:
					uni.switchTab({
						url: url
					});
					break;
				case 3:
					setTimeout(function() {
						uni.navigateBack({

						});
					}, time);
				default:
					break;
			}
		},

		//
		setAppToken: function(success = function() {}, fail = function() {}) {
			this.getCache('token', function(res) {
				if (res.data != undefined || res.data != '') {
					getApp().globalData.token = res.data;
					success(res);
				} else {
					fail();
				}
			}, fail);
		},

		//是否登陆
		isLogin: function() {
			return getApp().globalData.token.length > 0 ? true : false;
		},

		appLogin: function() {

		},

		appLogout: function() {

		},

		jsonExtend: function(target, source) {
			for (var obj in source) {
				target[obj] = source[obj];
			}
			return target;
		},

		initTag: function(that, tag) {
			that[tag] = true;
			return true;
		},

		changeTag: function(that, tag) {
			that[tag] = false;
			return true;
		},

		// 设置缓存
		setCache: function(key, data, success = function() {
			console.log('setCache:Success')
		}, fail = function() {
			console.log('setCache:Fail')
		}) {
			uni.setStorage({
				key: key,
				data: data,
				success: function() {
					success();
				},
				fail: function() {
					fail();
				}
			});
		},

		// 获取缓存
		getCache: function(key, success = function() {}, fail = function() {
			console.log('getCache:Fail')
		}) {
			uni.getStorage({
				key: key,
				success: function(res) {
					success(res);
				},
				fail: function() {

					fail();
				}
			})
		},

		// 删除缓存
		reCache: function(key, success = function() {}, fail = function() {
			console.log('reCache:Fail')
		}) {
			uni.removeStorage({
				key: key,
				success: function(res) {
					success(res);
				},
				fail: function(res) {
					fail();
				}
			})
		},
		// 搜索,店铺商品跳转详情页
		detailsJump: function(goodsId,groupId,promotion_id = 0,goods_group_id = 0){
			switch (groupId){
				case 2:
					goWindow('/other_pages/tebieDetails/tebieDetails?id=',goodsId)
					break;
				case 3:
					goWindow('/pages/DirectSelling/DirectSelling?id=',goodsId)
					break;
				case 4:
					goWindow('/other_pages/gangkouDetails/GkouDetails?id=',goodsId)
					break;
				case 6:
					goWindow('/pages/general/details?id=',goodsId)
					break;
				default:
					if(goods_group_id == 5 || groupId == 5){
						let auction = {
							action_id:promotion_id,
							goods_id:goodsId,
						}
						goWindow('/pages/auctionDetails/auctionDetails?json=',JSON.stringify(auction))
					}else if(goods_group_id == 1 || groupId == 1){
						let kcId = {
							goodsId:goodsId,
							stockId:promotion_id
						}
						goWindow('/pages/kucunDetails/kucunDetails?id=',JSON.stringify(kcId))
					}else{
						this.msg("此商品正在活动中")
					}
					
					break;
			}
		},
		// 图片添加域名
		addImgDomain: function(param) {
			let url = getApp().globalData.base_url;
			let data = Array();
			if (param == null || param == undefined) {
				return '';
			}
			if (typeof param == 'string') {
				return url + param;
			} else {
				for (let i in param) {
					data[i] = url + param[i];
				}
			}
			return data;
		},

		/* 时间戳转日期*/
		timeStampTurnTime: (timeStamp) => {
			if (timeStamp > 0) {
				var date = new Date();
				date.setTime(timeStamp * 1000);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			} else {
				return "";
			}
		},

		/**
		 * @param {Object} type promotion_start // 活动开始提醒 , order_status // 订单状态提醒 , verify_end// 审核提醒 ,partake_promotion // 出价提醒
		 */
		appletMessageNotify:function(type, if_all = 0) {

			return new Promise((resolve, reject) => {
				getTempIdArr().then(res => {
					let data = res.data;
					if (data[type] == null || data[type] == undefined) {
						reject('type 不存在')
					}

					wx.requestSubscribeMessage({
						'tmplIds': [data[type]],
						success: (res) => {
							resolve(res)
						},
						fail: (res) => {
							if(if_all){
								resolve(res)
							}else{
								reject('不允许授权')
							}
							
						}
					})

				});
			});
		}

	}
</script>
