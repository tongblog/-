import {request} from '@/api/reques.js'
import {goWindow} from "@/api/navigate.js"
// 收藏
export let shoucang = (then,toKen,goodsId,price,favType,groupId,promotion="")=>{
	if(toKen !== ""){
		request("/member/FavoritesGoodsorshop",{
			token:toKen,
			fav_id:goodsId,
			fav_type:favType,
			log_price:price * 10000,
			goods_group_id:groupId,
			promotion_id:promotion
		},"POST")
		.then((res)=>{
			if(res.data.data > 0){
				uni.showToast({
				    title: '收藏成功',
					icon:"none",
					mask:true,
				    duration: 1500
				});
				then.options[1].icon = '/static/images/shoucang2.png'
			}else{
				uni.showToast({
				    title: '已收藏',
					icon:"none",
					mask:true,
				    duration: 1500
				});
				then.options[1].icon = '/static/images/shoucang2.png'
			}
		})
	}else{
		goWindow("/pages/common/login?id=",goodsId)
	}
}

// 取消收藏
export let quxiaosc = (then,toKen,goodsId,favType,promotion="")=>{
	request("/member/cancelFavorites",{
		token:toKen,
		fav_id:goodsId,
		fav_type:favType,
		promotion_id:promotion
	})
	.then((res)=>{
		if(res.data.data > 0){
			uni.showToast({
			    title: '取消收藏',
				icon:"none",
				mask:true,
			    duration: 1500
			});
			then.options[1].icon = '/static/images/shoucang1.png';
		}
	})
}