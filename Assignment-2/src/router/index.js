import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserPage from '../views/UserPage.vue'; 
import OrderHistory from '../components/OrderHistory.vue'; 
import FlightRescheduleUpgrade from '../components/FlightRescheduleUpgrade.vue'; 
import FlightsCancellation from '../components/FlightsCancellation.vue'; 

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