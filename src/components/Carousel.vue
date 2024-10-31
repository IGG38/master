<template>
   <NCarousel :autoplay="false">
      <img class="carousel-img" src="@/assets/images/avatar.png">
      <img class="carousel-img" src="@/assets/images/rog.gif">
   </NCarousel>
</template>

<script>
import { ref, onMounted } from 'vue';
import { NCarousel } from 'naive-ui';
// import UserAvatar from '@/assets/images/avatar.png';

export default {
   components: { NCarousel },
   setup() {
      return {};
   },
};
</script>


<style scoped>
.carousel-img {
   width: 100%;
   /* height: 240px; */
   object-fit: cover;
}
</style>