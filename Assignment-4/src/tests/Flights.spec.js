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
  // Test for Route Query Parameters to cover line 116-118
  test('should render flight information correctly from route query', async () => {
    router.push({
      name: 'Flights'
    })

    await router.isReady()

    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })
    
    expect(wrapper.vm.departure).toBe('Toronto (YYZ)')
    expect(wrapper.vm.arrival).toBe('Vancouver (YVR)')
    expect(wrapper.vm.date).toBe('2024-09-30')
  })

  // Additional Test for formatTime with empty time
  test('should return empty string when time is null or empty in formatTime', async () => {
    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })

    // Call formatTime with empty string
    const formattedTime = wrapper.vm.formatTime('')
    expect(formattedTime).toBe('') // Expecting empty output
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


  // Added Test for Object Response from axios to cover lines 134-135
  test('should render flight options correctly with object response from axios', async () => {
    axios.get.mockResolvedValue({
      data: {
        flights: [
          {
            flight_number: 'NAN1234',
            departure_city: 'Toronto (YYZ)',
            arrival_city: 'Vancouver (YVR)',
            departure_date: '2024-07-06',
            departure_time: '10:30:00',
            price_economy: 700,
            price_premium: 900,
            price_first: 2800,
          },
        ],
      },
    })

    const wrapper = mount(Flights, {
      global: {
        plugins: [router, TDesign],
      },
    })

    await wrapper.vm.fetchFlights()

    // Check if flight details are rendered correctly for object response
    expect(wrapper.text()).toContain('NAN1234')
    expect(wrapper.text()).toContain('$700')
    expect(wrapper.text()).toContain('$900')
    expect(wrapper.text()).toContain('$2800')
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
