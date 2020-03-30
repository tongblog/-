import request from '@/api/index';

const controller = '/goods/';
const shopController = '/shop/';

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
