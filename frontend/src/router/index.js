import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import MainMenuView from '@/views/MainMenuView.vue';
import LoginView from '@/views/LoginView.vue';
import AccountView from '@/views/AccountView.vue';
import GameChooseHUB from '@/views/GameChooseHUB.vue';
import StartGame from '@/views/StartGame.vue';
import ChooseMode from '@/views/ChooseMode.vue';
import ChooseLevel from '@/views/ChooseLevel.vue';
import MiniGame from '@/components/MiniGame.vue';
import QuizView from '@/views/QuizView.vue';
import SessionPage from "@/components/SessionPage.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path : '/mainmenu',
    name : 'mainmenu',
    props: {
      userManager: {
        "logout": "/"
      },
      userProfile: {
        'userName': 'marekkox',
        'booster': true,
        'level': 4
      }
    },
    meta: {
      hideNavbar: true,
    },
    component : MainMenuView
  },
  {
    path : '/gamechoose',
    name : 'gamechoose',
    component : GameChooseHUB
  },
  {
    path : '/quiz',
    name : 'quiz',
    component : QuizView
  },
  {
    path : '/startgame',
    name : 'startgame',
    component : StartGame
  },
  {
    path : '/choosemode',
    name : 'choosemode',
    component : ChooseMode
  },
  {
    path : '/chooselevel',
    name : 'chooselevel',
    component : ChooseLevel
  },
  {
    path : '/minigame',
    name : 'minigame',
    component : MiniGame
  },
  {
    path : '/session',
    name : 'session',
    component : SessionPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
