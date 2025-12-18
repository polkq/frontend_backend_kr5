<template>
  <div class="home-page">
    <h1>Главная страница</h1>
    <p class="subtitle">Добро пожаловать в приложение Vue 3!</p>
    
    <div class="features-grid">
      <div class="feature-card">
        <h3>🎨 Генератор палитр</h3>
        <p>Создавайте и управляйте цветовыми палитрами</p>
        <router-link to="/palette" class="feature-link">Перейти →</router-link>
      </div>
      
      <div class="feature-card">
        <h3>👥 Пользователи</h3>
        <p>Управление списком пользователей с фильтрацией</p>
        <router-link to="/users" class="feature-link">Перейти →</router-link>
      </div>
      
      <div class="feature-card">
        <h3>⚙️ Настройки</h3>
        <p>Настройте параметры приложения</p>
        <router-link to="/settings" class="feature-link">Перейти →</router-link>
      </div>
    </div>
    
    <div class="info-section">
      <h2>О проекте</h2>
      <p>Это учебное приложение для изучения Vue 3, включающее:</p>
      <ul>
        <li>Composition API</li>
        <li>Компоненты и пропсы</li>
        <li>Vue Router для навигации</li>
        <li>Реактивность и директивы</li>
        <li>Работа с формами (v-model)</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Composition API setup
</script>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.home-page h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.feature-link:hover {
  color: #764ba2;
}

.info-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
}

.info-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.info-section p {
  margin-bottom: 1rem;
  color: #666;
}

.info-section ul {
  list-style-position: inside;
  color: #666;
  line-height: 2;
}

.info-section li {
  margin-bottom: 0.5rem;
}
</style>

