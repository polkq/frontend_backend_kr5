<template>
  <div class="search-example">
    <h2>Пример поиска с v-model</h2>
    
    <div class="search-section">
      <label for="search-input">Поиск:</label>
      <input 
        id="search-input"
        v-model="searchText" 
        type="text" 
        placeholder="Введите текст для поиска..."
        class="search-field"
      />
      <p class="search-result">Вы ищете: <strong>{{ searchText || '(пусто)' }}</strong></p>
    </div>
    
    <div class="form-section">
      <h3>Форма с v-model</h3>
      
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input 
          id="username"
          v-model="formData.username" 
          type="text" 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email"
          v-model="formData.email" 
          type="email" 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="age">Возраст:</label>
        <input 
          id="age"
          v-model.number="formData.age" 
          type="number" 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>
          <input 
            type="checkbox" 
            v-model="formData.subscribe"
          />
          Подписаться на рассылку
        </label>
      </div>
      
      <div class="form-group">
        <label>Выберите роль:</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.role" value="user" />
            Пользователь
          </label>
          <label>
            <input type="radio" v-model="formData.role" value="admin" />
            Администратор
          </label>
          <label>
            <input type="radio" v-model="formData.role" value="moderator" />
            Модератор
          </label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="country">Страна:</label>
        <select id="country" v-model="formData.country" class="form-select">
          <option value="">Выберите страну</option>
          <option value="ru">Россия</option>
          <option value="us">США</option>
          <option value="uk">Великобритания</option>
          <option value="de">Германия</option>
        </select>
      </div>
      
      <button @click="submitForm" class="btn btn-submit">Отправить</button>
    </div>
    
    <div class="form-preview">
      <h3>Предпросмотр данных формы:</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchText = ref('')
const formData = ref({
  username: '',
  email: '',
  age: null,
  subscribe: false,
  role: 'user',
  country: ''
})

// Отслеживание изменений поискового запроса
watch(searchText, (newValue) => {
  console.log('Поисковый запрос изменён:', newValue)
})

// Отслеживание изменений формы
watch(formData, (newValue) => {
  console.log('Данные формы изменены:', newValue)
}, { deep: true })

const submitForm = () => {
  alert('Форма отправлена!\n' + JSON.stringify(formData.value, null, 2))
}
</script>

<style scoped>
.search-example {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.search-example h2 {
  margin-bottom: 2rem;
  color: #333;
}

.search-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.search-section label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.search-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

.search-field:focus {
  outline: none;
  border-color: #667eea;
}

.search-result {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-section h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  cursor: pointer;
}

.form-group input[type="checkbox"] {
  margin-right: 0.5rem;
  cursor: pointer;
}

.btn-submit {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.form-preview {
  padding: 1.5rem;
  background: #1a1a1a;
  border-radius: 8px;
  color: #00ff00;
}

.form-preview h3 {
  margin-bottom: 1rem;
  color: #fff;
}

.form-preview pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}
</style>

