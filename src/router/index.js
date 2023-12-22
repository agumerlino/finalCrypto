import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TradeView from '../views/TradeView.vue'
import MovementsHistoryView from '../views/MovementsHistoryView.vue'
import CurrentStatusView from '@/views/CurrentStatusView.vue'
import ProfitView from "@/views/ProfitView.vue";


const routes = [
  {
    path: "/profit",
    name: "Profit",
    component: ProfitView,
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/trade',
    name: 'Trade',
    component: TradeView,
  },
  {
    path: '/historial',
    name: 'MovementsHistory',
    component: MovementsHistoryView,
  },
  {
    path: '/estadoActual',
    name: 'CurrentStatus',
    component: CurrentStatusView,

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
