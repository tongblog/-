import request from '@/api/index';

/*
 
*/
export const getHotSearch = (params = {}) => {
	return request({
		url: '/index/searchData',
		method: 'POST',
		params
	})
}

