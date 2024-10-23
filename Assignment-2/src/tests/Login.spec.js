import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/views/Login.vue'
import TDesign from 'tdesign-vue-next'

describe('LoginPage.vue', () => {
  /* Test Case 1: checking the login form rendering
  
  */
  it('Login form redering Check', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    expect(wrapper.find('.login-form').exists()).toBe(true)
  })

  /* Test Case 2-4: Simulate the input of an invalid mailbox and test the mailbox validation logic
  
  */
  it('Show error when email lacks suffix', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    const emailInput = wrapper.find('.t-input__inner')

    await emailInput.setValue('invalid-email')
    wrapper.vm.validateEmailOnBlur()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.emailError).toBe(true)
    expect(wrapper.findComponent({ name: 'TInput' }).props('status')).toBe(
      'error',
    )
  })

  it('Show error when email lacks domain suffix', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    const emailInput = wrapper.find('.t-input__inner')

    await emailInput.setValue('invalid@email')
    wrapper.vm.validateEmailOnBlur()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.emailError).toBe(true)
    expect(wrapper.findComponent({ name: 'TInput' }).props('status')).toBe(
      'error',
    )
  })

  it('Show error when email lacks domain prefix', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    const emailInput = wrapper.find('.t-input__inner')

    await emailInput.setValue('invalid@.com')
    wrapper.vm.validateEmailOnBlur()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.emailError).toBe(true)
    expect(wrapper.findComponent({ name: 'TInput' }).props('status')).toBe(
      'error',
    )
  })

  /* Test Case 5: Simulate the input of the correct account and password, test the status change of the button and the processing logic after success
  
  */
  it('Trigger login success on valid credentials', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })

    await wrapper.setData({
      form: {
        email: 'user@example.com',
        password: 'password',
      },
    })

    const loginSuccessSpy = vi.spyOn(wrapper.vm, 'loginSuccess')

    vi.useFakeTimers()

    await wrapper.findComponent({ name: 'TButton' }).trigger('click')

    expect(wrapper.vm.isLoading).toBe(true)

    vi.runAllTimers()

    expect(wrapper.vm.buttonTheme).toBe('success')
    expect(wrapper.vm.buttonLabel).toBe('Success')

    expect(loginSuccessSpy).toHaveBeenCalled()
    loginSuccessSpy.mockRestore()
  })

  /* Test Case 6: Simulate the incorrect account and password, test the status change of the button and the processing logic after the failure
  
  */
  it('Trigger login failure on invalid credentials', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })

    await wrapper.setData({
      form: {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      },
    })

    const resetButtonSpy = vi.spyOn(wrapper.vm, 'resetButton')

    vi.useFakeTimers()

    await wrapper.findComponent({ name: 'TButton' }).trigger('click')

    expect(wrapper.vm.isLoading).toBe(true)

    vi.advanceTimersByTime(1500)

    expect(wrapper.vm.buttonTheme).toBe('danger')
    expect(wrapper.vm.buttonLabel).toBe('Login Failed')
    expect(wrapper.vm.isLoading).toBe(false)

    vi.advanceTimersByTime(10000)

    expect(resetButtonSpy).toHaveBeenCalled()
    resetButtonSpy.mockRestore()
  })
})
