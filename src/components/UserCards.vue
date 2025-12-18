<template>
  <div class="user-cards-container">
    <h2>Список пользователей</h2>
    
    <div class="filters">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Поиск по имени или email..."
        class="search-input"
      />
      <select v-model="roleFilter" class="role-select">
        <option value="">Все роли</option>
        <option value="admin">Администратор</option>
        <option value="moderator">Модератор</option>
        <option value="user">Пользователь</option>
      </select>
    </div>
    
    <div class="users-grid">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        :is-active="user.active"
        @counter-updated="handleCounterUpdate"
      >
        <!-- Именованный слот -->
        <template #actions>
          <div class="card-actions">
            <button @click="toggleUserStatus(user.id)" class="btn btn-small">
              {{ user.active ? 'Деактивировать' : 'Активировать' }}
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-small btn-danger">
              Удалить
            </button>
          </div>
        </template>
        
        <!-- Слот по умолчанию -->
        <p>ID: {{ user.id }} | Зарегистрирован: {{ formatDate(user.createdAt) }}</p>
      </UserCard>
    </div>
    
    <div class="stats">
      <p>Всего пользователей: {{ users.length }}</p>
      <p>Активных: {{ activeUsersCount }}</p>
      <p>Отфильтровано: {{ filteredUsers.length }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import UserCard from './UserCard.vue'

export default {
  name: 'UserCards',
  components: {
    UserCard
  },
  setup() {
    const searchQuery = ref('')
    const roleFilter = ref('')
    
    // Данные пользователей
    const users = ref([
      {
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        role: 'admin',
        active: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: 'Мария Петрова',
        email: 'maria@example.com',
        role: 'moderator',
        active: true,
        createdAt: new Date('2024-02-20')
      },
      {
        id: 3,
        name: 'Алексей Сидоров',
        email: 'alex@example.com',
        role: 'user',
        active: false,
        createdAt: new Date('2024-03-10')
      },
      {
        id: 4,
        name: 'Елена Козлова',
        email: 'elena@example.com',
        role: 'user',
        active: true,
        createdAt: new Date('2024-04-05')
      },
      {
        id: 5,
        name: 'Дмитрий Волков',
        email: 'dmitry@example.com',
        role: 'moderator',
        active: true,
        createdAt: new Date('2024-05-12')
      }
    ])
    
    // Вычисляемое свойство для фильтрации
    const filteredUsers = computed(() => {
      let result = users.value
      
      // Фильтр по поисковому запросу
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(user => 
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        )
      }
      
      // Фильтр по роли
      if (roleFilter.value) {
        result = result.filter(user => user.role === roleFilter.value)
      }
      
      return result
    })
    
    // Количество активных пользователей
    const activeUsersCount = computed(() => {
      return users.value.filter(user => user.active).length
    })
    
    // Методы
    const toggleUserStatus = (userId) => {
      const user = users.value.find(u => u.id === userId)
      if (user) {
        user.active = !user.active
      }
    }
    
    const deleteUser = (userId) => {
      if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        users.value = users.value.filter(u => u.id !== userId)
      }
    }
    
    const handleCounterUpdate = (value) => {
      console.log('Счётчик обновлён:', value)
    }
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ru-RU')
    }
    
    return {
      users,
      searchQuery,
      roleFilter,
      filteredUsers,
      activeUsersCount,
      toggleUserStatus,
      deleteUser,
      handleCounterUpdate,
      formatDate
    }
  }
}
</script>

<style scoped>
.user-cards-container {
  padding: 2rem;
}

.user-cards-container h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.role-select {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

.role-select:focus {
  outline: none;
  border-color: #667eea;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.stats {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.stats p {
  margin: 0;
  color: #666;
  font-weight: 500;
}
</style>

