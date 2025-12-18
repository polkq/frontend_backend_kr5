<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue 3 Практика - Компоненты и Роутинг</h1>
      <p>Изучаем компоненты, пропсы, v-model и Vue Router</p>
    </header>
    
    <nav class="main-nav">
      <router-link class="nav-link" to="/">Главная</router-link>
      <router-link class="nav-link" to="/palette">Палитры</router-link>
      <router-link class="nav-link" to="/users">Пользователи</router-link>
      <router-link class="nav-link" to="/search">Поиск</router-link>
      <router-link class="nav-link" to="/profile">Профиль</router-link>
      <router-link class="nav-link" to="/settings">Настройки</router-link>
    </nav>
    
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <footer class="app-footer">
      <p>Vue 3 + Vite • Практика 27-28</p>
    </footer>
  </div>
</template>

<script setup>
// Роутер подключён глобально через main.js
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.app-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.main-nav {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: #42b883;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>

