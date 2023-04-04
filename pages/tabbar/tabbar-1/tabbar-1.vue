<template>
	<view class="box">
		<u-sticky>
			<view class="search-box">
				<u-input clearable shape="circle" clearable prefixIcon="search" placeholder="请输入要查询的内容" border="surround" v-model="searchKey" @change="change">
					<template slot="suffix">
						<uni-icons @click="scanningCode" type="scan" size="18"></uni-icons>
					</template>
				</u-input>
				<text class="btn-search" @click="searchList">搜索</text>
			</view>
		</u-sticky>
		<view class="card-box"> 
			<u-swipe-action autoClose>
				<view v-for="item in commodityData" :key="item._id" class="commodity-card-box">
					<u-swipe-action-item
						@click="
							props =>  oprationHandler(props, item)
						"
						:name="isFavorite(item.favoriteList) ? 'cancleFavorite' : 'addFavorite'"
						:options="isFavorite(item.favoriteList) ? isfavoriteFlase : isfavoriteTrue"
					>
						<commodityCard :cardInfo="item" @click.native="toDetail(item)"></commodityCard>
					</u-swipe-action-item>
				</view>
			</u-swipe-action>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import commodityCard from '@/components/commodityCard/index.vue';
export default {
	computed: {
		...mapState(['login', 'avatarUrl', 'nickName', 'unionId', 'openid'])
	},
	components: {
		commodityCard
		// commodityCard: () => import('@/components/commodityCard/index.vue') 小程序此方法引用转换时会导致组件无法显示
	},
	data() {
		return {
			searchKey: '',
			commodityData: [],
			isfavoriteTrue: [
				{
					text: '添加收藏',
					style: {
						backgroundColor: '#f7e4e8'
					}
				}
			],
			isfavoriteFlase: [
				{
					text: '取消收藏',
					style: {
						backgroundColor: '#f7e4e8'
					}
				}
			]
		};
	},
	onLoad() {
		this.getDatalist();
	},
	onShow() {
		this.getDatalist(); 
	},
	methods: {
		isFavorite(favoriteList) {
			return favoriteList.indexOf(this.openid) !== -1;
		},
		change() {},
		// 滑动卡片按钮点击事件
		oprationHandler(props, item) {
			// name: props参数name的值，index: 第几个按钮被点击
			const { name, index } = props;
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
						opration: name, 
						openid: this.openid,
						commodityInfo: item 
					}
				}) 
				.then(res => { 
					this.$refs.uToast.show({
						type: 'success',
						message: `${name=='cancleFavorite'? '取消成功':'添加成功'}`,
						position: 'top'
					});
					// 重新刷新列表
					this.getDatalist();
				});
		}, 
		// 调用扫码查询
		scanningCode() {
			uni.scanCode({
				success: res => {
					const { result } = res;
					this.searchKey = result;
				}
			});
		},
		searchList() {
			this.getDatalist();
		},
		toDetail(target) {
			uni.navigateTo({
				url: '/pages/commodity/detail/detail?id=' + target._id
			});
		},
		getDatalist() {
			uniCloud
				.callFunction({
					name: 'getCommodityList',
					data: {
						searchKey: this.searchKey
					}
				})
				.then(res => {
					this.commodityData = res.result;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	padding: 20rpx;

	.search-box {
		display: flex;
		align-items: center;
		justify-content: center;
		// background: #fff;

		text {
			margin-left: 20rpx;
		}

		.btn-search {
			font-size: 40rpx;
		}
	}

	.card-box {
		.commodity-card-box {
			margin-top: 40rpx;
		}
		// .u-swipe-action-item__right{
		// 	top: 50%;
		// 	transform: translateY(-50%);
		// }
	}

	.card-box:nth-last-child(0) {
		margin-bottom: 80rpx;
	}
}
</style>
