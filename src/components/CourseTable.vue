<template>
   <div>
      <h1>课程表</h1>
      <table>
         <thead>
            <tr>
               <th>课程名称</th>
               <th>时间</th>
               <th>地点</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="course in courses" :key="course.id">
               <td>{{ course.name }}</td>
               <td>{{ course.time }}</td>
               <td>{{ course.location }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
export default {
   setup() {
      const courses = [
         { id: 1, name: '数学', time: '周一 9:00-10:30', location: '教室101' },
         { id: 2, name: '英语', time: '周二 10:30-12:00', location: '教室102' },
         { id: 3, name: '物理', time: '周三 13:00-14:30', location: '教室103' },
         // 可以继续添加更多课程
      ];

      return { courses };
   },
};
</script>

<style scoped>
table {
   width: 100%;
   border-collapse: collapse;
}

th,
td {
   border: 1px solid #ccc;
   padding: 8px;
   text-align: left;
}

th {
   background-color: #f2f2f2;
}
</style>