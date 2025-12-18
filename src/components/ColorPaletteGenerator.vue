<template>
  <div class="palette-generator">
    <!-- Панель управления -->
    <div class="controls-panel">
      <button @click="generateRandomPalette" class="btn btn-primary">
        🎨 Случайная палитра
      </button>
      
      <div class="control-group">
        <label for="color-count">Количество цветов:</label>
        <select id="color-count" v-model="colorCount" @change="regeneratePalette">
          <option :value="3">3</option>
          <option :value="5">5</option>
          <option :value="7">7</option>
        </select>
      </div>
      
      <div class="control-group">
        <label for="format">Формат:</label>
        <select id="format" v-model="colorFormat">
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="darkMode" />
          Тёмный фон
        </label>
      </div>
    </div>
    
    <!-- Палитра цветов -->
    <div class="palette-container">
      <div 
        v-for="(color, index) in palette" 
        :key="index"
        class="color-card"
        :class="{ 'pinned': color.pinned }"
        :style="{ backgroundColor: color.hex }"
        @click="copyToClipboard(color)"
      >
        <div class="color-info" :class="{ 'dark-text': isLightColor(color.hex) }">
          <div class="color-value">
            {{ formatColorValue(color) }}
          </div>
          <div class="color-actions">
            <button 
              @click.stop="togglePin(index)"
              class="pin-btn"
              :title="color.pinned ? 'Открепить' : 'Закрепить'"
            >
              {{ color.pinned ? '📌' : '📍' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Уведомление о копировании -->
    <transition name="fade">
      <div v-if="showNotification" class="notification">
        ✓ Скопировано в буфер обмена!
      </div>
    </transition>
    
    <!-- Просмотрщик палитры -->
    <div class="preview-section" :class="{ 'dark-mode': darkMode }">
      <h2>Превью палитры</h2>
      <div class="mockup-container">
        <div class="mockup-header" :style="{ backgroundColor: palette[0]?.hex || '#667eea' }">
          <h3 :style="{ color: getContrastColor(palette[0]?.hex || '#667eea') }">
            Заголовок
          </h3>
        </div>
        <div class="mockup-card" :style="{ backgroundColor: palette[1]?.hex || '#f0f0f0', borderColor: palette[0]?.hex || '#667eea' }">
          <p :style="{ color: getContrastColor(palette[1]?.hex || '#f0f0f0') }">
            Карточка с контентом
          </p>
        </div>
        <button 
          class="mockup-button" 
          :style="{ 
            backgroundColor: palette[2]?.hex || '#667eea',
            color: getContrastColor(palette[2]?.hex || '#667eea')
          }"
        >
          Кнопка действия
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Реактивные данные
const palette = ref([])
const colorCount = ref(5)
const colorFormat = ref('hex')
const darkMode = ref(false)
const showNotification = ref(false)

// Генерация случайного цвета в HEX
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
}

// Преобразование HEX в RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Генерация гармоничной палитры
const generateHarmoniousPalette = (count) => {
  const colors = []
  const baseHue = Math.random() * 360
  
  for (let i = 0; i < count; i++) {
    // Генерируем цвета с близкими оттенками для гармонии
    const hue = (baseHue + (i * 60)) % 360
    const saturation = 50 + Math.random() * 30
    const lightness = 40 + Math.random() * 30
    
    // Конвертируем HSL в RGB, затем в HEX
    const hex = hslToHex(hue, saturation, lightness)
    colors.push({
      hex: hex,
      pinned: false
    })
  }
  
  return colors
}

// Преобразование HSL в HEX
const hslToHex = (h, s, l) => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

// Генерация случайной палитры
const generateRandomPalette = () => {
  const newPalette = generateHarmoniousPalette(colorCount.value)
  
  // Сохраняем закреплённые цвета
  const pinnedColors = palette.value.filter(c => c.pinned)
  const pinnedIndices = []
  
  palette.value.forEach((color, index) => {
    if (color.pinned) {
      pinnedIndices.push(index)
    }
  })
  
  // Заменяем незакреплённые цвета
  pinnedIndices.forEach((pinnedIndex, i) => {
    if (pinnedIndex < newPalette.length) {
      newPalette[pinnedIndex] = palette.value[pinnedIndex]
    }
  })
  
  palette.value = newPalette
  saveToLocalStorage()
}

// Регенерация палитры при изменении количества
const regeneratePalette = () => {
  const currentPinned = palette.value.filter(c => c.pinned)
  
  if (currentPinned.length === 0) {
    generateRandomPalette()
  } else {
    // Сохраняем закреплённые и добавляем новые
    const newPalette = [...currentPinned]
    const needed = colorCount.value - currentPinned.length
    
    if (needed > 0) {
      const additional = generateHarmoniousPalette(needed)
      newPalette.push(...additional)
    } else {
      // Если нужно меньше цветов, оставляем только закреплённые
      newPalette.splice(colorCount.value)
    }
    
    palette.value = newPalette.slice(0, colorCount.value)
    saveToLocalStorage()
  }
}

// Копирование в буфер обмена
const copyToClipboard = async (color) => {
  const value = formatColorValue(color)
  try {
    await navigator.clipboard.writeText(value)
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 2000)
  } catch (err) {
    console.error('Ошибка копирования:', err)
  }
}

// Форматирование значения цвета
const formatColorValue = (color) => {
  if (colorFormat.value === 'rgb') {
    const rgb = hexToRgb(color.hex)
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color.hex
  }
  return color.hex
}

// Переключение закрепления цвета
const togglePin = (index) => {
  palette.value[index].pinned = !palette.value[index].pinned
  saveToLocalStorage()
}

// Проверка, является ли цвет светлым
const isLightColor = (hex) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return false
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128
}

// Получение контрастного цвета
const getContrastColor = (hex) => {
  return isLightColor(hex) ? '#000000' : '#FFFFFF'
}

// Сохранение в localStorage
const saveToLocalStorage = () => {
  try {
    localStorage.setItem('colorPalette', JSON.stringify({
      palette: palette.value,
      colorCount: colorCount.value,
      colorFormat: colorFormat.value,
      darkMode: darkMode.value
    }))
  } catch (err) {
    console.error('Ошибка сохранения:', err)
  }
}

// Загрузка из localStorage
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('colorPalette')
    if (saved) {
      const data = JSON.parse(saved)
      palette.value = data.palette || []
      colorCount.value = data.colorCount || 5
      colorFormat.value = data.colorFormat || 'hex'
      darkMode.value = data.darkMode || false
    } else {
      generateRandomPalette()
    }
  } catch (err) {
    console.error('Ошибка загрузки:', err)
    generateRandomPalette()
  }
}

// Отслеживание изменений для автосохранения
watch([colorFormat, darkMode], () => {
  saveToLocalStorage()
})

// Инициализация
onMounted(() => {
  loadFromLocalStorage()
  if (palette.value.length === 0) {
    generateRandomPalette()
  }
})
</script>

<style scoped>
.palette-generator {
  width: 100%;
}

.controls-panel {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.control-group select {
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

.control-group select:hover {
  border-color: #667eea;
}

.control-group input[type="checkbox"] {
  margin-right: 0.5rem;
  cursor: pointer;
}

.palette-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.color-card {
  flex: 1;
  min-width: 150px;
  min-height: 200px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
}

.color-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.color-card.pinned {
  border: 3px solid #333;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.3);
}

.color-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-info.dark-text {
  background: rgba(255,255,255,0.3);
}

.color-value {
  font-weight: 600;
  font-size: 1rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  font-family: 'Courier New', monospace;
}

.color-info.dark-text .color-value {
  color: #000;
  text-shadow: 0 1px 3px rgba(255,255,255,0.5);
}

.pin-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pin-btn:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1);
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.preview-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 2rem;
}

.preview-section.dark-mode {
  background: #1a1a1a;
  color: white;
}

.preview-section h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.preview-section.dark-mode h2 {
  color: white;
}

.mockup-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mockup-header {
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.mockup-header h3 {
  font-size: 2rem;
  margin: 0;
}

.mockup-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid;
}

.mockup-card p {
  margin: 0;
  font-size: 1.1rem;
}

.mockup-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  align-self: flex-start;
}

.mockup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .palette-container {
    flex-direction: column;
  }
  
  .color-card {
    min-width: 100%;
  }
  
  .controls-panel {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

