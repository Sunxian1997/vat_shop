<template>
	<view class="user-detai-box">
		<view class="user-detai-grid">
			<view class="user-detai-grid-item">
				<view class="title">名字</view>
				<view class="right">
					<view class="content">{{ nickName || '--' }}</view>
					<view class="icon"><u-icon name="arrow-right" @click="toEditUserInfo('nickName')"></u-icon></view>
				</view>
			</view>
			<view class="user-detai-grid-item">
				<view class="title">微信号</view>
				<view class="right">
					<view class="content">{{ unionId || '--' }}</view>
					<view class="icon"><u-icon name="arrow-right" @click="toEditUserInfo('unionId')"></u-icon></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['login', 'avatarUrl', 'nickName','unionId'])
	},
	methods: {
		toEditUserInfo(type){
			uni.navigateTo({
				url: '/pages/tabbar/tabbar-5/userDetail/editUserInfo/editUserInfo?type=' + type,
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.user-detai-box {
	.user-detai-grid {
		display: flex;
		flex-wrap: wrap;
		.user-detai-grid-item {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 10rpx 0rpx;
			margin: 0 20rpx;
			border-bottom: 1rpx solid #dee1e6;
			.title {
			}
			.right {
				flex: 1;
				display: flex;
				text-align: right;
				align-items: center;
				.content {
					flex: 1;
				}
				.icon {
				}
			}
		}
	}
}
</style>
