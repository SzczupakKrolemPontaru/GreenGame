import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartGame from '../views/StartGame.vue'
import ChooseLevel from '../views/ChooseLevel.vue'
import MiniGame from '../components/MiniGame.vue'
import Home from '@/views/HomeView.vue';
import LoginPage from '@/components/LoginPage.vue';
import ChooseMode from '@/views/ChooseMode.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/start',
    name: 'start',
    component: StartGame
  },
  {
    path: '/choose',
    name: 'choose',
    component: ChooseLevel
  },
  {
    path: '/minigame',
    name: 'minigame',
    component: MiniGame
  },
  {
    path: '/',
    name: 'HomeView',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component:LoginPage,
  },
  {
    path: '/mode',
    name: 'mode',
    component:ChooseMode,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
