import { createApp } from 'vue';
import {createPinia} from 'pinia'
import TDesign from 'tdesign-vue-next'; 
import App from './App.vue';
import 'tdesign-vue-next/es/style/index.css';  // Global TDesign styles
import router from './router'; 

const app = createApp(App);

app.use(createPinia());
app.use(TDesign);  // Register TDesign globally
app.use(router);

app.mount('#app');
