<template>
  <img class="heisi" :src="heisi" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NFlex } from 'naive-ui';
import api from '@/tools/api';

const heisi = ref('');

const init = async () => {
  const resp = await api.getHeisi();
  if (resp.code !== 200) {
    console.error('获取黑丝数据失败', resp.msg);
    return;
  }
  console.log(resp.data);
  heisi.value = resp.data;
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.heisi {
  width: 100%;
}
</style>
