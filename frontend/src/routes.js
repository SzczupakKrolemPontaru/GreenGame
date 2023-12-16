// src/routes.js
import MultiplayerBoard from '@/components/MultiplayerBoard.vue';
import Home from '@/views/HomeView.vue';
import LoginPage from '@/components/LoginPage.vue';
const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: Home,
    },
    {
        path: '/multiplayer',
        name: 'Multiplayer',
        component: MultiplayerBoard,
    },
    {
        path: '/login',
        name: 'Login',
        component:LoginPage,
    }
];

export default routes;
