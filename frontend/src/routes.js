// src/routes.js
import MultiplayerBoard from '@/components/MultiplayerBoard.vue';
import Home from '@/views/HomeView.vue';

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
];

export default routes;
