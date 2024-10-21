import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css'; // TDesign styles

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Use TDesign as a plugin
app.use(TDesign);

app.mount('#app');