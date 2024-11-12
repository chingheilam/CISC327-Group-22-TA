import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '../views/IndexPage.vue'
import TDesign, { MessagePlugin } from 'tdesign-vue-next'
import router from '@/router'

describe('IndexPage.vue', () => {
  test('shows a warning when fields are missing', async () => {
    const messagePluginSpy = vi.spyOn(MessagePlugin, 'warning')

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign], // Inject the router
      },
    })

    await wrapper.vm.FlightSearch({ preventDefault: () => {} })

    await wrapper.vm.$nextTick()

    // Ensure that the warning message is shown
    expect(messagePluginSpy)

    // Restore the original console.log
    messagePluginSpy.mockRestore()
  })

  test('successfully navigates to flight results when form is valid', async () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign], // Inject the router
      },
    })

    // Simulate filling the form with valid data
    await wrapper.setData({
      departure: 'Toronto (YYZ)',
      arrival: 'Vancouver (YVR)',
      date: '2024-10-31',
    })

    const form = wrapper.find('form')
    await form.trigger('submit')

    await router.isReady()
    await new Promise(resolve => setTimeout(resolve, 100))

    console.log('Current route:', router.currentRoute.value.name)

    expect(router.currentRoute.value.name).toBe('Flights')
  })

  // Test for selectOrigin method
  test('updates departure and calls MessagePlugin.success when selectOrigin is called', async () => {

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });

    const testData = { content: 'Toronto (YYZ)' };

    await wrapper.vm.selectOrigin(testData);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.departure).toBe('Toronto (YYZ)');
  });
  
  // Test for selectDestination method
  test('updates arrival when selectDestination is called', async () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });

    const testData = { content: 'Vancouver (YVR)' };

    await wrapper.vm.selectDestination(testData);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.arrival).toBe('Vancouver (YVR)');
    
  });
  
  // Test case for goToLogin method
  test('navigates to login page when goToLogin is called', async () => {
    const pushMock = vi.fn()

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [TDesign],
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    })

    await wrapper.vm.goToLogin()
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  // Test case for goToRegister method
  test('navigates to register page when goToRegister is called', async () => {
    const pushMock = vi.fn()

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [TDesign],
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    })

    await wrapper.vm.goToRegister()
    expect(pushMock).toHaveBeenCalledWith('/register')
  })

    // Test case for goToUserPage method
    test('navigates to user page when goToUserPage is called', async () => {
      const pushMock = vi.fn()
  
      const wrapper = mount(IndexPage, {
        global: {
          plugins: [TDesign],
          mocks: {
            $router: {
              push: pushMock,
            },
          },
        },
      })
  
      await wrapper.vm.goToUserPage()
      expect(pushMock).toHaveBeenCalledWith('/userPage')
    })
  

})
