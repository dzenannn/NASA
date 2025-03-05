<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div ref="modalInfo" class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      <img
        loading="lazy"
        :src="item.links[0].href"
        alt="item"
        class="modal-image"
      />
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
          <div class="buttons">
            <purpleButton @click="downloadImage" :text="'image'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 22v-2h16v2zm8-4L5 9h4V2h6v7h4z"
                />
              </svg>
            </purpleButton>
            <purpleButton @click="favoriteImage" :text="'image'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    :fill="
                      isInFavorites
                        ? 'url(#fluentColorHeart240)'
                        : 'currentColor'
                    "
                    d="m12.82 5.58l-.821.822l-.823-.823a5.375 5.375 0 0 0-7.602 7.601l7.896 7.896a.75.75 0 0 0 1.06 0l7.902-7.897a5.38 5.38 0 0 0-7.612-7.6"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorHeart240"
                      x1="-2.376"
                      x2="8.135"
                      y1="-.938"
                      y2="21.378"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#f97dbd" />
                      <stop offset="1" stop-color="#f90000" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </purpleButton>
            <span v-if="downloadMessage">
              {{ downloadMessage }}
            </span>
          </div>
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
    favImages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      downloadMessage: null,
    };
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
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.item.links[0].href;
      link.target = '_blank';
      link.download = `${this.item.data[0].title || 'nasa-image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    favoriteImage() {
      if (this.isInFavorites) {
        this.downloadMessage = 'Already in favorites!';
      } else {
        this.$emit('add-to-favorites', this.item);
        this.downloadMessage = 'Added to favorites!';
      }

      setTimeout(() => {
        this.downloadMessage = null;
      }, 1800);
    },
  },
  beforeUnmount() {
    document.body.classList.remove('modal-open');
  },
  computed: {
    isInFavorites() {
      return this.favImages.some(
        (favItem) => favItem.data[0].nasa_id === this.item.data[0].nasa_id
      );
    },
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
  padding-bottom: 20px;
  margin-top: 20px;
  color: #666;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.buttons button {
  height: 3vh;
}

.buttons p {
  height: 2vh;
}
</style>
