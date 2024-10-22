import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserPage from '../views/UserPage.vue'; // Import the user page view
import OrderHistory from '../components/OrderHistory.vue'; // Import component
import FlightReschedule from '../components/FlightRescheduleUpgrade.vue'; // Import component
import FlightsCancellation from '../components/FlightsCancellation.vue'; // Import component

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
      component: UserPage,
      // Nested routes for the sidebar items
      children: [
        {
          path: 'order-history',
          name: 'order-history',
          component: OrderHistory
        },
        {
          path: 'flight-rescheduleUpgrade',
          name: 'flight-rescheduleUpgrade',
          component: FlightReschedule
        },
        {
          path: 'flights-cancellation',
          name: 'flights-cancellation',
          component: FlightsCancellation
        }
      ]
    }
  ]
});

export default router;
