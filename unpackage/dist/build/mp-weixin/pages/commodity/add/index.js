(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commodity/add/index"],{"1d0c":function(e,n,t){"use strict";t.r(n);var r=t("513a"),i=t.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=i.a},"3f3f":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return r}));var r={uNotify:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-notify/u-notify")]).then(t.bind(null,"0f20"))},uniCard:function(){return t.e("uni_modules/uni-card/components/uni-card/uni-card").then(t.bind(null,"febd"))},"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"3166"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"d9ca"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"af4a"))},uSlider:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-slider/u-slider")]).then(t.bind(null,"e514"))},uniDatetimePicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(t.bind(null,"d8f4"))},"u-Textarea":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(t.bind(null,"dbe7"))},uniFilePicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(t.bind(null,"9bba"))},uniFab:function(){return t.e("uni_modules/uni-fab/components/uni-fab/uni-fab").then(t.bind(null,"e459"))}},i=function(){var e=this.$createElement;this._self._c},o=[]},"4d18":function(e,n,t){},"513a":function(e,n,t){"use strict";(function(e,r){var i=t("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(t("9523"));function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){(0,o.default)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var c={data:function(){return{pattern:{color:"#7A7E83",backgroundColor:"#fff",selectedColor:"#007AFF",buttonColor:"#007AFF",iconColor:"#fff"},content:[{iconPath:"/static/img/pretty/reset.png",selectedIconPath:"/static/img/pretty/reset.png",text:"重置",active:!1},{iconPath:"/static/img/pretty/add.png",selectedIconPath:"/static/img/pretty/add.png",text:"新增",active:!1}],tempPicUrls:[],picUrls:[],formData:{baseInfo:{remark:"",qualityGuaranteePeriod:""}},rules:{"baseInfo.name":{type:"string",required:!0,message:"请填写商品名称",trigger:["blur","change"]},"baseInfo.price":{type:"string",required:!0,message:"请填写商品价格",trigger:["blur","change"]},"baseInfo.qualityGuaranteePeriod":{type:"string",required:!1,message:"请填写商品保质期",trigger:["blur","change"]},"baseInfo.produceDate":{type:"string",required:!1,message:"请填写商品生产日期",trigger:["blur","change"]}}}},onReady:function(){this.$refs.formComponent.setRules(this.rules)},methods:{trigger:function(n){var t=this,i=n.index;0===i?(this.formData={baseInfo:{}},this.tempPicUrls=[],this.picUrls=[]):1===i&&this.$refs.formComponent.validate().then((function(n){var i=a(a({},t.formData.baseInfo),{},{picUrls:t.picUrls});e.callFunction({name:"addCommodity",data:i}).then((function(e){t.$refs.uNotify.show({top:0,type:"success",color:"#fff",message:"新增商品成功",duration:2e3,fontSize:20,safeAreaInsetTop:!0}),setTimeout((function(){r.reLaunch({url:"/pages/tabbar/tabbar-1/tabbar-1"})}),2e3)}))})).catch((function(e){r.$u.toast("请按照要求填写信息")}))},success:function(e){e.tempFiles;var n=e.tempFilePaths;this.picUrls=n}}};n.default=c}).call(this,t("a9ff")["default"],t("543d")["default"])},"79e9":function(e,n,t){"use strict";t.r(n);var r=t("3f3f"),i=t("1d0c");for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);t("8439");var u=t("f0c5"),a=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"777285e1",null,!1,r["a"],void 0);n["default"]=a.exports},8439:function(e,n,t){"use strict";var r=t("4d18"),i=t.n(r);i.a},adcb:function(e,n,t){"use strict";(function(e,n){var r=t("4ea4");t("2fe1"),t("a9ff");r(t("66fd"));var i=r(t("79e9"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(i.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])}},[["adcb","common/runtime","common/vendor"]]]);