(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/editData"],{3666:function(e,t,n){},"8ec2":function(e,t,n){"use strict";(function(e){function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"5505"))},i=function(){return n.e("components/uni-popup").then(n.bind(null,"5886"))},o={components:{uniNavBar:a,uniPopup:i},data:function(){var t;return{userOrorganinzation:!0,inputValue:(t={member_mobile:"",member_name:"",school_name:"",gender:"",brief:"",hobby:"",admin_mobile:""},u(t,"school_name",""),u(t,"school_address",""),u(t,"introduce",""),u(t,"type",""),t),gender:["男","女"],userInfo:{},types:[],accountInfo:e.getStorageSync("accountInfo")}},onLoad:function(e){this.userOrorganinzation=2==e.type},created:function(){var t=this;e.apiRequest("/api/User/user_info",{data:{user_id:this.accountInfo.id,type:this.accountInfo.type},success:function(e){return t.userInfo=e.data.result}}),3==this.accountInfo.type&&e.apiRequest("/api/member/getType",{success:function(e){t.types=e.data.result},fail:function(t){e.showToast({title:"服务器连接失败，请重试！",icon:"none"})}})},methods:{inputState:function(e){if("gender"==e.type||"type"==e.type)return this.closePopup(e.type),void(this.inputValue[e.type]=e.value);this.inputValue[e.currentTarget.dataset.type]=e.detail.value},goBack:function(){e.navigateBack()},save:function(){2==this.accountInfo.type?e.apiRequest("/api/User/update_info",{data:{member_mobile:this.inputValue.member_mobile,member_name:this.inputValue.member_name,sex:"男"==this.inputValue.gender?1:0,school_name:this.inputValue.school_name,brief:this.inputValue.brief,hobby:this.inputValue.hobby},success:function(t){e.showToast({title:t.data.msg,icon:200==t.data.code?"success":"none",success:function(n){return setTimeout(function(){200==t.data.code&&e.navigateBack()},1500)}})}}):e.apiRequest("/api/user/update_organization",{data:{admin_mobile:this.inputValue.admin_mobile,type_id:this.inputValue.type.id,school_name:this.inputValue.school_name,school_address:this.inputValue.school_address,introduce:this.inputValue.introduce},success:function(t){e.showToast({title:t.data.msg,icon:200==t.data.code?"success":"none",success:function(n){return setTimeout(function(){200==t.data.code&&e.navigateBack()},1500)}})}})},openPopup:function(e){this.$refs[e].open()},closePopup:function(e){this.$refs[e].close()}}};t.default=o}).call(this,n("6e42")["default"])},9945:function(e,t,n){"use strict";var u=n("3666"),a=n.n(u);a.a},"9e44":function(e,t,n){"use strict";var u=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return u}),n.d(t,"b",function(){return a})},a093:function(e,t,n){"use strict";(function(e){n("ae81"),n("921b");u(n("66fd"));var t=u(n("bcc3"));function u(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},bcc3:function(e,t,n){"use strict";n.r(t);var u=n("9e44"),a=n("f45b");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("9945");var o=n("2877"),s=Object(o["a"])(a["default"],u["a"],u["b"],!1,null,null,null);t["default"]=s.exports},f45b:function(e,t,n){"use strict";n.r(t);var u=n("8ec2"),a=n.n(u);for(var i in u)"default"!==i&&function(e){n.d(t,e,function(){return u[e]})}(i);t["default"]=a.a}},[["a093","common/runtime","common/vendor"]]]);