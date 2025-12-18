<template>
  <div class="profile-info-view">
    <h2>Информация о профиле</h2>
    <div class="info-card">
      <p><strong>Имя:</strong> Иван Иванов</p>
      <p><strong>Email:</strong> ivan@example.com</p>
      <p><strong>Роль:</strong> Администратор</p>
      <p><strong>Дата регистрации:</strong> 15 января 2024</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-info-view {
  padding: 1rem;
}

.profile-info-view h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.info-card p {
  margin: 0.75rem 0;
  color: #666;
  font-size: 1.1rem;
}
</style>

