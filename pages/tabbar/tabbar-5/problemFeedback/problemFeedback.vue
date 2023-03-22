<template>
	<view class="container">
		<view class="quick-contact-information">
			<view class="box">
				<u-icon name="chat" size="32" color="green"></u-icon>
				<text class="phone">_yiHan2022</text>
			</view>
			<view class="box" @click="callPhone">
				<u-icon name="phone" size="32" color="green"></u-icon>
				<a class="phone callPhone">{{`18055084483`.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')}}</a>
			</view>
		</view>
		<view class="grid-problemFeedback">
			<view class="grid-item">
				<text class="title">姓名：</text>
				<view class="value"><u--input placeholder="请输入姓名" border="surround" v-model="formData.feedbackPersonName"></u--input></view>
			</view>
			<view class="grid-item">
				<text class="title">联系方式：</text>
				<view class="value"><u--input maxlength="11" placeholder="请输入联系方式" border="surround" v-model="formData.feedbackPersonPhone"></u--input></view>
			</view>
			<view class="grid-item">
				<text class="title">详细说明：</text>
				<view class="value"><u--textarea count showConfirmBar border="bottom" v-model="formData.feedback" placeholder="请输入问题说明" /></view>
			</view>
		</view>
		<view class="confirm-btn"><u-button type="primary" text="提交" @click="confirmFeedback"></u-button></view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { isPhone } from '@/utils/validate';
export default {
	data() {
		return {
			formData: {
				feedbackPersonName: '',
				feedbackPersonPhone: '',
				feedback: ''
			}
		};
	},
	methods: {
		callPhone() {
			wx.makePhoneCall({
				phoneNumber: '18055084483',
				success: function() {
					this.$refs.uToast.show({
						title: '拨打电话成功',
						type: 'success',
						position: 'top'
					});
				},
				fail: function() {
					this.$refs.uToast.show({
						title: '拨打电话失败',
						type: 'error',
						position: 'top'
					});
				}
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.$refs.uToast.show({
						title: '登录成功',
						type: 'success',
						position: 'bottom',
						duration: 1000
					});
					//选项卡页面只能使用switchTab来跳转
					uni.switchTab({
						url: '/pages/news/workbench'
					});
				} else {
					this.$refs.uToast.show({
						title: '登录失败',
						type: 'error',
						position: 'bottom'
					});
				}
			});
		},
		confirmFeedback() {
			const { feedbackPersonName, feedbackPersonPhone, feedback } = this.formData;
			if (!feedbackPersonName) {
				return this.$refs.uToast.show({
					message: '请填写联系人姓名',
					type: 'error'
				});
			} else if (!isPhone(feedbackPersonPhone) || !feedbackPersonPhone) {
				return this.$refs.uToast.show({
					message: '手机格式不正确',
					type: 'error'
				});
			} else if (!feedback) {
				return this.$refs.uToast.show({
					message: '请填写详细说明',
					type: 'error'
				});
			} else {
				uniCloud
					.callFunction({
						name: 'addFeedBack',
						data: {
							...this.formData
						}
					})
					.then(res => {
						console.log('res', res);
						if (res)
							this.$refs.uToast.show({
								message: '提交反馈成功',
								type: 'success'
							});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/tabbar/tabbar-5/tabbar-5'
							});
						}, 1000);
					});
			}
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {}
};
</script>
<style lang="scss" scoped>
.container {
	padding: 20rpx;
	font-size: 14rpx;
	line-height: 24rpx;
	background-color: #fff;
	height: 100vh;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	.quick-contact-information {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 60rpx;
		.box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			.phone {
				font-size: 32rpx;
				margin-left: 12rpx;
			}
			.callPhone {
			}
		}
	}
	.grid-problemFeedback {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.grid-item {
			width: 100%;
			margin-bottom: 40rpx;
			display: flex;
			font-size: 32rpx;
			.title {
				width: 180rpx;
				margin-left: 12rpx;
				display: inline-block;
				padding-bottom: 12rpx;
			}
			.value {
				flex: 1;
			}
		}
	}
	.confirm-btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
	}
}
</style>
