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
      showWelcome: true,
    };
  },
  created() {
    setTimeout(() => {
      this.showWelcome = false;
    }, 4000);
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #0b3d91;
  overflow: hidden;
}
</style>
