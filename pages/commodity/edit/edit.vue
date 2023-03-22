<template>
	<view class="box">
		<u-notify ref="uNotify"></u-notify>
		<uni-card title="基本信息" class="form-card">
			<u--form labelPosition="left" labelWidth="80" :model="formData" :rules="rules" ref="formComponent">
				<u-form-item label="名称" prop="baseInfo.name" borderBottom>
					<u--input placeholder="请输入名称" border="surround" v-model="formData.baseInfo.name"></u--input>
				</u-form-item>
				<u-form-item label="商品编码" prop="baseInfo.commodityCode" borderBottom>
					<u-input placeholder="请输入商品编码" border="surround" v-model="formData.baseInfo.commodityCode">
						<template slot="suffix">
							<uni-icons @click="scanningCode" type="scan" size="18"></uni-icons>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="价格" prop="baseInfo.price" borderBottom>
					<u--input type="digit" placeholder="请输入价格" border="surround" v-model="formData.baseInfo.price"></u--input>
				</u-form-item>

				<u-form-item label="保质期" borderBottom>
					<view class="quality-guarantee-period-box">
						<view class="quality-guarantee-period"><u-slider v-model="formData.baseInfo.qualityGuaranteePeriod" min="0" max="480"></u-slider></view>
						<view class="quality-guarantee-period-type">
							<text>{{ formData.baseInfo.qualityGuaranteePeriod }}天</text>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="生产日期" prop="baseInfo.produceDate" borderBottom><uni-datetime-picker type="date" v-model="formData.baseInfo.produceDate" /></u-form-item>
			</u--form>
			<view class="remak-box"><u--textarea count showConfirmBar border="bottom" v-model="formData.baseInfo.remark" placeholder="请输入商品详情说明"></u--textarea></view>
			<view class="file-box"><uni-file-picker v-model="tempPicUrls" fileMediatype="image" mode="grid" @success="success" /></view>
		</uni-card>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" @trigger="trigger" />
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			},
			content: [
				{
					iconPath: '/static/img/pretty/reset.png',
					selectedIconPath: '/static/img/pretty/reset.png',
					text: '重置',
					active: false
				},
				{
					iconPath: '/static/img/pretty/add.png',
					selectedIconPath: '/static/img/pretty/add.png',
					text: '保存',
					active: false
				}
			],
			tempPicUrls: [],
			picUrls: [],
			formData: {
				baseInfo: {
					remark: '',
					qualityGuaranteePeriod: '',
					commodityCode: ''
				}
			},
			rules: {
				'baseInfo.name': {
					type: 'string',
					required: true,
					message: '请填写商品名称',
					trigger: ['blur', 'change']
				},
				'baseInfo.commodityCode': {
					type: 'string',
					required: true,
					message: '请填写商品代码',
					trigger: ['blur', 'change']
				},
				'baseInfo.price': {
					type: 'string',
					required: true,
					message: '请填写商品价格',
					trigger: ['blur', 'change']
				},
				'baseInfo.qualityGuaranteePeriod': {
					type: 'string',
					required: false,
					message: '请填写商品保质期',
					trigger: ['blur', 'change']
				},
				'baseInfo.produceDate': {
					type: 'string',
					required: false,
					message: '请填写商品生产日期',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	onReady() {
		this.$refs.formComponent.setRules(this.rules);
	},
	onLoad(e) {
		this.getDetail(e.id);
	},
	methods: {
		trigger(e) {
			const { index } = e;
			if (index === 0) {
				this.formData = {
					baseInfo: {}
				};
				this.tempPicUrls = [];
				this.picUrls = [];
			} else if (index === 1) {
				this.$refs.formComponent
					.validate()
					.then(res => {
						const params = {
							...this.formData.baseInfo,
							picUrls: this.picUrls
						};
						console.log('params---', params);
						uniCloud
							.callFunction({
								name: 'uploadCommodity',
								data: params
							})
							.then(res => {
								this.$refs.uToast.show({
									message: '更新商品成功',
									type: 'success'
								});
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/tabbar/tabbar-1/tabbar-1'
									});
								}, 2000);
							});
					})
					.catch(errors => {
						uni.$u.toast('请按照要求填写信息');
					});
			}
		},
		// 上传成功
		success(e) {
			const { tempFiles, tempFilePaths } = e;
			this.picUrls = tempFilePaths;
		},

		// 调用扫码查询
		scanningCode() {
			uni.scanCode({
				success: res => {
					const { result } = res;
					this.formData.baseInfo.commodityCode = result;
				}
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
					this.formData.baseInfo = res.result[0];
					this.tempPicUrls = res.result[0].picUrls.map((item, index) => {
						return {
							name: `图片-${index}`,
							extname: 'png',
							url: item
						};
					});
					this.picUrls = res.result[0].picUrls;
					uni.setNavigationBarTitle({
						title: this.formData.baseInfo
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	padding: 20rpx;

	.form-card {
		min-height: 100%;

		.quality-guarantee-period-box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			.quality-guarantee-period {
				flex: 1;
				width: 100%;
			}

			.quality-guarantee-period-type {
				max-width: 120rpx;
				text-align: right;
			}
		}

		.file-box {
			margin-top: 20rpx;
		}

		.remak-box {
			margin-top: 20rpx;
		}
	}
}
</style>
