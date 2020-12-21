// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import router from './router'
import animate from 'animate.css'
import axios from 'axios'
import VueAMap from 'vue-amap'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small' })

// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '5d07f19b66c0d7b2e2a781de2b3698d5',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',  'AMap.polygon','AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'DistrictSearch'],
//   v: '1.4.4'
// })

// vue-devtools
Vue.config.devtools = true

// eventbus
window.eventBus = new Vue()

Vue.use(animate)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// http response 全局拦截
axios.interceptors.response.use(
    response => {
      if (response.data) {
        if (!response.data.code) {
          return Promise.resolve(response.data)
        }
        switch (response.data.code) {
          
          case 200:
            return Promise.resolve(response.data)
          case 403:
            router.push('/')
            break
          case 401:
            Element.Message.error('权限受限')
            Navigator.go(-1)
            break
          case 400:
          case 500:
            return Promise.reject(response.data)
            default:  return Promise.reject(response.data)
        }
      } else {
        return Promise.resolve(response)
      }
    },
    error => {
      Element.Message.error('网络错误~')
      return Promise.reject(error)
    }
)