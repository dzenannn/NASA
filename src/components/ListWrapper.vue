<template>
  <div>
    <div class="inputWrapper">
      <img
        src="https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png"
      />
      <input
        type="text"
        autofocus
        placeholder="Search NASA scientific articles or celestial bodies..."
        v-model="query"
      />
    </div>
    <div class="listWrapper">
      <div v-for="item in data" :key="item">
        <ListItem :item="item" @click="openModal(item)" />
      </div>
      <ItemModal
        :show="showModal"
        :item="selectedItem"
        @close="closeModal"
        v-if="selectedItem"
      />
    </div>
    <div class="noData" v-if="data.length === 0 && !loading && hasSearched">
      Sorry, data could not be found
    </div>
    <div class="loadingSpinner" v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-if="hasMore && !loading && data.length > 0" class="loadMore">
      Scroll for more results...
    </div>
  </div>
</template>

<script>
import ItemModal from './ItemModal.vue';
import ListItem from './ListItem.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  /* eslint-disable */
  name: 'ListWrapper',
  components: { LoadingSpinner, ListItem, ItemModal },
  data() {
    return {
      query: '',
      data: [],
      loading: false,
      hasSearched: false,
      showModal: false,
      selectedItem: null,
      page: 1,
      hasMore: true,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: '20px',
      threshold: 0.5,
    });
  },
  unmounted() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    openModal(item) {
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },
    handleIntersect(entries) {
      const entry = entries[0];
      if (
        entry.isIntersecting &&
        this.hasMore &&
        !this.loading &&
        this.query.length > 2
      ) {
        this.page++;
        this.fetchData(false);
      }
    },
    observeLastElement() {
      // Pronalaženje i posmatranje poslednjeg elementa
      const lastItem = this.$el.querySelector('.listWrapper > div:last-child');
      if (lastItem) {
        this.observer.observe(lastItem);
      }
    },
    async fetchData(resetData = true) {
      if (resetData) {
        this.page = 1;
        this.hasMore = true;
        this.data = [];
      }

      this.loading = true;
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${this.query}&page=${this.page}`
        );
        const data = await response.json();

        const filteredItems = data.collection.items.filter(
          (item) => item.links && item.links.length > 0 && item.links[0].href
        );

        if (resetData) {
          this.data = filteredItems;
        } else {
          this.data = [...this.data, ...filteredItems];
        }

        this.hasMore = filteredItems.length > 0;
        this.hasSearched = true;

        this.$nextTick(() => {
          this.observeLastElement();
        });
      } catch (error) {
        console.error('Error while gathering data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    query(newVal, oldVal) {
      if (newVal.length > 2) {
        this.fetchData(true);
      } else {
        this.data = [];
        this.hasSearched = false;
        this.page = 1;
        this.hasMore = true;
      }
    },
  },
};
</script>

<style scoped>
.loadMore {
  text-align: center;
  color: #fff;
  padding: 20px;
  font-size: 16px;
  opacity: 0.8;
}

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
