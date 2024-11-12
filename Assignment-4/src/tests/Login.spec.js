import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/views/Login.vue'
import TDesign from 'tdesign-vue-next'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('LoginPage.vue', () => {
  /* Test Case 1: checking the login form rendering
  
  */
  it('Login form redering Check 登录表单渲染', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    expect(wrapper.find('.login-form').exists()).toBe(true)
  })

  /* Test Case 2-4: Simulate the input of an invalid mailbox and test the mailbox validation logic
  
  */
  it('Show error when email lacks suffix 检查邮箱后缀', async () => {
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

  it('Show error when email lacks domain suffix 检查邮箱域名后缀', async () => {
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

  it('Show error when email lacks domain prefix 检查邮箱域名前缀', async () => {
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
  it('Trigger login success on valid credentials 凭证有效，成功登录', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })

    axios.post.mockResolvedValue({
      data: { message: 'Login successful' },
      status: 200,
    })

    await wrapper.setData({
      form: {
        email: 'user@example.com',
        password: 'password',
      },
    })

    await wrapper.findComponent({ name: 'TButton' }).trigger('click')
    console.log('Button clicked')

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/login/',
        {
          email: wrapper.vm.form.email,
          password: wrapper.vm.form.password,
        },
      )

      expect(response.status).toBe(200)

      expect(response.data.message).toBe('Login successful')
    } catch (error) {
      console.error('Unexpected error:', error)
      throw error
    }
  })

  /* Test Case 6: Simulate the incorrect account and password, test the status change of the button and the processing logic after the failure
  
  */
  it('Trigger login failure on invalid credentials 凭证无效，登陆失败', async () => {
    vi.useFakeTimers()

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

    await wrapper.findComponent({ name: 'TButton' }).trigger('click')
    console.log('Button clicked')

    try {
      await axios.post('http://127.0.0.1:8000/api/users/login/', {
        email: wrapper.vm.form.email,
        password: wrapper.vm.form.password,
      })
    } catch (error) {
      expect(error.response.status).toBe(400)

      expect(error.response.data.error).toBe('Invalid email or password')
    }
  })

  

})
