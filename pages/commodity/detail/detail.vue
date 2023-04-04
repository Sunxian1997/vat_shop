<template>
	<view class="detail-box">
		<view class="gird">
			<view class="grid-item">
				<text class="title">名称：</text>
				<text class="value">{{ detailForm.name }}</text>
			</view>
			<view class="grid-item">
				<text class="title">商品编码：</text>
				<text class="value">{{ detailForm.commodityCode }}</text>
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
		</view>

		<uni-fab ref="fab" :pattern="uniFabParent.pattern" :content="uniFabParent.content" horizontal="right" vertical="bottom" @trigger="trigger" />
		<u-toast ref="uToast"></u-toast>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" :is-mask-click="false" background-color="#fff">
			<view class="popup-box">
				<view class="title">删除后不可恢复，请按照提示输入</view>
				<u--input shape="circle" placeholder="我确认删除" border="surround" v-model="deleteMsg"></u--input>
				<view class="footer">
					<u-button text="取消" @click="closePopup"></u-button>
					<u-button type="primary" @click="confirmPopup" text="确定"></u-button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			deleteMsg: '',
			// uniFabParent:,
			detailForm: {}
		};
	},
	onLoad(e) {
		const { id } = e;
		this.getDetail(id);
	},
	computed: { 
		...mapState(['login', 'openid']),
		isFavorite() {
			const { favoriteList } = this.detailForm;
			return favoriteList && favoriteList.indexOf(this.openid) !== -1;
		},
		uniFabParent(){
			return  {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [
					{
						iconPath: '/static/img/oprationIcon/delete.png',
						selectedIconPath: '/static/img/oprationIcon/delete.png',
						text: '删除',
						active: false
					},
					{
						iconPath: '/static/img/oprationIcon/edit.png',
						selectedIconPath: '/static/img/oprationIcon/edit.png',
						text: '编辑',
						active: false
					},
					{
						iconPath: '/static/img/oprationIcon/edit.png',
						selectedIconPath: '/static/img/oprationIcon/edit.png',
						text: this.isFavorite ? '取消收藏': '添加收藏',
						active: false
					}
				]
			}
		}
	},
	methods: {
		confirmPopup() {
			if (this.deleteMsg != '我确认删除') {
				this.$refs.uToast.show({
					message: '输入内容不正确',
					type: 'error',
					position: 'top'
				});
			} else {
				this.deleteCommodity(this.detailForm._id);
			}
		},
		closePopup() {
			this.$refs.popup.close();
		},
		trigger(e) {
			console.log('trigger', e);
			if (e.index == 0) {
				// this.$refs.confirmDeletionDialog.open();
				this.$refs.popup.open('bottom');
			} else if (e.index == 1) { 
				uni.navigateTo({
					url: '/pages/commodity/edit/edit?id=' + this.detailForm._id
				});
			} else if (e.index == 2) {
				if (!this.login)
					return this.$refs.uToast.show({
						type: 'error',
						message: '请先登录再操作',
						position: 'top'
					});
				// 执行更新商品信息
				uniCloud
					.callFunction({
						name: 'uploadCommodity',
						data: {
							opration: this.isFavorite ? 'cancleFavorite' : 'addFavorite',
							openid: this.openid,
							commodityInfo: this.detailForm
						}
					})
					.then(res => {
						this.$refs.uToast.show({
							type: 'success',
							message: `${this.isFavorite ? '取消':'添加'}收藏成功`,
							position: 'top'
						});
						// 重新获取商品详情信息
						this.getDetail(this.detailForm._id);
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
					this.$refs.uToast.show({
						title: '删除商品成功',
						type: 'success',
						position: 'top'
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
	.popup-box {
		padding: 20rpx;
		.title {
			text-align: center;
			font-weight: 600;
			color: #3c3c3c;
			margin-bottom: 20rpx;
		}
		.footer {
			display: flex;
			margin-top: 20rpx;
		}
	}
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
