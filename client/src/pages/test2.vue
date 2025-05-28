<template>
  <DY />
  <WB />
  <XHS />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Http } from '@/tools/http';
import { useRoute, useRouter } from 'vue-router';

// Left
import DY from '@/components/UserInfo/DY.vue';
import WB from '@/components/UserInfo/WB.vue';
import XHS from '@/components/UserInfo/XHS.vue';
</script>

<style scoped></style>
