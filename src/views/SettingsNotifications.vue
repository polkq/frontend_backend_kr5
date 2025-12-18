<template>
  <div class="settings-notifications-view">
    <h3>Уведомления</h3>
    <p>Активная вкладка: {{ currentTab }}</p>
    <div class="notification-options">
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="emailNotifications" />
          Email уведомления
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="pushNotifications" />
          Push уведомления
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="smsNotifications" />
          SMS уведомления
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
    default: 'notifications'
  }
})

const emailNotifications = ref(true)
const pushNotifications = ref(false)
const smsNotifications = ref(false)
</script>

<style scoped>
.settings-notifications-view {
  padding: 1rem;
}

.settings-notifications-view h3 {
  margin-bottom: 1rem;
  color: #333;
}

.settings-notifications-view p {
  margin-bottom: 1.5rem;
  color: #666;
}

.notification-options {
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

