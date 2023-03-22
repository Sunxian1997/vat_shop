
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({  
    state: {  
        login: false,  
        token: '',  
        avatarUrl: '',  
        userName: ''  ,
        openid: ''  ,
        session_key: ''  ,
		
    },  
    mutations: {  
        login(state, provider) {  
            state.login = true;  
            state.token = provider.token;  
            state.userName = provider.userName;  
            state.avatarUrl = provider.avatarUrl;
            state.openid = provider.openid;
            state.session_key = provider.session_key;
        },  
        logout(state) {  
            state.login = false;  
            state.token = '';  
            state.userName = '';  
            state.avatarUrl = ''; 
            state.openid = '';  
            state.session_key = '';  
        }  
    }  
})
export default store