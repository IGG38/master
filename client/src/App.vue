<template>
   <div class="app" :style="{ height: screenHeight + 'px' }">
      <router-view v-slot="{ Component }">
         <keep-alive :include="keepAliveComponents">
            <component :is="Component" :key="$route.name" v-if="Component" />
         </keep-alive>
      </router-view>
   </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { Http } from '@/tools/http';
export default {
   setup() {
      // localStorage.clear();

      const http = Http.getInstance();
      const router = useRouter();

      const screenHeight = ref(window.innerHeight); // 使用 window.innerHeight 初始化高度

      const updateHeight = () => {
         screenHeight.value = window.innerHeight; // 更新为当前窗口高度
         console.log(screenHeight);
      };

      onMounted(() => {
         // init();
         window.addEventListener('resize', updateHeight); // 监听窗口大小变化
      });

      // 组件卸载前移除事件监听
      onBeforeUnmount(() => {
         window.removeEventListener('resize', updateHeight);
      });

      const keepAliveComponents = computed(() => {
         return ['']; // 需要缓存的组件名
      });

      return {
         screenHeight,
         keepAliveComponents,
      };
   },
};
</script>

<style>
* {
   font-variant-ligatures: none;
}

html {
   margin: 0 auto;
   padding: 0;
   /* calc(16 / 375 * 100) */
}

body {
   margin: 0;
   padding: 0;
   background-color: #f2f3f5;
}

.app {
   display: flex;
   flex-direction: column;
   margin: 0 auto;
}

::-webkit-scrollbar {
   display: none;
}
</style>
