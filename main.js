import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

uni.requestUrl = "http://school.shdong.cn";

uni.apiRequest = (url, params) => {
	params.method = params.method || "post";
	params.data = params.data || {};
	params.data.token = uni.getStorageSync("accountInfo").token || '';
	return uni.request({
		url: uni.requestUrl + url,
		...params
	});
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
