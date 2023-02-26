<template>
	<view>
		{{detailForm.name}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailForm:{}
			};
		},
		onLoad(e) {
			const{id} =e
			this.getDetail(id)
		},
		methods:{
			getDetail(id){
				uniCloud.callFunction({
					name:"getCommodityDetail",
					data:{
						id
					}
				}).then(res=>{
					console.log('获取商品详情---',res)
					this.detailForm = res.result[0]
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
