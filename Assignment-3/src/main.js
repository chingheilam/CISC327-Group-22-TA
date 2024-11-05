import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(TDesign)
app.use(router)
app.use(axios)

app.mount('#app')
