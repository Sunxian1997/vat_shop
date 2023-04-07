<script>
export default {
	globalData: {
		
	},
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow: function() {
		console.log('App Show');
		this.getWeChatApplet()
	}, 
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		getWeChatApplet(){
			uniCloud.callFunction({
				name:"getWeChatApplet"
			}).then(res=>{
				getApp().globalData.appid = res.result[0].appid
				getApp().globalData.secret = res.result[0].secret
			})
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';

uni-page-body,
html,
body {
	height: 100%;
}
</style>
