<template>
  <div class="page">
    <NFlex class="content">
      <NFlex id="left" vertical>
        <User />
        <DatePicker :targetDate="targetDate" @selectDate="onSelectDate" />
        <!-- <Carousel /> -->
      </NFlex>
      <div id="center">
        <CourseTable :selectDate="selectDate" />
      </div>
      <div id="right">
        <Countdown :targetDate="targetDate" />
        <HeiSi />
      </div>
    </NFlex>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NFlex } from 'naive-ui';
import { Http } from '@/tools/http';
import moment from 'moment';

// Left
import User from '@/components/User.vue';
import DatePicker from '@/components/DatePicker.vue';
import Carousel from '@/components/Carousel.vue';

// Center
import CourseTable from '@/components/CourseTable.vue';

// Right
import Countdown from '@/components/Countdown.vue';
import HeiSi from '@/components/HeiSi.vue';

const http = Http.getInstance();

const heisi = ref('');

const init = async () => {};

onMounted(() => {
  init();
});

const targetDate = ref(moment('2025-12-20').valueOf());
const selectDate = ref(0);

const onSelectDate = (date) => {
  selectDate.value = date;
};
</script>

<style scoped>
.page {
  padding: 24px;
  /* width: 100vw; */
  height: 100vh;
}

.content {
  width: 100%;
  height: 100%;
}

#left {
  flex: 0.2;
  border-radius: 8px;
  /* background-color: #fafbfc; */
}

#center {
  flex: 0.6;
  border-radius: 8px;
  background-color: #fafbfc;
}

#right {
  flex: 0.2;
  border-radius: 8px;
  background-color: #fafbfc;
}
</style>
