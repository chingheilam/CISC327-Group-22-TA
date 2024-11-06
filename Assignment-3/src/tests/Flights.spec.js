import { describe, test, expect } from 'vitest' // Import Vitest functions
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import Flights from '../views/Flights.vue'
import TDesign from 'tdesign-vue-next'
import axios from 'axios'

vi.mock('axios')

const routes = [{ path: '/flights', name: 'Flights', component: Flights }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('Flights.vue', () => {
  test('should render flight information correctly from route query', async () => {
    router.push({
      name: 'Flights',
      query: {
        departure: 'Toronto (YYZ)',
        arrival: 'Vancouver (YVR)',
        date: '2024-07-05',
      },
    })

    await router.isReady()

    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })

    // Check if flight information is displayed correctly
    expect(wrapper.text()).toContain('Toronto (YYZ)')
    expect(wrapper.text()).toContain('Vancouver (YVR)')
    expect(wrapper.text()).toContain('2024-07-05')
  })

  test('should render flight options correctly with mocked axios response', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          flight_number: 'NAN5355',
          departure_city: 'Toronto (YYZ)',
          arrival_city: 'Vancouver (YVR)',
          departure_date: '2024-07-05',
          departure_time: '22:50:00',
          price_economy: 681,
          price_premium: 884,
          price_first: 2736,
        },
      ],
    })

    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })

    await wrapper.vm.fetchFlights()

    // Check if flight details are rendered correctly
    expect(wrapper.text()).toContain('NAN5355')
    expect(wrapper.text()).toContain('$681')
    expect(wrapper.text()).toContain('Direct')
  })

  test('should render error message for invalid data', async () => {
    axios.get.mockRejectedValue({
      response: {
        status: 400,
        data: { error: 'Invalid request' },
      },
    })

    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })

    try {
      await wrapper.vm.fetchFlights()
    } catch (error) {
      // Check if error message is displayed
      expect(error.response.status).toBe(400)
      expect(error.response.data.error).toBe('Invalid request')
    }
  })
})
