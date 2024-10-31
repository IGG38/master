import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$cdn = function (url) {
  if (!url || typeof url !== 'string') {
    return url || void 0;
  }
  if (url.startsWith('/profile')) {
    return `https://org.huisharing.com/sesame${url}`;
  }
  return url;
};

app.use(router);
app.use(store);
app.mount('#app');
