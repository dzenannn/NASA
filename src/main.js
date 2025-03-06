import { createApp } from 'vue';
import App from './App.vue';
import Button from './components/Button/Button.vue';
import lazyLoading from './directives/lazyLoading';

const app = createApp(App);

app.directive('lazy', lazyLoading);
app.component('purpleButton', Button);

app.mount('#app');
