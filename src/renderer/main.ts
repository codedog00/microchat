import { createApp } from 'vue'

import ElementPlus from 'element-plus';
import * as ElementIcon from '@element-plus/icons-vue';
import 'element-plus/dist/index.css'
import './styles/index.scss'
import './assets/icons/iconfont.css'
import './assets/icons/tim.css'
import './permission'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'
import store from './store'
import tim from './tim'
import TIM from 'tim-js-sdk/tim-js-friendship.js'

import { i18n } from "./i18n"

import TitleBar from "./components/common/TitleBar.vue"


const app = createApp(App)
app.use(ElementPlus, { i18n: i18n.global.t })
app.use(router)
app.use(store)
app.use(i18n)
errorHandler(app)

app.config.globalProperties.tim = tim;
app.config.globalProperties.TIM = TIM;

Object.keys(ElementIcon).forEach(key => {
    app.component(key, ElementIcon[key as keyof typeof ElementIcon])
})

// 全局引入 TitleBar 组件
app.component("TitleBar", TitleBar);

app.mount("#app")