<template>
	<view class="detail-box">
		<view class="gird">
			<view class="grid-item">
				<text class="title">名称：</text>
				<text class="value">{{ detailForm.name }}</text>
			</view>
			<view class="grid-item">
				<text class="title">价格：</text>
				<text class="value">¥ {{ formaatMoney(detailForm.price) }}</text>
			</view>
			<view class="grid-item">
				<text class="title">保质期：</text>
				<text class="value">{{ detailForm.qualityGuaranteePeriod }}天</text>
			</view>
			<view class="grid-item">
				<text class="title">生产日期：</text>
				<text class="value">{{ detailForm.produceDate }}</text>
			</view>
			<view class="grid-item">
				<text class="title">备注：</text>
				<text class="value">{{ detailForm.remark }}</text>
			</view>
		</view>
		<view class="file-box">
			<view class="file-item" v-for="(item, index) in detailForm.picUrls" :key="index"><image draggable :src="item" mode="scaleToFill"></image></view>
			<!-- <u-swiper :list="detailForm.picUrls"></u-swiper> -->
		</view>
		<u-modal :show="isShowModal" @confirm="modalConfirm" title="删除商品" showCancelButton @cancel="modalCancle">
			<view class="" v-slot="content">删除后不可恢复，是否确认删除？</view>
		</u-modal>
		<uni-fab ref="fab" :pattern="uniFabParent.pattern" :content="uniFabParent.content" horizontal="right" vertical="bottom" @trigger="trigger" />
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
import { uniFabParent } from '@/const/const.js';
export default {
	data() {
		return {
			isShowModal: false,
			uniFabParent,
			detailForm: {}
		};
	},
	onLoad(e) {
		const { id } = e;
		this.getDetail(id);
	},
	methods: {
		modalCancle() {
			this.isShowModal = !this.isShowModal;
		},
		modalConfirm() {
			this.deleteCommodity(this.detailForm._id);
		},
		trigger(e) {
			console.log('trigger', e);
			if (e.index == 0) {
				this.isShowModal = !this.isShowModal;
			} else if (e.index == 1) {
				uni.reLaunch({
					url: '/pages/commodity/edit/edit?id='+this.detailForm._id
				});
			}
		},
		formaatMoney(nomey) {
			return uni.$u.priceFormat(nomey, 2);
		},
		deleteCommodity(id) {
			uniCloud
				.callFunction({
					name: 'deleteCommodity',
					data: {
						id
					}
				})
				.then(res => {
					this.$refs.uNotify.show({
						top: 0,
						type: 'success',
						color: '#fff',
						message: '删除商品成功',
						duration: 1000 * 1,
						fontSize: 20,
						safeAreaInsetTop: true
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/tabbar/tabbar-1/tabbar-1'
						});
					}, 1000);
				});
		},
		getDetail(id) {
			uniCloud
				.callFunction({
					name: 'getCommodityDetail',
					data: {
						id
					}
				})
				.then(res => {
					console.log('获取商品详情---', res);
					this.detailForm = res.result[0];
					uni.setNavigationBarTitle({
						title: this.detailForm.name
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-box {
	padding: 20rpx;
	.gird {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.grid-item {
			width: 100%;
			margin-bottom: 40rpx;
			display: flex;
			.title {
				width: 180rpx;
				display: inline-block;
			}
			.value {
				flex: 1;
			}
		}
	}
	.file-box {
		display: flex;
		flex-wrap: wrap;
		.file-item {
			margin: 20rpx;
			width: 180rpx;
			height: 180rpx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
				will-change: transform;
			}
		}
	}
}
</style>
