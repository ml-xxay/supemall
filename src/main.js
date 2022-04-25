import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import toast from 'components/common/toast'

import FlasClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //往vue原型里面加一个bus 里面放的是new的vue实例   可当作事件总线

// 安装toast插件
Vue.use(toast)
    // 懒加载
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延时
FlasClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')