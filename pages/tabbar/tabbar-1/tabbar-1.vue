<template>
	<view class="box">
		<view class="search-box">
			<u--input shape="circle" clearable prefixIcon="search" placeholder="请输入要查询的内容" border="surround"
				v-model="searchKey" @change="change">
				<template slot="suffix">
					<u-icon size="18" name="scan"></u-icon> 
				</template>
			</u--input>
			<text class="btn-search" @click="searchList">搜索</text>
		</view>
		<view class="card-box">
			
		<commodityCard v-for="item in commodityData" :cardInfo="item"></commodityCard>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			commodityCard:()=>import('@/components/commodityCard/index.vue')
		},
		data() {
			return {
				searchKey: '',
				commodityData:[]
			};
		},
		onLoad() {
			this.getDatalist()
		},
		methods: {
			change() {},
			searchList(){
				this.getDatalist()
			},
			getDatalist(){
				uniCloud.callFunction({
					name:"getCommodityList",
					data:{
						name:this.searchKey
					}
				}).then(res=>{
					this.commodityData = res.result
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		padding: 20rpx;
		.search-box{
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				margin-left: 20rpx;
			}
			.btn-search{
				font-size: 40rpx;
			}
		}
		.card-box{
			margin-top: 40rpx;
		}
	}
</style>
