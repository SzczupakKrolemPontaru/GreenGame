// src/routes.js
import Home from '@/views/HomeView.vue';
import LoginPage from '@/components/LoginPage.vue';
const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component:LoginPage,
    }
];

export default routes;
