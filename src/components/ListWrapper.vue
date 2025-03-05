<template>
  <div>
    <div class="inputWrapper">
      <img
        src="https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png"
        alt="image_of_the_day"
      />
      <input
        type="text"
        autofocus
        placeholder="Search NASA scientific articles or celestial bodies..."
        v-model="query"
      />
      <span v-if="query" id="clear" @click="clearInput">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="#000"
            stroke-linejoin="round"
            d="m7 6l4 4m0-4l-4 4M5 3.5h9.5v9H5L1.5 8z"
            stroke-width="1"
          />
        </svg>
      </span>
    </div>
    <div v-if="query.length >= 3" class="cta">
      <purpleButton @click="toggleSort">
        Sort by date {{ sortOrder === 'desc' ? '↑' : '↓' }}
      </purpleButton>
      <input
        type="text"
        v-model="year"
        placeholder="Enter year to filter items..."
      />
    </div>
    <div class="listWrapper">
      <div class="item-container" v-for="item in data" :key="item">
        <ListItem :item="item" @click="openModal(item)" />
      </div>
      <div class="scroll-observer" v-if="hasMore && !loading"></div>
    </div>
    <ItemModal
      :show="showModal"
      :item="selectedItem"
      :fav-images="favImages"
      @close="closeModal"
      @add-to-favorites="addToFavorites"
      v-if="selectedItem"
    />
    <div class="noData" v-if="data.length === 0 && !loading && hasSearched">
      Sorry, data could not be found
    </div>
    <div class="loadingSpinner" v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-if="hasMore && !loading && data.length > 0" class="loadMore">
      Scroll for more results...
    </div>
    <div class="favImages">
      <FavoriteImages
        :fav-images="favImages"
        @remove-favorite="removeFromFavorites"
        v-if="favImages.length > 0 && query === ''"
      />
    </div>
  </div>
</template>

<script>
import ItemModal from './ItemModal.vue';
import ListItem from './ListItem.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import FavoriteImages from './FavoriteImages.vue';

export default {
  /* eslint-disable */
  name: 'ListWrapper',
  components: { LoadingSpinner, ListItem, ItemModal, FavoriteImages },
  data() {
    return {
      query: '',
      data: [],
      originalData: [],
      loading: false,
      hasSearched: false,
      showModal: false,
      selectedItem: null,
      page: 1,
      hasMore: true,
      sortOrder: 'desc',
      year: '',
      timesSearched: 0,
      favImages: [],
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    });

    const savedFavorites = localStorage.getItem('favImages');
    if (savedFavorites) {
      try {
        this.favImages = JSON.parse(savedFavorites);
      } catch (e) {
        console.error('Error while loading favorites:', e);
      }
    }
  },
  unmounted() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    applyYearFilter() {
      if (this.year.length === 4 && this.originalData.length > 0) {
        this.data = this.originalData.filter((item) =>
          item.data[0].date_created.includes(this.year)
        );
      } else {
        this.data = [...this.originalData];
      }
    },
    openModal(item) {
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },
    toggleSort() {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
      this.sortByDate();
    },
    sortByDate() {
      if (this.data.length === 0) return;

      this.data.sort((a, b) => {
        const $firstDate = new Date(a.data[0].date_created);
        const $secondDate = new Date(b.data[0].date_created);

        return this.sortOrder === 'desc'
          ? $secondDate - $firstDate
          : $firstDate - $secondDate;
      });
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
      if (this.observer) {
        this.observer.disconnect();
      }

      this.$nextTick(() => {
        const observerElement = this.$el.querySelector('.scroll-observer');
        if (observerElement && this.hasMore) {
          this.observer.observe(observerElement);
        }
      });
    },

    async fetchData(resetData = true) {
      if (resetData) {
        this.page = 1;
        this.hasMore = true;
        this.data = [];
        this.originalData = [];
      }

      if (!this.query || this.query.length <= 2) {
        return;
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

        filteredItems.map((item) => {
          if (item.data && item.data[0] && item.data[0].date_created) {
            item.data[0].date_created = new Date(
              item.data[0].date_created
            ).toLocaleDateString();
          }
        });

        if (resetData) {
          this.originalData = filteredItems;
          this.data = filteredItems;
        } else {
          this.originalData = [...this.originalData, ...filteredItems];
          this.data = [...this.data, ...filteredItems];
        }

        this.hasMore = filteredItems.length > 0;
        this.hasSearched = true;

        this.applyYearFilter();

        this.$nextTick(() => {
          this.observeLastElement();
        });
      } catch (error) {
        console.error('Error while gathering data:', error);
      } finally {
        this.loading = false;
      }
    },
    addToFavorites(item) {
      const exists = this.favImages.some(
        (favItem) => favItem.data[0].nasa_id === item.data[0].nasa_id
      );

      if (!exists) {
        this.favImages.push(item);

        localStorage.setItem('favImages', JSON.stringify(this.favImages));
      }
    },
    removeFromFavorites(index) {
      this.favImages.splice(index, 1);

      localStorage.setItem('favImages', JSON.stringify(this.favImages));
    },
    clearInput() {
      this.query = '';
    },
  },
  watch: {
    query(newVal, oldVal) {
      if (newVal.length > 2) {
        this.fetchData(true);
      } else {
        this.data = [];
        this.originalData = [];
        this.hasSearched = false;
        this.page = 1;
        this.hasMore = true;
      }
    },
    year(newVal, oldVal) {
      this.applyYearFilter();
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
  align-items: center;
  position: relative;
  top: 2.5vh;
  margin-bottom: 20px;
  gap: 10px;
}

.inputWrapper img {
  height: 90px;
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
  margin-top: 10vh;
  padding-inline: 5px;
}

.item-container {
  display: contents;
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

.scroll-observer {
  width: 100%;
  height: 20px;
}

.cta {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
}

.cta input {
  width: 15%;
  height: 20px;
  display: flex;
  padding: 4px 8px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #f5f5e9;
}

.favImages {
  margin-top: 5vh;
  padding: 0 2vw;
}

#clear {
  cursor: pointer;
  position: relative;
  right: 2vw;
  top: 2px;
}
</style>
