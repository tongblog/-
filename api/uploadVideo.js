import config from '@/api/config.js';
export let uploadVideo = async (url)=>{
	return await new Promise((resolve,reject)=>{
		let videoSrc = uni.chooseVideo({
                count: 1,
                sourceType: ['camera', 'album'],
				compressed:true,
				maxDuration:20,
				camera:'back',
                success(res) {
					let tempFilePath = res.tempFilePath;
					uni.uploadFile({
						url: config.domain + 'api.php?s=/upload/uploadFile',
						filePath: tempFilePath,
						name: 'file_upload',
						formData: {
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

