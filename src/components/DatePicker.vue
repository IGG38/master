<template>
   <div class="calendar">
      <div class="calendar-header">
         <span>{{ currentMonthYear }}</span>
         <button @click="previousMonth">＜</button>
         <button @click="nextMonth">＞</button>
      </div>
      <div class="calendar-weekdays">
         <span class="calendar-weekdays-item" v-for="day in daysOfWeek" :key="day">{{ day }}</span>
      </div>
      <div class="calendar-days" @dbclick="onPressDoubleClick(day)">
         <!-- 上个月的日期（灰色显示） -->
         <span v-for="day in previousMonthDays" :key="'prev' + day" class="calendar-day other-month">
            {{ day }}
         </span>
         <!-- 本月的日期 -->
         <span v-for="day in daysInMonth" :key="day"
            :class="['calendar-day', { today: isToday(day), selected: day === selectedDay, weekend: isWeekend(day), star: isTargetDate(day) }]"
            @click="selectDay(day)">
            {{ day }}
         </span>
         <!-- 下个月的日期（灰色显示） -->
         <span v-for="day in nextMonthDays" :key="'next' + day" class="calendar-day other-month">
            {{ day }}
         </span>
      </div>
   </div>
</template>

<script>
import { ref, computed } from 'vue';
import moment from 'moment';

export default {
   props: {
      targetDate: {
         type: Object,
         required: true,
      },
   },
   setup(props) {
      const currentDate = ref(moment());
      const selectedDay = ref(null);

      const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

      const currentMonthYear = computed(() => currentDate.value.format('MMMM YYYY'));

      // 计算本月的天数
      const daysInMonth = computed(() => {
         return Array.from({ length: currentDate.value.daysInMonth() }, (_, i) => i + 1);
      });

      // 计算本月第一天是星期几
      const startOfMonth = computed(() => currentDate.value.startOf('month').day());

      // 计算上个月的天数，用于填充前面空白的日期
      const previousMonthDays = computed(() => {
         const firstDayOfWeek = startOfMonth.value === 0 ? 7 : startOfMonth.value;
         const prevMonthDaysCount = firstDayOfWeek - 1;
         const prevMonthLastDate = moment(currentDate.value).subtract(1, 'months').daysInMonth();
         return Array.from({ length: prevMonthDaysCount }, (_, i) => prevMonthLastDate - prevMonthDaysCount + i + 1);
      });

      // 计算下个月的天数，用于填充后面的空白日期
      const nextMonthDays = computed(() => {
         const daysCount = previousMonthDays.value.length + daysInMonth.value.length;
         const nextDaysCount = daysCount % 7 === 0 ? 0 : 7 - (daysCount % 7);
         return Array.from({ length: nextDaysCount }, (_, i) => i + 1);
      });

      // 判断是否为今天
      const isToday = (day) => {
         const today = moment();
         return (
            today.date() === day &&
            today.month() === currentDate.value.month() &&
            today.year() === currentDate.value.year()
         );
      };

      // 判断是否为周末
      const isWeekend = (day) => {
         const date = moment(currentDate.value).date(day);
         return date.day() === 0 || date.day() === 6; // 0是周日，6是周六
      };

      // 判断当前日期是否为目标日期
      const isTargetDate = (day) => {
         return moment(currentDate.value).date(day).isSame(moment(props.targetDate), 'day');
      };



      const selectDay = (day) => {
         const selectedDate = moment(currentDate.value).date(day);
         console.log(selectedDate.format('YYYY-MM-DD')); // 输出完整日期
         console.log(selectedDate.valueOf()); // 输出时间戳（毫秒）
         selectedDay.value = day; // 更新选中的天
      };

      const previousMonth = () => {
         currentDate.value = moment(currentDate.value).subtract(1, 'months');
         selectedDay.value = null;
      };

      const nextMonth = () => {
         currentDate.value = moment(currentDate.value).add(1, 'months');
         selectedDay.value = null;
      };



      return {
         daysOfWeek,
         currentMonthYear,
         daysInMonth,
         previousMonthDays,
         nextMonthDays,
         isToday,
         isWeekend,
         isTargetDate,
         selectedDay,
         selectDay,
         previousMonth,
         nextMonth,
      };
   },
};
</script>

<style scoped>
.calendar {
   width: 100%;
   padding: 16px;
   background-color: #fafbfc;
   box-sizing: border-box;
}

.calendar-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px;
   font-weight: bold;
}

.calendar-weekdays,
.calendar-days {
   display: grid;
   grid-template-columns: repeat(7, 1fr);
   text-align: center;
   gap: 4px;
   padding: 4px;
}

.calendar-day,
.calendar-weekdays-item {
   width: 32px;
   height: 32px;
   line-height: 32px;
   border-radius: 50%;
   cursor: pointer;
}

.other-month {
   color: #ccc;
}

.today {
   background-color: #000;
   color: #fff;
}

.selected {
   background-color: #007bff;
   color: #fff;
}

.weekend {
   color: red;
   /* 标记周末的颜色 */
}


.star {
   /* background-image: url('path/to/star-icon.png'); */
   /* 替换为你的五角星图标路径 */
   background-size: cover;
   border-radius: 50%;
   background-color: yellow;
   /* 可选：让圆形效果更明显 */
}
</style>