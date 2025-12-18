import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'
import NotFound from '../views/NotFound.vue'
import ColorPaletteGenerator from '../components/ColorPaletteGenerator.vue'
import UserCards from '../components/UserCards.vue'
import SearchExample from '../components/SearchExample.vue'
import ProfileInfo from '../views/ProfileInfo.vue'
import ProfilePosts from '../views/ProfilePosts.vue'
import ProfileFriends from '../views/ProfileFriends.vue'
import SettingsGeneral from '../views/SettingsGeneral.vue'
import SettingsSecurity from '../views/SettingsSecurity.vue'
import SettingsNotifications from '../views/SettingsNotifications.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/palette',
    name: 'Palette',
    component: ColorPaletteGenerator
  },
  {
    path: '/users',
    name: 'Users',
    component: UserCards
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchExample
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    redirect: '/profile/info',
    children: [
      {
        path: 'info',
        name: 'ProfileInfo',
        component: ProfileInfo
      },
      {
        path: 'posts',
        name: 'ProfilePosts',
        component: ProfilePosts
      },
      {
        path: 'friends',
        name: 'ProfileFriends',
        component: ProfileFriends
      }
    ]
  },
  {
    // Динамический маршрут с параметром
    path: '/profile/:id',
    name: 'UserDetail',
    component: UserProfile,
    props: true,
    redirect: to => `/profile/${to.params.id}/info`,
    children: [
      {
        path: 'info',
        name: 'UserDetailInfo',
        component: ProfileInfo
      },
      {
        path: 'posts',
        name: 'UserDetailPosts',
        component: ProfilePosts
      },
      {
        path: 'friends',
        name: 'UserDetailFriends',
        component: ProfileFriends
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: UserSettings,
    // Перенаправляем на вложенный маршрут
    redirect: '/settings/general',
    children: [
      {
        path: 'general',
        name: 'SettingsGeneral',
        component: SettingsGeneral
      },
      {
        path: 'security',
        name: 'SettingsSecurity',
        component: SettingsSecurity
      },
      {
        path: 'notifications',
        name: 'SettingsNotifications',
        component: SettingsNotifications
      }
    ]
  },
  {
    // Обработка 404
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

