<template>
	<view class="box">
		<view class="card"> 
			<view class="left">
				<image src="@/static/img/pretty/boy.jpg" mode="aspectFill"></image>
				<text class="number">18055084483</text>
			</view> 
			<view class="right"><u-button class="custom-style" text="点击登录" @click="getUserInfo"></u-button></view>
		</view>
		<view class="vipCard"><vipCard></vipCard></view>
		<u-cell-group>
			<u-cell
				icon="fingerprint"
				title="隐私政策"
				:isLink="true"
				arrow-direction="right"
				:customStyle="{
					textAlign: 'left'
				}"
			></u-cell>
			<u-cell
				icon="map"
				title="用户服务协议"
				:isLink="true"
				:customStyle="{
					textAlign: 'left'
				}"
				arrow-direction="right"
			></u-cell>
			<u-cell
				icon="tags"
				title="经营信息公开"
				:isLink="true"
				:customStyle="{
					textAlign: 'left'
				}"
				arrow-direction="right"
			></u-cell>
			<u-cell
				icon="phone"
				title="问题反馈"
				:isLink="true"
				:customStyle="{
					textAlign: 'left'
				}"
				arrow-direction="right"
				url="/pages/tabbar/tabbar-5/problemFeedback/problemFeedback"
			></u-cell>
		</u-cell-group>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	components: {
		vipCard: () => import('@/components/vipCard/vipCard.vue')
	},
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
		// this.checkLogin();
		console.log('this.$store--', this.$store.state);
	},
	computed: {
		...mapState(['login'])
	},
	methods: {
		checkLogin() {
			if (!this.$store.state.login) {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		},
		getUserInfo() {
			const _this = this;
			uni.getUserProfile({
				desc: '用于完善会员资料',
				success: result => {
					_this.userInfo = result.userInfo;
					_this.wxLogin();
				},
				fail: () => {
					uni.hideLoading();
					uni.showModal({ content: '获取用户信息失败', showCancel: false });
				}
			});
		},
		wxLogin() {
			const _this = this;
			uni.showLoading({ title: '加载中' });

			uni.login({  
				provider: 'weixin', 
				success: res => {
					// 获取 code 
					if (res.code) { 
						uniCloud.callFunction({
							name: 'user',
							data: { action: 'code2Session', js_code: res.code, user_info: _this.userInfo },
							success: res => {
								console.log('云函数返回的值：：：：', res.result);
								uni.hideLoading();
								if (res.result.result.result._id) {
									uni.setStorageSync('userInfo', JSON.stringify(res.result.result.result));
									globalData.$UserInfo = res.result.result.result;
								}
							},
							fail: () => {
								uni.hideLoading();
								console.log('云函数调用失败');
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	height: 400rpx;
	padding: 20rpx;
	.card {
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 60rpx;
		.left {
			display: flex;
			flex: 1;
			align-items: center;
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				margin-right: 20rpx;
			}
		}
		.right {
			width: 200rpx;
			.custom-style {
				// box-sizing: border-box;
				// width: 200rpx;
				// padding: 0 20rpx !important;
			}
		}
	}
	.vipCard {
		margin-bottom: 40rpx;
	}
}
</style>
