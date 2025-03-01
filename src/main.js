import { createApp } from 'vue';
import App from './App.vue';
import Button from './components/Button/Button.vue';

const app = createApp(App);
app.mount('#app');
app.component('purpleButton', Button);
