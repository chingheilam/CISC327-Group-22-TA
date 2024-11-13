import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/views/Login.vue'
import TDesign from 'tdesign-vue-next'
import axios from 'axios'
import flushPromises from 'flush-promises'

// Mock axios
vi.mock('axios')

describe('LoginPage.vue', () => {
  /* 
    Test Case 1: checking the login form rendering
  */
  it('Login form redering Check 登录表单渲染', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })
    expect(wrapper.find('.login-form').exists()).toBe(true)

    // 验证背景和覆盖层的渲染
    expect(wrapper.find('.background').exists()).toBe(true)
    expect(wrapper.find('.overlay').exists()).toBe(true)

    // 导航栏验证
    expect(wrapper.find('.topbar').exists()).toBe(true)
    expect(wrapper.find('.logoText').text()).toBe('Northwind Airlines')
    expect(wrapper.find('.home-button').text()).toBe('Home Page')

    // 欢迎文本验证
    expect(wrapper.find('.welcome-text h1').text()).toBe('WELCOME BACK')
    expect(wrapper.find('.welcome-text p').text()).toBe('Nice To See You Again')
  })

  /* 
    Test Case 2-4: Simulate the input of an invalid mailbox and test the mailbox validation logic
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

  /* 
    Test Case 5: Simulate the input of the correct account and password, test the status change of the button and the processing logic after success
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

    // 模拟有效的邮箱输入
    const emailInput = wrapper.find('.t-input__inner')
    await emailInput.setValue('user@example.com')

    // 触发邮箱验证逻辑
    wrapper.vm.validateEmailOnBlur()
    await wrapper.vm.$nextTick()

    // 校验通过时，emailError 应该为 false
    expect(wrapper.vm.emailError).toBe(false)
    expect(wrapper.findComponent({ name: 'TInput' }).props('status')).not.toBe(
      'error',
    )
  })

  /* 
    Test Case 6: Simulate the incorrect account and password, test the status change of the button and the processing logic after the failure
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

  /* 
    Test Case 7: Automatically changes page size to maintain aspect ratio
  */
  it('Adjust the page size based on given ratio', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
      attachTo: document.body,
    })

    // 模拟 window 的大小
    window.innerWidth = 1920
    window.innerHeight = 1080

    // 手动触发 window 的 resize 事件
    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()

    const pageContent = wrapper.find('.login-page')
    // 验证内容宽度和高度是否根据目标调整
    expect(pageContent.element.style.width).toBe('1920px')
    expect(pageContent.element.style.height).toBe('1080px')

    // 模拟另一个尺寸
    window.innerWidth = 800
    window.innerHeight = 600

    // 再次触发 resize 事件
    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()

    expect(pageContent.element.style.width).toBe('800px')
    expect(pageContent.element.style.height).toBe('450px')
  })

  /* 
    Test Case 8: Render background and overlay elements
  */
  it('Render background and overlay elements', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
      attachTo: document.body,
      data() {
        return {
          showStaticContent: true,
        }
      },
    })

    expect(wrapper.find('.topbar').exists()).toBe(true)
    expect(wrapper.find('.welcome-text').exists()).toBe(true)
  })

  /* 
    Test Case 9: Remove event listeners on beforeUnmount
  */
  it('Remove event listeners on beforeUnmount', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
    const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const windowRemoveEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    // Mount the component
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
      attachTo: document.body,
    })

    // Verify that event listeners are added on mounted
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      wrapper.vm.adjustAspectRatioHandler,
    )
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      wrapper.vm.adjustAspectRatioHandler,
    )

    // Unmount the component
    wrapper.unmount()

    // Verify that event listeners are removed on beforeUnmount
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      wrapper.vm.adjustAspectRatioHandler,
    )
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      wrapper.vm.adjustAspectRatioHandler,
    )

    // Restore the original implementations
    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
    windowAddEventListenerSpy.mockRestore()
    windowRemoveEventListenerSpy.mockRestore()
  })

  /* 
    Test Case 10: Navigate to home page on calling goToHomePage
  */
  it('Navigate to home page on calling goToHomePage', async () => {
    const $router = {
      push: vi.fn(), // Mock router push
    }

    const wrapper = mount(LoginPage, {
      global: {
        mocks: {
          $router,
        },
        plugins: [TDesign],
      },
    })

    // 调用 goToHomePage 方法
    // wrapper.vm.goToHomePage()

    const homeButton = wrapper.find('.home-button')
    await homeButton.trigger('click')

    // 断言 $router.push 被调用，并导航到首页
    expect($router.push).toHaveBeenCalledWith('/')
  })

  /* 
    Test Case 11: Navigate to home page and log success message on loginSuccess
  */
  it('Navigate to home page and log success message on loginSuccess', async () => {
    const $router = {
      push: vi.fn(), // Mock router push
    }

    // Spy console log
    const consoleLogSpy = vi.spyOn(console, 'log')

    const wrapper = mount(LoginPage, {
      global: {
        mocks: {
          $router,
        },
        plugins: [TDesign],
      },
    })

    // 调用 loginSuccess 方法
    wrapper.vm.loginSuccess()

    // 断言 $router.push 被调用
    expect($router.push).toHaveBeenCalledWith('/')
    // 断言日志输出 "Login successful"
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Login successful from loginSuccess method',
    )

    // 恢复原始的 console.log
    consoleLogSpy.mockRestore()
  })

  /* 
    Test Case 12: Reset button and remove event listeners on resetButtonOnAction
  */
  it('Reset button and remove event listeners on resetButtonOnAction', async () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })

    // 调用 resetButtonOnAction 方法
    wrapper.vm.resetButtonOnAction()

    // 断言 resetButton 方法被调用
    expect(wrapper.vm.buttonTheme).toBe('primary')
    expect(wrapper.vm.buttonLabel).toBe('Login')
    expect(wrapper.vm.isLoading).toBe(false)

    // 断言 window.removeEventListener 被正确调用
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      wrapper.vm.resetButtonOnAction,
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      wrapper.vm.resetButtonOnAction,
    )

    // 恢复原始的 removeEventListener
    removeEventListenerSpy.mockRestore()
  })

  /* 
    Test Case 13: Reset button properties on resetButton
  */
  it('Reset button properties on resetButton', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [TDesign],
      },
    })

    // 修改按钮状态以确保 resetButton 的效果
    wrapper.setData({
      buttonTheme: 'secondary',
      buttonLabel: 'Logging in...',
      isLoading: true,
    })

    // 调用 resetButton 方法
    wrapper.vm.resetButton()

    // 断言按钮状态已被重置
    expect(wrapper.vm.buttonTheme).toBe('primary')
    expect(wrapper.vm.buttonLabel).toBe('Login')
    expect(wrapper.vm.isLoading).toBe(false)
  })

  /* 
    Test Case 14: Handle successful form submission
  */
  it('Handle successful form submission 成功场景：测试表单提交成功时的行为', async () => {
    // Mock successful response
    axios.post.mockResolvedValue({
      status: 200,
      data: { message: 'Login successful' },
    })

    // Mock router
    const $router = {
      push: vi.fn(), // Mock router push
    }

    const wrapper = mount(LoginPage, {
      global: {
        mocks: {
          $router,
        },
        plugins: [TDesign],
      },
    })

    // Set form data to valid values
    await wrapper.setData({
      form: {
        email: 'user@example.com',
        password: 'password123',
      },
    })

    const loginButton = wrapper.find('.login-button')
    expect(loginButton.exists()).toBe(true) // 确认按钮存在
    await loginButton.trigger('click')

    wrapper.vm.loginSuccess()

    // 确保所有异步请求完成
    await flushPromises()
    await wrapper.vm.$nextTick()

    console.log('Router push called times:', $router.push.mock.calls.length)

    // 检查路由跳转是否发生
    expect($router.push).toHaveBeenCalledTimes(1)
    expect($router.push).toHaveBeenCalledWith('/')
  })
})
