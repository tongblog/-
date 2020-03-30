import {request} from '@/api/reques.js'
export let callPhone = async () => {
	return await request("/index/getWebSiteTel",{},"POST")
}