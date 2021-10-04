import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import First from '../views/First'
import Second from '../views/Second'
import Third from '../views/Third'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/first',
    name: 'First',
    component: First,
  },
  {
    path: '/second',
    name: 'Second',
    component: Second,
  },
  {
    path: '/third',
    name: 'Third',
    component: Third,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router