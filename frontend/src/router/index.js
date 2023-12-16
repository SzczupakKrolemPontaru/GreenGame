import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/mainmenu/MainMenuView.vue'

const routes = [
  {
    path: '/mainmenu',
    name: 'mainmenu',
    component: MainMenu,
    props: {
      userManager: [],
      userProfile: []
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
