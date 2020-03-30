import request from '@/api/index';

const controller = '/shop/';

/**
 * 店铺车源列表
 */
export const getShopCarGoodsList = (params = {}) => {

	return request({
		url: controller + 'getShopCarGoodsList',
		method: 'POST',
		is_login: true,
		params,
	})
}

/**
 * 店铺成交车源列表
 */
export const getShopDealCarGoodsList = (params = {}) => {

	return request({
		url: controller + 'getShopDealCarGoodsList',
		method: 'POST',
		is_login: true,
		params,
	})
}

