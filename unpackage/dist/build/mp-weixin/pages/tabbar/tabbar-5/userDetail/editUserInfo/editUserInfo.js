(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/tabbar-5/userDetail/editUserInfo/editUserInfo"],{"2ce5":function(t,e,n){"use strict";n.r(e);var r=n("bc73"),a=n("705f");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var u=n("f0c5"),i=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);e["default"]=i.exports},"4db3":function(t,e,n){"use strict";(function(t,e){var r=n("4ea4");n("2fe1"),n("a9ff");r(n("66fd"));var a=r(n("2ce5"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"705f":function(t,e,n){"use strict";n.r(e);var r=n("cc62"),a=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},bc73:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"af4a"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"6426"))}},a=function(){var t=this.$createElement;this._self._c},o=[]},cc62:function(t,e,n){"use strict";(function(t,r){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("9523")),u=n("26cb");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var f={computed:c({},(0,u.mapState)(["_id","login","avatarUrl","nickName","unionId"])),data:function(){return{urlParams:{},formData:{}}},onLoad:function(t){switch(this.urlParams=t,console.log("this.urlParams---",this.urlParams),t.type){case"nickName":this.formData["nickName"]=this.nickName;break;case"unionId":this.formData["unionId"]=this.unionId;break;default:break}console.log("onLoad--options---",this.formData)},methods:{editUserInfo:function(){var e=this;t.callFunction({name:"users",data:{opration:"update",_id:this._id,oprationData:c({},this.formData)}}).then((function(t){console.log("跟新用户数据返回的---",t),e.$store.commit("login",c({},t.result.doc)),r.reLaunch({url:"/pages/tabbar/tabbar-5/tabbar-5"})}))}}};e.default=f}).call(this,n("a9ff")["default"],n("543d")["default"])}},[["4db3","common/runtime","common/vendor"]]]);