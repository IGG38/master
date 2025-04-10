<template>
  <div class="countdown">
    <h2>倒计时：{{ days }} 天 {{ hours }} 小时 {{ minutes }} 分钟 {{ seconds }} 秒</h2>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import moment from 'moment';

export default {
  props: {
    targetDate: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const targetDate = moment(props.targetDate);

    const countdown = ref(targetDate.diff(moment(), 'seconds')); // 计算当前时间与目标时间的差值（秒）
    const interval = ref(null);

    // 计算剩余天、小时、分钟和秒
    const days = computed(() => Math.max(Math.floor(countdown.value / (24 * 60 * 60)), 0));
    const hours = computed(() => Math.max(Math.floor((countdown.value % (24 * 60 * 60)) / (60 * 60)), 0));
    const minutes = computed(() => Math.max(Math.floor((countdown.value % (60 * 60)) / 60), 0));
    const seconds = computed(() => Math.max(countdown.value % 60, 0));

    const updateCountdown = () => {
      countdown.value = targetDate.diff(moment(), 'seconds'); // 更新倒计时
      if (countdown.value <= 0) {
        clearInterval(interval.value);
      }
    };

    onMounted(() => {
      updateCountdown(); // 初始化倒计时
      interval.value = setInterval(updateCountdown, 1000); // 每秒更新
    });

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
};
</script>

<style scoped>
.countdown {
  text-align: center;
}
</style>
