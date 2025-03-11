<template>
  <div style="display: flex; gap: 6px; align-items: center">
    <p>{{ $d(currentDate, 'short') }}</p>
  </div>
</template>

<script>
export default {
  name: 'LocalizedDate',
  data() {
    return {
      currentDate: new Date(),
      selectedLocale: this.$i18n.locale,
      interval: null,
    };
  },
  methods: {
    updateDate() {
      this.currentDate = new Date();
    },
  },
  mounted() {
    this.interval = setInterval(this.updateDate, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
