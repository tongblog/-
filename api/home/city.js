import request from '@/api/index';

/*
 
*/
export const getCity = (params = {}) => {
	return request({
		url: '/index/getCity',
		method: 'GET',
		params
	})
}