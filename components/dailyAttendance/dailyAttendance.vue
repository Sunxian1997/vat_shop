<template>
	<view
		@click="toDailyAttendance"
		class="dailyAttendance-main"
		:class="[
			{
				'dailyAttendance-main-checked': isAttendance
			}
		]"
	>
		<img src="@/static/img/oprationIcon/qiandao.png" />
		<text>{{ isAttendance ? '已签' : '签到' }}</text>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { getCurrentDate } from '@/utils/validate';
export default {
	name: 'dailyAttendance',
	props: {
		lastDailyAttendance: {
			type: String,
			default: () => ''
		}
	},
	data() {
		return {
			title: '签到'
			// isAttendance: false
		};
	},
	computed: {
		...mapState(['login', 'openid']),
		isAttendance() {
			return Date.parse(this.lastDailyAttendance) > Date.parse(getCurrentDate('yyyy-mm-dd 00:00:00'));
		}
	},
	watch: {
		isAttendance: {
			handler(val) {
				if (val) {
					this.title = val ? '已签' : '签到';
				}
			},
			immediate: true
		}
	},
	methods: {
		toDailyAttendance() {
			if (!this.login)
				return this.$refs.uToast.show({
					message: '请先登陆后再签到',
					type: 'error',
					position: 'top'
				});
			if (this.isAttendance)
				return this.$refs.uToast.show({
					message: '已签到，请明日再来',
					type: 'error',
					position: 'top'
				});
			uniCloud
				.callFunction({
					name: 'dailyAttendance',
					data: {
						openid: this.openid,
						currentDate: getCurrentDate()
					}
				})
				.then(res => {
					console.log('签到接口返回', res);
					this.$refs.uToast.show({
						message: '签到成功，明天再来',
						type: 'success',
						position: 'top'
					});
					// 重新请求用户数据
					this.$emit('reFresh');
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.dailyAttendance-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	width: 200rpx;
	height: 60rpx;
	border-radius: 50rpx;
	background-color: #62d1fa;
	img {
		width: 50rpx;
		height: 50rpx;
	}
	text {
		color: #fff;
	}
}
.dailyAttendance-main-checked {
	background-color: #b8b8b9;
}
</style>
