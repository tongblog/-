import config from '@/api/config.js';
export let upload = async (url,id)=>{
	return await new Promise((resolve,reject)=>{
		let imgSrc = uni.chooseImage({
			count: 1, 
			sizeType: ['original', 'compressed'],
			sourceType: ['album','camera'],
			success:(res)=>{
				let tempFilePaths = res.tempFilePaths[0];
				let router = config.domain +  'api.php?s=/upload/uploadFile'
				uni.uploadFile({
					url: router,
					filePath: tempFilePaths,
					name: 'file_upload',
					formData: {
						album_id:id,
						token: uni.getStorageSync('token'),
						file_path : url
					},
					success(uploadFileRes){
						let paths =  JSON.parse(uploadFileRes.data).data.data;
						resolve(paths);
					}
				});
			}
		});
	})
} 

