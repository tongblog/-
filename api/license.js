export let license = async ()=>{
	return await new Promise((resolve,reject)=>{
		let imgSrc = uni.chooseImage({
			count: 1, 
			sizeType: ['original', 'compressed'],
			sourceType: ['album','camera'],
			success:(res)=>{
				let tempFilePaths = res.tempFilePaths[0];
				uni.previewImage({
					urls: res.tempFilePaths,
					longPressActions: {
						success: function(data) {
							console.log(data);
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
				uni.uploadFile({
					url: 'https://api.chinartn.cn/api.php?s=/upload/uploadFile',
					filePath: tempFilePaths,
					name: 'file_upload',
					formData: {
						album_id:0,
						token: uni.getStorageSync('token'),
						file_path : 'upload/common/'
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

