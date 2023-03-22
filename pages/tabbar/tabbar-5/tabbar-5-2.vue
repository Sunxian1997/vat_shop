<template>
	<view class="box">
		<view class="card">
			<view class="left">
				<image src="@/static/img/pretty/boy.jpg" mode="aspectFill"></image>
				<text class="number">18055084483</text>
			</view>
			登录状态{{ login }}
			<view class="right"><u-button class="custom-style" text="点击登录" @click="loginUser"></u-button></view>
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
		async loginUser() {
			// uni.getUserProfile({
			// 	desc: '用于完善会员资料',
			// 	success: result => {
			// 		console.log('result--', result);
			// 	},
			// 	fail: () => {
			// 	}
			// });
			this.$store.commit('login', {
				login:true,
				openid:"66666666666"
			});
			uni.login({
				success: res => {
					console.log('uni.login--', res);
					const { appid, secret } = getApp().globalData;
					//wx接口路径
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
					uni.request({
						url: url, // 请求路径
						method: 'GET', //请求方式
						success: result => {
							this.$refs.uToast.show({
								title: '登录成功',
								type: 'success',
								position: 'top'
							});
							console.log('获取到openid', result);
							//获取到openid
							this.openId = result.data.openid;
						},
						fail: err => {
							this.$refs.uToast.show({
								title: '获取用户信息失败',
								type: 'error',
								position: 'top'
							});
						} //失败
					});
				},
				fail: err => {
					console.log(err);
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
