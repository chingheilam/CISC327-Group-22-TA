import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserPage from '../views/UserPage.vue'; 
import OrderHistory from '../views/OrderHistory.vue'; 
import FlightRescheduleUpgrade from '../views/FlightRescheduleUpgrade.vue'; 
import FlightsCancellation from '../views/FlightsCancellation.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: UserPage
    },
    {
      path: '/order-history',
      name: 'order-history',
      component: OrderHistory
    },
    {
      path: '/flight-rescheduleUpgrade',
      name: 'flight-rescheduleUpgrade',
      component: FlightRescheduleUpgrade
    },
    {
      path: '/flights-cancellation',
      name: 'flights-cancellation',
      component: FlightsCancellation
    }
  ]
});

export default router;