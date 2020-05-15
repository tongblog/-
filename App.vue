<template>
	<view></view>
</template>
<script>
export default {
	onLaunch: function() {
		// 自动更新
		if (wx.canIUse('getUpdateManager')) {
		   const updateManager = wx.getUpdateManager()
		   updateManager.onCheckForUpdate(function (res) {
		    // 请求完新版本信息的回调
		    if (res.hasUpdate) {
		     updateManager.onUpdateReady(function () {
		      wx.showModal({
		       title: '更新提示',
		       content: '新版本已经准备好，是否重启应用？',
		       success: function (res) {
		        if (res.confirm) {
		         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		         updateManager.applyUpdate()
		        }
		       }
		      })
		     })
		     updateManager.onUpdateFailed(function () {
		      // 新的版本下载失败
		      wx.showModal({
		       title: '已经有新版本了哟~',
		       content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
		      })
		     })
		    }
		   })
		  }

	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';

@import url("/components/uParse/src/wxParse.css");

view {
	font-family: 'Microsoft YaHei';
}
</style>
