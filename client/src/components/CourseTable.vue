<template>
  <NFlex class="course-table" justify="center" align="center">{{ selectDate }}</NFlex>
</template>

<script>
import { ref, watch } from 'vue';
import { NFlex } from 'naive-ui';
import moment from 'moment';

export default {
  components: { NFlex },

  props: {
    selectDate: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const selectDate = ref('');

    watch(
      () => props.selectDate,
      (newVal) => {
        const selectDateFormat = moment(newVal).format('YYYY-MM-DD');
        selectDate.value = selectDateFormat;
      }
    );

    return { selectDate };
  },
};
</script>

<style>
.course-table {
  width: 100%;
  height: 100%;
}
</style>
