<template>
  <div>
    <div class="inputWrapper">
      <input type="text" autofocus v-model="query" />
    </div>
    <div class="listWrapper">
      <div v-for="item in data" :key="item">1</div>
    </div>
    <div class="noData" v-if="data.length === 0 && loading === false">
      Sorry, data could not be found
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListWrapper',
  methods: {
    fetchData(query) {
      this.loading = true;
      fetch(`https://images-api.nasa.gov/search?q=` + query)
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          console.log(data);
          this.data = data.collection.items;
        });
    },
  },
  data() {
    return {
      query: '',
      data: [],
      loading: false,
    };
  },
  watch: {
    // eslint-disable-next-line
    query(newVal, oldVal) {
      if (newVal.length > 2) {
        this.fetchData();
      } else {
        this.data = [];
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

.listWrapper {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.noData {
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 32px;
}
</style>
