<template>
	<view class="card-box">
		<view class="card-image"><image :src="getImageUrl()" mode="scaleToFill" /></view>
		<view class="card-info">
			<view class="commodity-name">{{ cardInfo.name }}</view>
			<view>¥ {{ formaatMoney(cardInfo.price) }}</view>
			<view class="commodity-date-collect">
				<uni-dateformat :date="cardInfo.posttime" :threshold="[60000, 3600000]" format="MM-dd"></uni-dateformat>
				<view class="collect">收藏数：{{cardInfo.favoriteList.length||'--'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'commodityCard',
	props: {
		cardInfo: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {};
	},

	methods: {
		getImageUrl() {
			const { picUrls } = this.cardInfo;
			return picUrls ? picUrls[0] : '';
		},
		formaatMoney(nomey) {
			return uni.$u.priceFormat(nomey, 2);
		}
	}
};
</script>

<style lang="scss" scoped>
.card-box {
	// margin-bottom: 40rpx;
	height: 200rpx;
	width: 100%;
	border-radius: 20rpx;
	padding: 10rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
	box-sizing: border-box;

	.card-image {
		width: 200rpx;
		height: 180rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
	}

	.card-info {
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
		justify-content: space-between;
		.commodity-name {
			font-size: 50rpx;
		}
		.commodity-date-collect{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
}
</style>
