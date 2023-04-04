<template>
	<view class="publish-box">
		<u-empty mode="car" text=" " icon="http://cdn.uviewui.com/uview/empty/car.png"><u-button type="primary" text="去添加商品" @click="toAdd"></u-button></u-empty>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['login', 'avatarUrl', 'nickName', 'unionId'])
	},
	onTabItemTap(e) {
		
	},
	onLoad() {},
	onShow() {},
	onHide() {},
	methods: {
		toAdd() {
			// 判断是否已经登录了账号，没有的话提示先登录
			// if (!this.login) {
			// 	this.$refs.uToast.show({
			// 		message: '请登陆后再进行操作',
			// 		type: 'error',
			// 		position: 'top'
			// 	});
			// } else {
				uni.navigateTo({
					url: '/pages/commodity/add/index'
				});
			// }
		}
	}
};
</script>

<style lang="scss" scoped>
.publish-box {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
