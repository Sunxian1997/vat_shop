<template>
	<view class="box">
		<view class="card">
			<view class="left">
				<image src="@/static/img/pretty/boy.jpg" mode="aspectFill"></image>
				<text class="number">18055084483</text>
			</view>
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
	</view>
</template>

<script>
export default {
	components: {
		vipCard: () => import('@/components/vipCard/vipCard.vue')
	},
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		loginUser() {
			uni.login({
			    provider: 'weixin',
			    success: function (loginRes) {
			        // 登录成功
			        uni.getUserInfo({
			            provider: 'weixin',
			            success: function(info) {
			                // 获取用户信息成功, info.authResult保存用户信息
			            }
			        })
			    },
			    fail: function (err) {
			        // 登录授权失败  
			        // err.code是错误码
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
