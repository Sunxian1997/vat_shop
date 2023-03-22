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
			<view @click="toDetail(item)" v-for="item in commodityData" :key="item._id"><commodityCard :cardInfo="item"></commodityCard></view>
		</view>
	</view>
</template>

<script>
import commodityCard from '@/components/commodityCard/index.vue';
export default {
	components: {
		commodityCard
		// commodityCard: () => import('@/components/commodityCard/index.vue') 小程序此方法引用转换时会导致组件无法显示
	},
	data() {
		return {
			searchKey: '',
			commodityData: []
		};
	},
	onLoad() {
		this.getDatalist();
	},
	methods: {
		change() {},
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
			console.log('target---', target);
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
		margin-top: 40rpx;
	}

	.card-box:nth-last-child(0) {
		margin-bottom: 80rpx;
	}
}
</style>
