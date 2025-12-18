<template>
  <div class="user-profile">
    <h1>Профиль пользователя</h1>
    
    <div v-if="userId" class="profile-info">
      <p>ID пользователя: <strong>{{ userId }}</strong></p>
    </div>
    
    <nav class="profile-tabs">
      <router-link class="tab" to="/profile/info">Информация</router-link>
      <router-link class="tab" to="/profile/posts">Посты</router-link>
      <router-link class="tab" to="/profile/friends">Друзья</router-link>
    </nav>
    
    <!-- Отображаем вложенные маршруты -->
    <div class="tab-content">
      <router-view></router-view>
    </div>
    
    <!-- Кнопки навигации -->
    <div class="navigation-buttons">
      <button @click="goBack" class="btn">Назад</button>
      <button @click="goHome" class="btn">На главную</button>
      <button @click="goToSettings" class="btn">Настройки</button>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const userId = computed(() => route.params.id)
    
    const goBack = () => {
      router.back()
    }
    
    const goHome = () => {
      router.push('/')
    }
    
    const goToSettings = () => {
      router.push('/settings')
    }
    
    return {
      userId,
      goBack,
      goHome,
      goToSettings
    }
  },
  // Хуки навигации
  beforeRouteEnter(to, from, next) {
    console.log('Заходим в профиль пользователя')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('Обновляем параметры маршрута профиля')
    next()
  }
}
</script>

<style scoped>
.user-profile {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.user-profile h1 {
  margin-bottom: 2rem;
  color: #333;
}

.profile-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.profile-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
}

.tab {
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  font-weight: 500;
}

.tab:hover {
  color: #667eea;
}

.tab.router-link-active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-content {
  min-height: 200px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.navigation-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  background: #667eea;
  color: white;
}

.btn:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>

