<template>
  <div class="profile-posts-view">
    <h2>Посты пользователя</h2>
    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <span class="post-date">{{ post.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Первый пост',
    content: 'Это мой первый пост в системе.',
    date: '2024-01-20'
  },
  {
    id: 2,
    title: 'Второй пост',
    content: 'Здесь я делюсь своими мыслями.',
    date: '2024-02-15'
  },
  {
    id: 3,
    title: 'Третий пост',
    content: 'Ещё один интересный пост для вас.',
    date: '2024-03-10'
  }
])
</script>

<style scoped>
.profile-posts-view {
  padding: 1rem;
}

.profile-posts-view h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.post-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.post-card p {
  color: #666;
  margin-bottom: 0.5rem;
}

.post-date {
  font-size: 0.9rem;
  color: #999;
}
</style>

