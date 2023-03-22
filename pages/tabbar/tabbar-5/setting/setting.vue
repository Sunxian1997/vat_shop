<template>
	<view class="setting-box">
		<view class="footer">
			<u-button text="退出登录" @click="loginOut"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginOut(){
				 this.$store.commit('logout')
				 uni.reLaunch({
				 	url:'/pages/tabbar/tabbar-5/tabbar-5'
				 })
			}
		}
	}
</script>

<style lang="scss" scoped>
.setting-box{
	position: relative;
	height: 100%;
	.footer{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
