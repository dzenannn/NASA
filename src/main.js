import { createApp } from 'vue';
import App from './App.vue';
import Button from './components/Button/Button.vue';
import lazyLoading from './directives/lazyLoading';
import { i18n } from '@/plugins/i18n';

const app = createApp(App);

app.directive('lazy', lazyLoading);
app.component('purpleButton', Button);
app.use(i18n);

app.mount('#app');
