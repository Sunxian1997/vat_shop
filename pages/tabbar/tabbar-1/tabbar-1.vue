<template>
	<view class="box">
		<u-sticky>
			<view class="search-box">
				<u--input shape="circle" clearable prefixIcon="search" placeholder="请输入要查询的内容" border="surround"
					v-model="searchKey" @change="change">
					<template slot="suffix">
						<uni-icons type="scan" size="18"></uni-icons>
					</template>
				</u--input>
				<text class="btn-search" @click="searchList">搜索</text>
			</view>
		</u-sticky>
		<view class="card-box">
			<view @click="toDetail(item)" v-for="item in commodityData" :key="item.id">
				<commodityCard  :cardInfo="item" ></commodityCard>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			commodityCard: () => import('@/components/commodityCard/index.vue')
		},
		data() {
			return {
				searchKey: '',
				commodityData: []
			};
		},
		onLoad() {
			this.getDatalist()
		},
		methods: {
			change() {},
			searchList() {
				this.getDatalist()
			},
			toDetail(target) {
				console.log('target---',target)
				uni.navigateTo({
					url: "/pages/commodity/detail/detail?id="+target._id
				})
			},
			getDatalist() {
				uniCloud.callFunction({
					name: "getCommodityList",
					data: {
						name: this.searchKey
					}
				}).then(res => {
					this.commodityData = res.result
				})
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
			background: #fff;

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
