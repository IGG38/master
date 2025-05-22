<template>
  <div v-if="user" class="user-card">
    <!-- <div class="user-cover" v-if="user.cover" :style="{ backgroundImage: `url(${user.cover})` }"></div> -->

    <div class="user-header">
      <img :src="user.avatar" class="user-avatar" />
      <div class="user-info">
        <div class="user-name-line">
          <span class="user-name">{{ user.name }}</span>
        </div>
        <div class="user-description">
          {{ user.description || '暂无简介' }}
        </div>
        <div class="user-location" v-if="user.location">📍 {{ user.location }}</div>
      </div>
    </div>

    <div class="user-stats">
      <div class="stat">
        <div class="stat-number">{{ user.friends_count }}</div>
        <div class="stat-label">关注</div>
      </div>
      <div class="stat">
        <div class="stat-number">{{ user.followers_count }}</div>
        <div class="stat-label">粉丝</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Http } from '@/tools/http';

const uid = ref('5612353058'); //me
// const uid = ref('5494384472');
const userInfo = ref(null);
const http = Http.getInstance();

onMounted(async () => {
  const resp = await http.get({
    url: 'http://localhost:3001/api/weibo-info',
    params: { uid: uid.value },
  });

  if (resp.__status !== 200) return;
  userInfo.value = resp.data.user;
});

const user = computed(() => {
  if (!userInfo.value) return null;
  return {
    name: userInfo.value.screen_name,
    uid: userInfo.value.id,
    location: userInfo.value.location,
    followers_count: userInfo.value.followers_count,
    friends_count: userInfo.value.friends_count,
    description: userInfo.value.description,
    avatar: userInfo.value.avatar_hd,
    cover: userInfo.value.cover_image_phone,
  };
});
</script>

<style scoped>
.user-card {
  max-width: 460px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Helvetica Neue', sans-serif;
}
.user-cover {
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center center;
  border-radius: 12px 12px 0 0;
  margin-bottom: 16px;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
}
.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
  border: 1px solid #eee;
}

.user-info {
  flex: 1;
}

.user-name-line {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-badge {
  background-color: #ff8200;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 8px;
}

.user-description {
  font-size: 14px;
  color: #555;
  margin-top: 4px;
}

.user-location {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
</style>
