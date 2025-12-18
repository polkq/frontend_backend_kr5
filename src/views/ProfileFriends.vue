<template>
  <div class="profile-friends-view">
    <h2>Друзья</h2>
    <div class="friends-list">
      <div v-for="friend in friends" :key="friend.id" class="friend-card">
        <div class="friend-avatar">{{ friend.name.charAt(0) }}</div>
        <div class="friend-info">
          <h4>{{ friend.name }}</h4>
          <p>{{ friend.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const friends = ref([
  { id: 1, name: 'Мария Петрова', status: 'Онлайн' },
  { id: 2, name: 'Алексей Сидоров', status: 'Был в сети 2 часа назад' },
  { id: 3, name: 'Елена Козлова', status: 'Онлайн' },
  { id: 4, name: 'Дмитрий Волков', status: 'Был в сети вчера' }
])
</script>

<style scoped>
.profile-friends-view {
  padding: 1rem;
}

.profile-friends-view h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.friends-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.friend-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.friend-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
}

.friend-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>

