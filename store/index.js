import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		login: false,
		_id:'',
		openid: '',
		session_key: '',
		// 微信号
		unionId:'',
		avatarUrl: '',
		city: '',
		country: '',
		gender: '',
		is_demote: '',
		language: '',
		nickName: '',
		province: '',
	},
	mutations: {
		login(state, provider) {
			state.login = true;
			state._id = provider._id;
			state.unionId = provider.unionId;
			state.openid = provider.openid;
			state.session_key = provider.session_key;

			state.avatarUrl = provider.avatarUrl;
			state.city = provider.city;
			state.country = provider.country;
			state.gender = provider.gender;
			state.is_demote = provider.is_demote;
			state.language = provider.language;
			state.nickName = provider.nickName;
			state.province = provider.province;
		},
		logout(state) {
			state.login = false;
			state._id = '';
			state.unionId = '';
			state.openid = '';
			state.session_key = '';
			state.avatarUrl = '';
			state.city = '';
			state.country = '';
			state.gender = '';
			state.is_demote = '';
			state.language = '';
			state.nickName = '';
			state.province = '';
		}
	}
})
export default store
