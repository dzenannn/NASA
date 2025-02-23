<template>
  <div>
    <div class="inputWrapper">
      <img
        src="https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png"
      />
      <input type="text" autofocus v-model="query" />
    </div>
    <div class="listWrapper">
      <div v-for="item in data" :key="item">
        <ListItem :item="item" />
      </div>
    </div>
    <div class="noData" v-if="data.length === 0 && !loading && hasSearched">
      Sorry, data could not be found
    </div>
    <div class="loadingSpinner" v-if="loading">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'ListWrapper',
  components: { LoadingSpinner, ListItem },
  methods: {
    fetchData() {
      this.loading = true;
      fetch('https://images-api.nasa.gov/search?q=' + this.query)
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.hasSearched = true;
          const filteredItems = data.collection.items.filter(
            (item) => item.links && item.links.length > 0 && item.links[0].href
          );
          this.data = filteredItems;
        });
    },
  },
  data() {
    return {
      query: '',
      data: [],
      loading: false,
      hasSearched: false,
    };
  },
  watch: {
    // eslint-disable-next-line
    query(newVal, oldVal) {
      if (newVal.length > 2) {
        this.fetchData();
      } else {
        this.data = [];
        this.hasSearched = false;
      }
    },
  },
};
</script>

<style scoped>
.inputWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 5vh;
  margin-bottom: 35px;
  gap: 10px;
}

.inputWrapper img {
  height: 90px;
  position: relative;
  bottom: 15px;
}

.inputWrapper input {
  width: 70%;
  height: 30px;
  display: flex;
  padding: 8px 16px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #f5f5e9;
}

.listWrapper {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 15vh;
  padding-inline: 20px;
}

.noData {
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 32px;
}

.loadingSpinner {
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 32px;
  margin-top: 5vh;
}
</style>
