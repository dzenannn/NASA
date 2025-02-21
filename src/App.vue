<template>
  <div>
    <WelcomeScreen />
  </div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen.vue';

export default {
  name: 'App',
  components: { WelcomeScreen },
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
