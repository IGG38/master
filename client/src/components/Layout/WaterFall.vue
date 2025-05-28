<template>
  <!-- width="500" -->
  <Waterfall :list="list" :breakpoints="breakpoints">
    <template #default="{ item, url, index }">
      <div class="card">
        <LazyImg :url="url" />
        <p class="text">{{ item.title }}</p>
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';

const getSavedImages = () => {
  const key = 'heisi-images';
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const list = ref(getSavedImages());

const breakpoints = ref({
  //4K
  3840: {
    rowPerView: 7,
  },
  1980: {
    rowPerView: 5,
  },
  1200: {
    rowPerView: 4,
  },
  800: {
    rowPerView: 3,
  },
  500: {
    rowPerView: 2,
  },
  375: {
    rowPerView: 1,
  },
});
</script>

<style scoped>
.lazy__img[lazy='loading'] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy='loaded'] {
  width: 100%;
}

.lazy__img[lazy='error'] {
  padding: 5em 0;
  width: 48px;
}
</style>
