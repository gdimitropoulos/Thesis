import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import First from '../views/First'
import Second from '../views/Second'
import Third from '../views/Third'

const routes = [
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router