<template>
  <div class="user-settings">
    <h1>Настройки</h1>
    
    <div class="settings-tabs">
      <router-link class="tab" to="/settings/general">Основные</router-link>
      <router-link class="tab" to="/settings/security">Безопасность</router-link>
      <router-link class="tab" to="/settings/notifications">Уведомления</router-link>
    </div>
    
    <div class="settings-content">
      <!-- Параметр маршрута передаётся как проп -->
      <p>Активная вкладка: <strong>{{ currentTab }}</strong></p>
      <router-view :current-tab="currentTab"></router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'UserSettings',
  setup() {
    const route = useRoute()
    
    // Получаем параметр маршрута
    const currentTab = computed(() => {
      return route.params.tab || 'general'
    })
    
    return {
      currentTab
    }
  }
}
</script>

<style scoped>
.user-settings {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.user-settings h1 {
  margin-bottom: 2rem;
  color: #333;
}

.settings-tabs {
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

.settings-content {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 300px;
}

.settings-content p {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.1rem;
}
</style>

