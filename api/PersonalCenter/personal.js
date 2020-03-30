import request from '@/api/index';

/*
 
*/
export const getwechatLogin = (params = {}) => {
	return request({
		url: '/login/wechatLogin',
		method: 'POST',
		
	})
}