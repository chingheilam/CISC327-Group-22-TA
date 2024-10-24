import { describe, test, expect } from 'vitest' // Import Vitest functions
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import FlightResults from '../src/views/Flights.vue'

const routes = [
  { path: '/flight-results', name: 'FlightResults', component: FlightResults },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('FlightResults.vue', () => {
  test('should render flight information correctly from route query', async () => {
    router.push({
      name: 'FlightResults',
      query: {
        departure: 'Toronto (YYZ)',
        arrival: 'Vancouver (YVR)',
        date: '2024-10-01',
      },
    })

    await router.isReady()

    const wrapper = mount(FlightResults, {
      global: {
        plugins: [router],
      },
    })

    // Check if flight information is displayed correctly
    expect(wrapper.text()).toContain('Toronto (YYZ)')
    expect(wrapper.text()).toContain('Vancouver (YVR)')
    expect(wrapper.text()).toContain('2024-10-01')
  })

  test('should render flight options correctly', async () => {
    const wrapper = mount(FlightResults, {
      global: {
        plugins: [router],
      },
    })

    // Check if flight details are rendered
    expect(wrapper.text()).toContain('NAN9527')
    expect(wrapper.text()).toContain('$828')
    expect(wrapper.text()).toContain('Direct')
  })
})
