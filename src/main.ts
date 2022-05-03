import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store/index'
import router from '@/router/index'
import Particles from 'particles.vue3'
import Antd from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'


createApp(App)
    .use(store)
    .use(router)
    .use(Particles)
    .use(Antd)
    .mount('#app')
