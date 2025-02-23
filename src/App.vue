<!-- npm run lint -- --fix -->
<template>
  <div>
    <WelcomeScreen v-if="showWelcome" />
    <ListWrapper v-if="!showWelcome" />
  </div>
</template>

<script>
import ListWrapper from './components/ListWrapper.vue';
import WelcomeScreen from './components/WelcomeScreen.vue';

export default {
  name: 'App',
  components: { WelcomeScreen, ListWrapper },
  data() {
    return {
      showWelcome: false,
    };
  },
  created() {
    setTimeout(() => {
      this.showWelcome = false;
    }, 6500);
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 13px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 13px;
  border: 3px solid #232e33;
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}

body {
  background: url('./assets/bgr.png') repeat;
  --sb-track-color: #232e33;
  --sb-thumb-color: #3b5bcc;
  --sb-size: 22px;
  margin-bottom: 40px;
  box-sizing: border-box;
  color: #000000;
}
</style>
