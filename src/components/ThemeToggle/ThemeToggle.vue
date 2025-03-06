<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<script>
import { useTheme } from '../../composables/useTheme';
/* eslint-disable */
const { theme, toggleTheme } = useTheme();

export default {
  name: 'ThemeToggle',
};
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.6rem;
}
</style>
