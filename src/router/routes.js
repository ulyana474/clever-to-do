import Calendar from '@/views/calendar/Calendar.vue'
import { Layout, Login, Register } from '@/views/account'
import { Home } from '@/views'

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/account',
    component: Layout,
    children: [
      { path: '', redirect: 'login' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
