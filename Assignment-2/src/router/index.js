import { createRouter, createWebHistory } from 'vue-router';
import FlightSearch from '../views/FlightSearch.vue';
import FlightResults from '../views/FlightResults.vue';

const routes = [
    {
        path: '/',
        name: 'FlightSearch',
        component: FlightSearch
    },
    {
        path: '/flight-results',
        name: 'FlightResults',
        component: FlightResults
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
