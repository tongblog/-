import request from '@/api/index'

const controller = '/index/'

/**
 * 客服中心
 */
export const getWebSiteTel = (params = {}) => {

	return request({
		url: controller + 'getWebSiteTel',
		method: 'POST',
		params,
	})
}

/**
 * 获取帮助内容
 */
export const getHelpContent = (params = {}) => {

	return request({
		url: controller + 'getHelpContent',
		method: 'POST',
		params,
	})
}

export const getTempIdArr = (params = {}) => {
	return request({
		url: controller + 'getTempIdArr',
		method: 'POST',
		params,
	})
}
