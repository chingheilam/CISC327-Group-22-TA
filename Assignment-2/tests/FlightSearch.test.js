import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FlightSearch from '../src/views/FlightSearch.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

// Import the necessary components and mock the router
import FlightResults from '../src/views/FlightResults.vue';

const routes = [
  { path: '/', name: 'FlightSearch', component: FlightSearch },
  { path: '/flight-results', name: 'FlightResults', component: FlightResults },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe('FlightSearch.vue', () => {
  test('shows a warning when fields are missing', async () => {
    const wrapper = mount(FlightSearch, {
      global: {
        plugins: [router], // Inject the router
      },
    });

    const searchButton = wrapper.find('.search-button');
    await searchButton.trigger('click');

    // Simulate waiting for the message to appear (sometimes asynchronous)
    await wrapper.vm.$nextTick();

    // Ensure that the warning message is shown
    expect(wrapper.text()).toContain('Please fill in all fields before searching');
  });

  test('successfully navigates to flight results when form is valid', async () => {
    const wrapper = mount(FlightSearch, {
      global: {
        plugins: [router], // Inject the router
      },
    });

    // Simulate filling the form with valid data
    await wrapper.setData({
      departure: 'Toronto (YYZ)',
      arrival: 'Vancouver (YVR)',
      date: '2024-10-01',
    });

    const searchButton = wrapper.find('.search-button');
    await searchButton.trigger('click');

    // Wait for the navigation to complete
    await router.isReady();

    // Check if the navigation went to the 'FlightResults' route
    expect(router.currentRoute.value.name).toBe('FlightResults');
  });
});
