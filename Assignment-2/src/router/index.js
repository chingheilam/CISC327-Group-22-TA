import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserPage from '../views/UserPage.vue'
import OrderHistory from '../views/OrderHistory.vue'
import FlightRescheduleUpgrade from '../views/FlightRescheduleUpgrade.vue'
import FlightsCancellation from '../views/FlightsCancellation.vue'

// import HomePage from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import RegistrationPage from '../views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegistrationPage },
  {
    path: '/userPage',
    name: 'userPage',
    component: UserPage,
  },
  {
    path: '/order-history',
    name: 'order-history',
    component: OrderHistory,
  },
  {
    path: '/flight-rescheduleUpgrade',
    name: 'flight-rescheduleUpgrade',
    component: FlightRescheduleUpgrade,
  },
  {
    path: '/flights-cancellation',
    name: 'flights-cancellation',
    component: FlightsCancellation,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

export default router
