import { ref, watchEffect } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
  };

  watchEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme.value);
  });

  return { theme, toggleTheme };
}
