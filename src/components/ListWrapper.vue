<template>
  <div>
    <div class="inputWrapper">
      <input type="text" autofocus v-model="query" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListWrapper',
  data() {
    return {
      query: '',
    };
  },
};
</script>

<style scoped>
.inputWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 8vh;
  margin-bottom: 35px;
}

.inputWrapper input {
  width: 70%;
  height: 30px;
  display: flex;
  padding: 8px 16px;
  border: none;
  outline: none;
  border-radius: 10px;
}
</style>
