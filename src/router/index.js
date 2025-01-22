import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { Home } from '@/views';
import accountRoutes from '@/router/account.routes';
import calendarRoutes from '@/router/calendar.routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Home },
        { ...accountRoutes },
        { ...calendarRoutes },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !(await authStore.getCurrentUser())) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});

export default router;