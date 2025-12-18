<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Запрошенная страница не существует.</p>
    <button @click="goHome" class="btn">Вернуться на главную</button>
    
    <div class="debug-info">
      <h3>Отладочная информация:</h3>
      <p>Путь: <code>{{ $route.path }}</code></p>
      <p>Параметры: <code>{{ JSON.stringify($route.params) }}</code></p>
      <p>Запрос: <code>{{ JSON.stringify($route.query) }}</code></p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    
    const goHome = () => {
      router.push('/')
    }
    
    return {
      goHome
    }
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #e74c3c;
}

.not-found p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.debug-info {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: left;
}

.debug-info h3 {
  margin-bottom: 1rem;
  color: #333;
}

.debug-info p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.debug-info code {
  background: #e9ecef;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e74c3c;
}
</style>

