<template>
   <div>
      <img class="heisi" :src="heisi" />
      <NButton @click="onRefresh">刷新</NButton>
      <NButton @click="saveImage">保存</NButton>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NFlex, NButton } from 'naive-ui';
import api from '@/tools/api';

const heisi = ref('');

const onRefresh = async () => {
   const resp = await api.getHeisi();
   if (resp.code !== 200) {
      console.error('获取黑丝数据失败', resp.msg);
      return;
   }
   console.log(resp.data);
   heisi.value = resp.data;
};

const saveImage = () => {
   if (!heisi.value) {
      console.warn('暂无可保存的数据');
      return;
   }

   const key = 'heisi-images';
   const currentSrc = heisi.value;

   // 获取现有数据（对象数组）
   const savedList = JSON.parse(localStorage.getItem(key) || '[]');

   // 判断是否已存在
   const exists = savedList.some(item => item.src === currentSrc);
   if (exists) {
      console.log('该图片已存在，无需重复保存');
      return;
   }

   // 创建新对象（你可以在此处生成唯一 ID 或标题）
   const newImage = {
      id: Date.now().toString(),      // 使用时间戳生成唯一 ID
      title: '',                      // 默认空标题，可扩展为命名
      src: currentSrc,                // 图片地址
   };

   // 追加并保存
   savedList.push(newImage);
   localStorage.setItem(key, JSON.stringify(savedList));

   console.log('已保存图片对象到 localStorage');
};




onMounted(() => {
   onRefresh();
});
</script>

<style scoped>
.heisi {
   width: 100%;
}
</style>
