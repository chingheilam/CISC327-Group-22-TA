import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '../views/IndexPage.vue'
import TDesign, { MessagePlugin } from 'tdesign-vue-next'
import router from '@/router'

describe('IndexPage.vue', () => {

  test('renders navigation menu correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });

    expect(wrapper.find('.menu-item.active').text()).toBe('Home');
    expect(wrapper.findAll('.menu-item')[1].text()).toBe('UserPage');
    expect(wrapper.findAll('.menu-item')[2].text()).toBe('Hotels & Villas');
    expect(wrapper.findAll('.menu-item')[3].text()).toBe('Flights');
  });


  test('renders static elements correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    expect(wrapper.find('.background').exists()).toBe(true);
    expect(wrapper.find('.overlay').exists()).toBe(true);
    expect(wrapper.find('.topbar').exists()).toBe(true);
    expect(wrapper.find('.logoText').text()).toBe('Northwind Airlines');
    expect(wrapper.find('.sign-in').text()).toBe('Sign in');
    expect(wrapper.find('.sign-up').text()).toBe('Sign Up');
  });


  test('calls goToRegister when clicking the "Sign In" button', async () => {
    const pushMock = vi.fn();
  
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [TDesign],
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    });
  
    await wrapper.find('.sign-in').trigger('click');
    expect(pushMock).toHaveBeenCalledWith('/register');
  });
  
  test('calls goToLogin when clicking the "Sign Up" button', async () => {
    const pushMock = vi.fn();
  
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [TDesign],
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    });
  
    await wrapper.find('.sign-up').trigger('click');
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  test('calls goToUserPage when clicking the "UserPage" link', async () => {
    const pushMock = vi.fn();
  
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [TDesign],
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    });
  
    await wrapper.findAll('.menu-item')[1].trigger('click');
    expect(pushMock).toHaveBeenCalledWith('/userPage');
  });
  
  
  test('renders search form elements correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    const formItems = wrapper.findAllComponents({ name: 't-form-item' });
    expect(formItems.length).toBe(3); // "From", "To", "Departure Date"
    expect(wrapper.find('.search-button').exists()).toBe(true);
  });  


  test('renders action buttons correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    const actionButtons = wrapper.findAll('.action-button');
    expect(actionButtons.length).toBe(4);

    expect(actionButtons[0].text()).toContain('Reschedule');
    expect(actionButtons[1].text()).toContain('Upgrade Class');
    expect(actionButtons[2].text()).toContain('Refund Ticket');
    expect(actionButtons[3].text()).toContain('Check-in');
  });
  

  test('renders centered menu items correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    const menuItems = wrapper.findAll('.centered-menu .menu-item');

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].text()).toBe('Home');
    expect(menuItems[1].text()).toBe('UserPage');
    expect(menuItems[2].text()).toBe('Hotels & Villas');
    expect(menuItems[3].text()).toBe('Flights');
  });
  

  test('renders search form with correct default values', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    expect(wrapper.vm.departure).toBe('');
    expect(wrapper.vm.arrival).toBe('');
    expect(wrapper.vm.date).toBe('');
  
    expect(wrapper.find('.t-button').text()).toContain('Input Origin');
    expect(wrapper.findAll('.t-button')[1].text()).toContain('Input Destination');
  });
  
  
  test('disables search button when fields are empty', async () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router, TDesign],
      },
    });
  
    const searchButton = wrapper.find('.search-button');

    await searchButton.trigger('click');

    expect(wrapper.vm.departure).toBe('');
    expect(wrapper.vm.arrival).toBe('');
    expect(wrapper.vm.date).toBe('');
  });
  
  

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
