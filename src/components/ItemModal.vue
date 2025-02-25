<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      <img :src="item.links[0].href" alt="item" class="modal-image" />
      <div class="modal-info">
        <h2>{{ item.data[0].title }}</h2>
        <p>{{ formatText(item.data[0].description) }}</p>
        <div class="keywords">
          <span
            v-for="keyword in item.data[0].keywords"
            :key="keyword"
            class="keyword"
          >
            {{ keyword }}
          </span>
        </div>
        <div class="metadata">
          <p>
            Date: {{ new Date(item.data[0].date_created).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemModal',
  props: {
    show: Boolean,
    item: Object,
  },
  watch: {
    show(newValue) {
      if (newValue) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    },
  },
  methods: {
    formatText(text) {
      if (text.length >= 1800) {
        return text.slice(0, 1700).concat('...');
      } else {
        return text;
      }
    },
    closeModal() {
      document.body.classList.remove('modal-open');
      this.$emit('close');
    },
  },
  beforeUnmount() {
    document.body.classList.remove('modal-open');
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #f5f5e9;
  padding: 30px 25px 10px 25px;
  border-radius: 10px;
  min-width: 50%;
  max-width: 50%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  background: none;
}

.modal-image {
  width: 100%;
  max-height: 400px;
  object-fit: fill;
  border-radius: 10px;
}

.modal-info {
  padding: 0 20px 0 20px;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.keyword {
  background: #57579e;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

.metadata {
  margin-top: 20px;
  color: #666;
}
</style>
