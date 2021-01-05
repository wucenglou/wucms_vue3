import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './plugins/element.js'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './element-variables.scss'
import '@/styles/index.scss' // global css


import './icons' // icon

const app = createApp(App);

// installElementPlus(app)

app.config.productionTip = true

app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
