import request from '@/api/index';

const controller = '/member/';
const orderController = '/order/';
const shopController = '/shop/';
const testingList = "/index/";
const goods = "/goods/";

/**
 * 获取会员信息
 */
export const getMemberInfo = (params = {}) => {

	return request({
		url: controller + 'getMemberDetail',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 获取会员主页数据
 */
export const getMemberIndexData = (params = {}) => {

	return request({
		url: controller + 'getMemberIndexData',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 消息提醒列表
 */
export const getNoticeList = (params = {}) => {

	return request({
		url: controller + 'getNoticeList',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 添加收藏
 */
export const favoritesGoodsorshop = (params = {}) => {

	return request({
		url: controller + 'favoritesGoodsorshop',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 取消收藏
 */
export const cancelFavorites = (params = {}) => {

	return request({
		url: controller + 'cancelFavorites',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 收藏列表
 */
export const myCollection = (params = {}) => {

	return request({
		url: controller + 'myCollection',
		method: 'POST',
		is_login: true,
		params,
	})
}
/**
 * 足迹列表
 */
export const newMyPath = (params = {}) => {

	return request({
		url: controller + 'newMyPath',
		method: 'POST',
		is_login: true,
		params,
	})
}
/**
 * 删除足迹
 */
export const delMyPath = (params = {}) => {

	return request({
		url: '/member/delMyPath',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 获取用户发布的车源商品
 */
export const getUserCarGoodsList = (params = {}) => {

	return request({
		url: controller + 'getUserCarGoodsList',
		method: 'POST',
		is_login: true,
		params,
	})
}


/**
 * 车源订单列表
 */
export const getOrderList = (params = {}) => {
	return request({
		url: orderController + 'carOrderList',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 订单关闭
 */
export const orderClose = (params = {}) => {
	return request({
		url: orderController + 'orderClose',
		method: 'POST',
		is_login: true,
		params,
	})
}


/**
 * 订单关闭
 */
export const carOrderDetail = (params = {}) => {
	return request({
		url: orderController + 'carOrderDetail',
		method: 'POST',
		is_login: true,
		params,
	})
}


// 店铺
export const isBindId = (params = {}) => {
	return request({
		url: controller + 'isBindId',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 会员店铺信息
 */
export const getMemberShopInfo = (params = {}) => {
	return request({
		url: controller + 'getShopInfo',
		method: 'POST',
		is_login: true,
		params,
	})
}

// 判断获取手机号码
export const getIsbindmobile = (params = {}) => {
	return request({
		url: controller + 'isbindmobile',
		method: 'POST',
		is_login: true,
		params,
	})
}	

/**
 * 添加店铺
 */
export const addShop = (params = {}) => {
	return request({
		url: shopController + 'addShop',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 会员是否需要交保证金
 */
export const memberIsNeedBail = (params = {}) => {
	return request({
		url: controller + 'memberIsNeedBail',
		method: 'POST',
		is_login: true,
		params,
	})
}



/**
 * 会员需要多少保证金
 */
export const memberNeedBailMoney = (params = {}) => {
	return request({
		url: controller + 'memberNeedBailMoney',
		method: 'POST',
		is_login: true,
		params,
	})
}


/**
 * 会员需要多少保证金
 */
export const bailApplyRefund = (params = {}) => {
	return request({
		url: controller + 'bailApplyRefund',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 会员退款记录
 */
export const isCantRefund = (params = {}) => {
	return request({
		url: controller + 'isCantRefund',
		method: 'POST',
		is_login: true,
		params,
	})
}


export const getMemberPromotionOfferRecords = ( params = {}) =>  {
	
	return request({
		url: controller + 'getMemberPromotionOfferRecords',
		method: 'POST',
		is_login: true,
		params,
	})
}


// 保证金列表
export const getbaillist = (params = {}) => {
	return request({
		url: controller + 'getbaillist',
		method: 'POST',
		is_login: true,
		params,
	})
}

// 检测师列表 https://api.chinartn.cn/api.php?s=/index/getTestingList
export const getTestingList = (params = {}) => {
	return request({
		url: testingList + 'getTestingList',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 已验车状态https://api.chinartn.cn/api.php?s=/order/userOrderCehckCar
export const userOrderCehckCar = (params = {}) => {
	return request({
		url: orderController + 'userOrderCehckCar',
		method: 'POST',
		is_login: true,
		params,
	})
}

// 店铺同意预约 https://api.chinartn.cn/api.php?s=/order/agreeReserv
export const agreeReserv = (params = {}) => {
	return request({
		url: orderController + 'agreeReserv',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 店铺拒绝预约 https://api.chinartn.cn/api.php?s=/order/cencelReserv
export const cencelReserv = (params = {}) => {
	return request({
		url: orderController + 'cencelReserv',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 检测师退款https://api.chinartn.cn/api.php?s=/order/ApplyOrderTestingRefund
export const ApplyOrderTestingRefund = (params = {}) => {
	return request({
		url: orderController + 'ApplyOrderTestingRefund',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 已付定金 https://api.chinartn.cn/api.php?s=/order/alreadyDeposit
export const alreadyDeposit = (params = {}) => {
	return request({
		url: orderController + 'alreadyDeposit',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 过户 https://api.chinartn.cn/api.php?s=/order/userAlreadyGuohu
export const userAlreadyGuohu = (params = {}) => {
	return request({
		url: orderController + 'userAlreadyGuohu',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 手续代办 https://api.chinartn.cn/api.php?s=/order/procedureAgent
export const procedureAgent = (params = {}) => {
	return request({
		url: orderController + 'procedureAgent',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 分期付款 https://api.chinartn.cn/api.php?s=/order/stagesPay
export const stagesPay = (params = {}) => {
	return request({
		url: orderController + 'stagesPay',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 查看检测项 https://api.chinartn.cn/api.php?s=/order/getTestingList
export const getTestItem = (params = {}) => {
	return request({
		url: orderController + 'getTestingList',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 检测报告 https://api.chinartn.cn/api.php?s=/order/getOrderTestingInfoAndMark
export const getOrderTestingInfoAndMark = (params = {}) => {
	return request({
		url: orderController + 'getOrderTestingInfoAndMark',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 店铺订单统计  https://api.chinartn.cn/api.php?s=/shop/getShopOrderCount
export const getShopOrderCount = (params = {}) => {
	return request({
		url: shopController + 'getShopOrderCount',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 直卖议价我要看车创建订单  https://api.chinartn.cn/api.php?s=/order/carOrderCreate
export const carOrderCreate = (params = {}) => {
	return request({
		url: orderController + 'carOrderCreate',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 店铺已过户 https://api.chinartn.cn/api.php?s=/order/transDeal
export const transDeal = (params = {}) => {
	return request({
		url: orderController + 'transDeal',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 接受直卖议价   https://api.chinartn.cn/api.php?s=/member/agreeyj
export const agreeyj = (params = {}) => {
	return request({
		url: controller + 'agreeyj',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 拒绝直卖议价   https://api.chinartn.cn/api.php?s=/member/cancelyj
export const cancelyj = (params = {}) => {
	return request({
		url: controller + 'cancelyj',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 车辆下架  https://api.chinartn.cn/api.php?s=/goods/goodsOffline
export const goodsOffline = (params = {}) => {
	return request({
		url: goods + 'goodsOffline',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 车辆上架 https://api.chinartn.cn/api.php?s=/goods/goodsOnline
export const goodsOnline = (params = {}) => {
	return request({
		url: goods + 'goodsOnline',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 店铺公告 https://api.chinartn.cn/api.php?s=/shop/setShopNotice
export const setShopNotice = (params = {}) => {
	return request({
		url: shopController + 'setShopNotice',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 车源精品推荐 https://api.chinartn.cn/api.php?s=/shop/setGoodsRecommend
export const setGoodsRecommend = (params = {}) => {
	return request({
		url: goods + 'setGoodsRecommend',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 车源精品推荐下架 https://api.chinartn.cn/api.php?s=/shop/setGoodsCancelRecommend
export const setGoodsCancel = (params = {}) => {
	return request({
		url: goods + 'setGoodsCancelRecommend',
		method: 'POST',
		is_login: true,
		params,
	})
}
// 拒绝车源查看详情  https://api.chinartn.cn/api.php?s=/goods/goodsCarDetail
export const goodsCarDetail = (params = {}) => {
	return request({
		url: goods + 'goodsCarDetail',
		method: 'POST',
		is_login: true,
		params,
	})
}