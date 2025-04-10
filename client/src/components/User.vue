<template>
   <NFlex class="user">
      <NAvatar round :size="48" :src="UserAvatar" :fallback-src="UserAvatar" object-fit="cover" />

      <NFlex vertical justify="center">
         <span class="user-name">HERY</span>
         <span class="user-desc">Description</span>
      </NFlex>
   </NFlex>
</template>

<script>
import { ref, onMounted } from 'vue';
import { NFlex, NAvatar } from 'naive-ui';
import UserAvatar from '@/assets/images/avatar.png';

export default {
   components: { NFlex, NAvatar },
   setup() {
      return { UserAvatar };
   },
};
</script>

<style scoped>
.user {
   width: 100%;
   padding: 16px;
   background-color: #fafbfc;
   box-sizing: border-box;
}

.user-name {
   font-size: 16px;
   line-height: 20px;
   color: #000;
}

.user-desc {
   font-size: 12px;
   line-height: 16px;
   color: #999;
}
</style>
