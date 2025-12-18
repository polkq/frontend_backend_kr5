<template>
  <div class="user-card" :class="user.role">
    <h3>{{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Роль: {{ user.role }}</p>
    <p>Статус: {{ isActive ? 'Активен' : 'Неактивен' }}</p>
    
    <!-- Слот для дополнительного контента -->
    <slot name="actions"></slot>
    
    <!-- Слот по умолчанию -->
    <slot>
      <p>Нет дополнительной информации</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  
  // Определяем пропсы, которые компонент принимает
  props: {
    user: {
      type: Object,
      required: true,
      // Валидация объекта
      validator: (value) => {
        return value.name && value.email
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  
  // Локальное состояние компонента
  data() {
    return {
      localCounter: 0
    }
  },
  
  computed: {
    // Вычисляемое свойство на основе пропсов
    userRole() {
      return this.user.role || 'user'
    }
  },
  
  methods: {
    incrementCounter() {
      this.localCounter++
      // Эмитим событие для родительского компонента
      this.$emit('counter-updated', this.localCounter)
    }
  }
}
</script>

<style scoped>
.user-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1rem;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.user-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.5rem;
}

.user-card p {
  margin: 0.5rem 0;
  color: #666;
}

.user-card.admin {
  border-left: 4px solid #e74c3c;
}

.user-card.moderator {
  border-left: 4px solid #f39c12;
}

.user-card.user {
  border-left: 4px solid #3498db;
}
</style>

