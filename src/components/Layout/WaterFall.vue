<template>
  <Waterfall :list="list">
    <template #default="{ item, url, index }">
      <div class="card">
        <LazyImg :url="url" />
        <p class="text">这是具体内容</p>
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';

import ROG from '@/assets/images/rog.gif';
import WYY from '@/assets/images/woman.png';

// 数据
const list = [
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
  {
    src: WYY,
  },
  {
    src: ROG,
  },
  {
    src: WYY,
  },
];
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
