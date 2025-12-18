<template>
  <div class="settings-security-view">
    <h3>Настройки безопасности</h3>
    <p>Активная вкладка: {{ currentTab }}</p>
    <div class="security-options">
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="twoFactorAuth" />
          Двухфакторная аутентификация
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="emailNotifications" />
          Email уведомления о входе
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currentTab: {
    type: String,
    default: 'security'
  }
})

const twoFactorAuth = ref(false)
const emailNotifications = ref(true)
</script>

<style scoped>
.settings-security-view {
  padding: 1rem;
}

.settings-security-view h3 {
  margin-bottom: 1rem;
  color: #333;
}

.settings-security-view p {
  margin-bottom: 1.5rem;
  color: #666;
}

.security-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
}

.option-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>

