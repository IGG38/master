<template>
   <div class="page">
      <NFlex class="content">
         <NFlex id="left" vertical>
            <User />
            <DatePicker :targetDate="targetDate" @selectDate="onSelectDate" />
            <Carousel />
         </NFlex>
         <div id="center">
            <NButton @click="GO">go test</NButton>
            <NButton @click="GO1">go test1</NButton>
            <!-- <CourseTable :selectDate="selectDate" /> -->
         </div>
         <div id="right">
            <Countdown :targetDate="targetDate" />
            <HeiSi />
            <!-- 8712d2458119ce30cfd119add078a814 -->
         </div>
      </NFlex>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Http } from '@/tools/http';
import { useRoute, useRouter } from 'vue-router';
import { NButton, NFlex } from 'naive-ui';
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

const router = useRouter();
const http = Http.getInstance();

const GO = () => {
   router.push('/test');
}
const GO1 = () => {
   router.push('/test1');
}

const init = async () => {




   // const resp = await http.get({
   //    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
   //    data: {
   //       key: '8712d2458119ce30cfd119add078a814',
   //       city: '330100',
   //       extensions: 'all',
   //       output: 'JSON'
   //    }
   // })
   // console.log(resp);
};

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
