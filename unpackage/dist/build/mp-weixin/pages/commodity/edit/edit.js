(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commodity/edit/edit"],{"41bf":function(e,t,n){"use strict";(function(e,i){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("9523"));function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={data:function(){return{pattern:{color:"#7A7E83",backgroundColor:"#fff",selectedColor:"#007AFF",buttonColor:"#007AFF",iconColor:"#fff"},content:[{iconPath:"/static/img/pretty/reset.png",selectedIconPath:"/static/img/pretty/reset.png",text:"重置",active:!1},{iconPath:"/static/img/pretty/add.png",selectedIconPath:"/static/img/pretty/add.png",text:"新增",active:!1}],tempPicUrls:[],picUrls:[],formData:{baseInfo:{remark:"",qualityGuaranteePeriod:""}},rules:{"baseInfo.name":{type:"string",required:!0,message:"请填写商品名称",trigger:["blur","change"]},"baseInfo.price":{type:"string",required:!0,message:"请填写商品价格",trigger:["blur","change"]},"baseInfo.qualityGuaranteePeriod":{type:"string",required:!1,message:"请填写商品保质期",trigger:["blur","change"]},"baseInfo.produceDate":{type:"string",required:!1,message:"请填写商品生产日期",trigger:["blur","change"]}}}},onReady:function(){this.$refs.formComponent.setRules(this.rules)},onLoad:function(e){this.getDetail(e.id)},methods:{trigger:function(t){var n=this,r=t.index;0===r?(this.formData={baseInfo:{}},this.tempPicUrls=[],this.picUrls=[]):1===r&&this.$refs.formComponent.validate().then((function(t){var r=a(a({},n.formData.baseInfo),{},{picUrls:n.picUrls});e.callFunction({name:"addCommodity",data:r}).then((function(e){n.$refs.uNotify.show({top:0,type:"success",color:"#fff",message:"新增商品成功",duration:2e3,fontSize:20,safeAreaInsetTop:!0}),setTimeout((function(){i.reLaunch({url:"/pages/tabbar/tabbar-1/tabbar-1"})}),2e3)}))})).catch((function(e){i.$u.toast("请按照要求填写信息")}))},success:function(e){e.tempFiles;var t=e.tempFilePaths;this.picUrls=t},getDetail:function(t){var n=this;e.callFunction({name:"getCommodityDetail",data:{id:t}}).then((function(e){console.log("获取商品详情---",e),n.formData.baseInfo=e.result[0],n.tempPicUrls=e.result[0].picUrls,n.picUrls=e.result[0].picUrls,i.setNavigationBarTitle({title:n.formData.baseInfo})}))}}};t.default=c}).call(this,n("a9ff")["default"],n("543d")["default"])},"4b5b":function(e,t,n){"use strict";n.r(t);var i=n("41bf"),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},"4f73":function(e,t,n){"use strict";n.r(t);var i=n("87fb"),r=n("4b5b");for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("e5b9");var u=n("f0c5"),a=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,"529777fe",null,!1,i["a"],void 0);t["default"]=a.exports},"6e49":function(e,t,n){},"87fb":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={uNotify:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-notify/u-notify")]).then(n.bind(null,"0f20"))},uniCard:function(){return n.e("uni_modules/uni-card/components/uni-card/uni-card").then(n.bind(null,"febd"))},"u-Form":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--form/u--form")]).then(n.bind(null,"3166"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"d9ca"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"af4a"))},uSlider:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-slider/u-slider")]).then(n.bind(null,"e514"))},uniDatetimePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(n.bind(null,"d8f4"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"dbe7"))},uniFilePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(n.bind(null,"9bba"))},uniFab:function(){return n.e("uni_modules/uni-fab/components/uni-fab/uni-fab").then(n.bind(null,"e459"))}},r=function(){var e=this.$createElement;this._self._c},o=[]},e5b9:function(e,t,n){"use strict";var i=n("6e49"),r=n.n(i);r.a},fe0d:function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("2fe1"),n("a9ff");i(n("66fd"));var r=i(n("4f73"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["fe0d","common/runtime","common/vendor"]]]);