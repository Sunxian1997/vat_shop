<template>
	<view>
		<u--input :type="urlParams.type === 'nickname' ? 'nickname' : ''" clearable placeholder="请输入" border="surround" v-model="formData[urlParams.type]"></u--input>
		<u-button text="完成" type="primary" @click="editUserInfo"></u-button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: {
		...mapState(['_id', 'login', 'avatarUrl', 'nickName', 'unionId'])
	},
	data() {
		return {
			urlParams: {},
			formData: {}
		};
	},
	onLoad(options) {
		this.urlParams = options;
		console.log('this.urlParams---', this.urlParams);
		switch (options.type) {
			case 'nickName':
				this.formData['nickName'] = this.nickName;
				break;
			case 'unionId':
				this.formData['unionId'] = this.unionId;
				break;
			default:
				break;
		}
		console.log('onLoad--options---', this.formData);
	},
	methods: {
		editUserInfo() {
			uniCloud
				.callFunction({
					name: 'users',
					data: {
						opration: 'update',
						_id: this._id,
						oprationData: {
							...this.formData
						}
					}
				})
				.then(res => {
					console.log('跟新用户数据返回的---', res);
					this.$store.commit('login', {
						...res.result.doc
					});
					uni.reLaunch({
						url: '/pages/tabbar/tabbar-5/tabbar-5'
					});
				});
		}
	}
};
</script>

<style></style>
