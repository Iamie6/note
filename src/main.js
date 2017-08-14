import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.mixin({
	methods: {
		randomColor(id) {
			if (isNaN(id) || id < 9) {
				return '#68c6aa';
			}
			var arr = ['#a992d4', '#f7b189', '#b3dbf2', '#f495bf', '#c182d1', '#b5b5e2', '#a8e5c2', '#83beec', '#61d6d6'];
			return arr[id % 9];
		}
	},
	filters: {}
})

new Vue({
	el: '#root',
	router,
	store,
	// template: '<App/>',
	// components: {
	// 	App
	// }
	// 
	render: h => h(App)
})