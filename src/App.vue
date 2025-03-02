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
    }, 4000);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
  font-family: 'Poppins';
  font-size: 0.8rem;
  background-color: #57579e;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  --sb-track-color: #232e33;
  --sb-thumb-color: #3b5bcc;
  --sb-size: 22px;
  box-sizing: border-box;
  color: #000000;
  /*  */
}

body .modal-open {
  overflow: hidden;
  padding-right: var(--sb-size);
}
</style>
