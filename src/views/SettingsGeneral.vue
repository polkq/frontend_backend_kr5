<template>
  <div class="settings-general-view">
    <h3>Основные настройки</h3>
    <p>Активная вкладка: {{ currentTab }}</p>
    <div class="settings-form">
      <div class="form-group">
        <label>Язык интерфейса:</label>
        <select v-model="language" class="form-select">
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
      <div class="form-group">
        <label>Тема оформления:</label>
        <select v-model="theme" class="form-select">
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
          <option value="auto">Автоматическая</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currentTab: {
    type: String,
    default: 'general'
  }
})

const language = ref('ru')
const theme = ref('light')
</script>

<style scoped>
.settings-general-view {
  padding: 1rem;
}

.settings-general-view h3 {
  margin-bottom: 1rem;
  color: #333;
}

.settings-general-view p {
  margin-bottom: 1.5rem;
  color: #666;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-select {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
</style>

