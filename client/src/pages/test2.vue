<template>
   <!-- <p><strong>昵称：</strong>{{ userInfo.profile?.screen_name }}</p>
   <p><strong>简介：</strong>{{ userInfo.profile?.description }}</p>
   <p><strong>关注：</strong>{{ userInfo.profile?.follows_count }}</p>
   <p><strong>粉丝：</strong>{{ userInfo.profile?.followers_count }}</p> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { NFlex } from 'naive-ui';
import { Http } from '@/tools/http';


const uid = ref('5612353058')
const userInfo = ref(null)

const http = Http.getInstance();
onMounted(async () => {

   const resp = await http.get({
      url: 'http://localhost:3001/api/weibo-info',
      params: {
         uid: '5612353058'
      }
   });
   console.log(resp);

   if (resp.__status !== 200) return;
   const data = resp.data;
   console.log(data)
   userInfo.value = {
      name: user.screen_name,
      uid: user.id,
      location: user.location,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
      description: user.description
   };

   // https://weibo.com/ajax/profile/info?uid=5612353058


   // https://weibo.com/ajax/profile/info?uid=5612353058
})


</script>
