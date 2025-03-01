<template>
  <button class="purpleButton">
    <slot></slot>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'purpleButton',
  props: ['text'],
};
</script>

<style scoped>
.purpleButton {
  background-color: #39396e;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.purpleButton:hover {
  background-color: #2a2a52;
}
</style>
