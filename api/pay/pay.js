import request from '@/api/index'

const memberController = '/member/'
const payController = '/pay/'
const orderController = '/order/'

/**
 * 外部交易号
 */
export const getOutTrandeNo = (params = {}) => {

	return request({
		url: memberController + 'getOutTrandeNo',
		method: 'POST',
		params,
	})
}

/**
 * 创建保证金订单
 */
export const createBailMoneyOrder = (params = {}) => {

	return request({
		url: memberController + 'createBailMoneyOrder',
		method: 'POST',
		params,
	})
}


/**
 * 微信统一下单
 */
export const appletWechatPay = (params = {}) => {

	return request({
		url: payController + 'appletWechatPay',
		method: 'POST',
		params,
	})
}

// 创建检测师费用外部交易号 
export const getOrderTestingOutTrandeNo = (params = {}) => {

	return request({
		url: orderController + 'getOrderTestingOutTrandeNo',
		method: 'POST',
		params,
	})
}
// 创建检测师费用订单 
export const createTestingOrder = (params = {}) => {

	return request({
		url: orderController + 'createTestingOrder',
		method: 'POST',
		params,
	})
}
// 创建服务费外部交易号 https://api.chinartn.cn/api.php?s=/order/getOrderServicesOutTrandeNo
export const getOrderServicesOutTrandeNo = (params = {}) => {

	return request({
		url: orderController + 'getOrderServicesOutTrandeNo',
		method: 'POST',
		params,
	})
}
// 创建服务费充值订单  https://api.chinartn.cn/api.php?s=/order/createServicesMoneyOrder
export const createServicesMoneyOrder = (params = {}) => {

	return request({
		url: orderController + 'createServicesMoneyOrder',
		method: 'POST',
		params,
	})
}
