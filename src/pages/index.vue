<template>
   <div class="page">
      <NFlex class="content">
         <NFlex id="right" vertical>
            <User />
            <DatePicker :targetDate="targetDate" />
            <Carousel />
         </NFlex>
         <div id="center">
            <CourseTable />
         </div>
         <div id="left">
            <Countdown :targetDate="targetDate" />
         </div>
      </NFlex>
   </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { NFlex } from 'naive-ui';
import moment from 'moment';

// Left
import User from '@/components/User.vue';
import DatePicker from '@/components/DatePicker.vue';
import Carousel from '@/components/Carousel.vue';

// Center
import CourseTable from '@/components/CourseTable.vue';

// Right
import Countdown from '@/components/Countdown.vue';

export default {
   components: { NFlex, User, DatePicker, Carousel, CourseTable, Countdown },
   setup() {
      const targetDate = ref(moment('2025-12-20'));

      return { targetDate };
   },
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

#right {
   flex: 0.2;
   border-radius: 8px;
   /* background-color: #fafbfc; */
}

#center {
   flex: 0.6;
   border-radius: 8px;
   background-color: #fafbfc;
}

#left {
   flex: 0.2;
   border-radius: 8px;
   background-color: #fafbfc;
}
</style>
