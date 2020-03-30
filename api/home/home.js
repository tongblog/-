import request from '@/api/index';

/*
 
*/
export const getIndexData = (params = {}) => {
	return request({
		url: '/index/getIndexData',
		method: 'GET',
		params
	})
}


