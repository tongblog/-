import request from '@/api/index';

const controller = '/index/';

/**
 * 获取会员信息
 */
export const getHelpContent = (params = {}) => {

	return request({
		url: controller + 'getHelpContent',
		method: 'POST',
		is_login: true,
		params,
	})
}
