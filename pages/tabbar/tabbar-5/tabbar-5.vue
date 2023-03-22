<template>
	<view class="box">
		<view class="card">
			<view class="wei-xin-box">
				<view class="icon-nickname">
					<view class="left"><img :src="login ? avatarUrl : loginInfo.avatarUrl" /></view>
					<view class="right">
						<view class="nickname-top">{{ nickName || '--' }}</view>
						<view class="wei-xin-number">{{ unionId || '--' }}</view>
					</view>
				</view>
				<!-- v-if="login" -->
				<view class="arrow-right"><u-icon size="28" name="arrow-right" @click="toUserDetail"></u-icon></view>
			</view>
			<view v-if="!login" class="login-btn"><u-button class="custom-style" text="点击登录" @click="loginUser"></u-button></view>
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
			<u-cell
				icon="setting"
				title="设置"
				:isLink="true"
				:customStyle="{
					textAlign: 'left'
				}"
				arrow-direction="right"
				url="/pages/tabbar/tabbar-5/setting/setting"
			></u-cell>
		</u-cell-group>
		<u-toast ref="uToast"></u-toast>
		<u-popup mode="bottom" :round="40" :show="popupShow" :closeOnClickOverlay="false" @close="popupClose" @open="popupOpen">
			<view class="user-info">
				<view class="brief-introduction">获取你的昵称、头像、地区及性别</view>
				<u-line></u-line>
				<view class="base-info">
					<view class="left"><img :src="loginInfo.avatarUrl" /></view>
					<view class="right">
						<view class="nickname-top">{{ loginInfo.nickName }}</view>
						<view class="introduction-bottom">微信个人信息</view>
						<view class="checkbox-mark-center"><u-icon name="checkbox-mark" color="#29a338" size="28"></u-icon></view>
					</view>
				</view>
				<u-line></u-line>
				<view class="footer">
					<view class="cancle"><u-button text="取消" @click="cancle"></u-button></view>
					<view class="pecrmitLogin"><u-button text="允许" type="success" @click="pecrmitLogin"></u-button></view>
				</view>
			</view>
		</u-popup>
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
			popupShow: false,
			loginInfo: {
				unionId: '',
				openid: '',
				session_key: '',
				avatarUrl: require('../../../static/img/pretty/boy.jpg'),
				city: '',
				country: '',
				gender: 0,
				is_demote: true,
				language: '',
				nickName: '微信用户',
				province: ''
			}
		};
	},
	onLoad() {
		// this.checkLogin();
		console.log('this.$store--', this.$store.state);
	},
	computed: {
		...mapState(['login', 'avatarUrl', 'nickName','unionId'])
	},
	methods: {
		toUserDetail() {
			uni.navigateTo({
				url: '/pages/tabbar/tabbar-5/userDetail/userDetail'
			});
		},
		popupClose() {
			this.popupShow = false;
		},
		cancle() {
			this.loginInfo = {
				unionId: '',
				openid: '',
				session_key: '',
				avatarUrl: '',
				city: '',
				country: '',
				gender: 0,
				is_demote: true,
				language: '',
				nickName: '微信用户',
				province: ''
			};
			this.popupShow = false;
		},
		pecrmitLogin() {
			this.getUser();
		},
		popupOpen() {},
		checkLogin() {
			if (!this.$store.state.login) {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		},
		async loginUser() {
			console.log('this.$store.state', this.$store.state);
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
							this.popupShow = true;
							this.$refs.uToast.show({
								title: '获取用户信息成功',
								type: 'success',
								position: 'top'
							});
							console.log('获取到openid', result);
							const { openid, session_key } = result.data;
							this.loginInfo = {
								...this.loginInfo,
								openid,
								session_key
							};
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
		},
		// 调用接口将用户信息传到云上
		getUser() {
			uniCloud
				.callFunction({
					name: 'users',
					data: this.loginInfo
				})
				.then(res => {
					console.log('注测用户信息接口---', res);
					// 本地记录登录用户
					this.$store.commit('login', {
						...this.loginInfo,
						...res.result
					});
					this.popupShow = false;
					this.$refs.uToast.show({
						title: '用户信息登录成功',
						type: 'success',
						position: 'top'
					});
					console.log('本地vuex保存信息---', this.$store.state);
				})
				.catch(err => {
					this.$refs.uToast.show({
						title: '用户信息登录失败，请重新尝试',
						type: 'error',
						position: 'top'
					});
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
		.wei-xin-box {
			display: flex;
			flex: 1;
			align-items: center;

			.icon-nickname {
				height: 100%;
				display: flex;
				align-items: center;
				flex: 1;
				.left {
					img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 60rpx;
						margin-right: 20rpx;
					}
				}
				.right {
					.nickname-top {
						font-size: 36rpx;
						margin-bottom: 10rpx;
					}
					.wei-xin-number {
						color: #3c3c3c;
					}
				}
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
	.user-info {
		padding: 20rpx;
		background-color: #ffffff;
		.brief-introduction {
			font-size: 32rpx;
			color: #333333;
			margin-bottom: 20rpx;
		}
		.base-info {
			padding: 20rpx 0rpx;
			display: flex;
			.left {
				img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 20rpx;
					margin-right: 30rpx;
				}
			}

			.right {
				flex: 1;
				position: relative;
				.nickname-top {
					font-size: 40rpx;
					color: #333333;
					position: absolute;
					top: 0;
				}
				.introduction-bottom {
					font-size: 32rpx;
					color: #3c3c3c;
					position: absolute;
					bottom: 0;
				}

				.checkbox-mark-center {
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		.footer {
			display: flex;
			padding-top: 40rpx;
			.pecrmitLogin,
			.cancle {
				flex: 1;
				width: auto;
				padding: 0rpx 60rpx;
			}
		}
	}
}
</style>
