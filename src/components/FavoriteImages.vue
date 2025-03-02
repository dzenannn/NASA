<template>
  <div class="favorites-container">
    <h2>Favorite images</h2>
    <div v-if="favImages.length === 0" class="no-favorites">
      No favorite images!
    </div>
    <div class="favorites-grid" v-else>
      <div
        v-for="(item, index) in favImages"
        :key="index"
        class="favorite-item"
      >
        <img :src="item.links[0].href" :alt="item.data[0].title" />
        <div class="favorite-info">
          <h3>{{ item.data[0].title }}</h3>
          <button @click="removeFromFavorites(index)" class="remove-button">
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoriteImages',
  props: {
    favImages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    removeFromFavorites(index) {
      this.$emit('remove-favorite', index);
    },
  },
};
</script>

<style scoped>
.favorites-container {
  padding: 20px;
  background-color: #f5f5e9;
  border-radius: 10px;
}

h2 {
  text-align: center;
  color: #333;
}

.no-favorites {
  text-align: center;
  padding: 20px;
  color: #666;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.favorite-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.favorite-item:hover {
  transform: translateY(-5px);
}

.favorite-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.favorite-info {
  padding: 10px;
  background-color: #fff;
}

.favorite-info h3 {
  font-size: 16px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-button {
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #ff6b81;
}
</style>
