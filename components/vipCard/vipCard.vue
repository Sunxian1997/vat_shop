<template>
	<view class="vipCard-box">
		<view class="left"><view class="title">平价商店会员</view>
		<view class="growth-value">
			<text class="title-value">成长值：11/999</text>
			<u-line-progress :percentage="30"  height="7" activeColor="white" :showText="false"></u-line-progress>
			<text>正在享受权益中</text>
		</view>
		</view>
		<view class="right"></view>
	</view>
</template>
 
<script>
export default {
	name: 'vipCard',
	data() {
		return {};
	}
};
</script>

<style lang="scss"  scoped>
.vipCard-box {
	text-align: left;
	height: 250rpx;
	width: 100%;
	padding: 30rpx 20rpx;
	box-sizing: border-box;
	border-radius: 20rpx;
	display: flex;
	background: linear-gradient(to top, #e7b6f3, 20%, #713ded);

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title{
			color: white;
			font-weight: 600;
			text-align: left;
		}
		.growth-value{
			color: white;
			.u-line-progress{
				margin: 10rpx 0 20rpx 0;
			}
		}
	}
	.right {
		width: 300rpx;
	}
}
</style>
