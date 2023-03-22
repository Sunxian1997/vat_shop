<script>
export default {
	globalData: {
		appid: 'wx786043dff39fa0cd',
		secret: '791fb139c031c4189d8dac3e333a2f8d'
	},
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
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
