import config from '@/api/config.js';
export let upload = async ()=>{
	return await new Promise((resolve,reject)=>{
		let imgSrc = uni.chooseImage({
			count: 1, 
			sizeType: ['original', 'compressed'],
			sourceType: ['album','camera'],
			success:(res)=>{
				//console.log(res)
				let temp_file_path = res.tempFilePaths[0];
				let router = config.domain +  'api.php?s=/upload/uploadFile'
				uni.uploadFile({
					url: router,
					filePath: temp_file_path,
					name: 'file_upload',
					formData: {
						album_id:0,
						token: uni.getStorageSync('token'),
						file_path : 'upload/common/'
					},
					success(uploadFileRes){	
						let paths =  JSON.parse(uploadFileRes.data).data.data;
						//console.log(paths)
						resolve(paths);
					}
				});
			}
		});
	})
} 

