<template>
  <div class="card" v-if="imageExists">
    <img :src="item.links[0].href" alt="" @error="handleImageError" />
    <div class="container">
      <h4>{{ shrinkTitle(item.data[0].title) }}</h4>
      <p>{{ shrinkDescription(item.data[0].description) }}</p>
      <div class="tags">
        <div class="tagItem" v-for="keyword in getKeywords" :key="keyword">
          Tags: {{ keyword }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['item'],
  data() {
    return {
      imageExists: true,
    };
  },
  computed: {
    getKeywords() {
      return this.item?.data[0]?.keywords?.slice(0, 2) || [];
    },
  },
  methods: {
    handleImageError() {
      this.imageExists = false;
    },
    shrinkDescription: (desc) => desc.slice(0, 75) + '...',
    shrinkTitle: (title) => title.slice(0, 50) + '...',
  },
};
</script>

<style scoped>
.card {
  border: 1px solid black;
  box-shadow: 0 0 9px 1px;
  width: 250px;
  min-height: 350px;
  border-radius: 10px;
  transition-duration: 0.3s;
  cursor: pointer;
  background-color: #f5f5e9;
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: fill;
  border-radius: 10px;
}

.card:hover {
  transform: scale(1.03);
}

.card .container {
  width: 100%;
  padding-inline: 5px;
  text-wrap: balance;
  box-sizing: border-box;
  overflow: hidden;
}

.card .container p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.tagItem {
  font-size: 0.75rem;
  text-decoration: underline;
}
</style>
