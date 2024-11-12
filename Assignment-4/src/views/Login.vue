<template>
  <div class="login-page">
    <!-- 背景图片 Background img -->
    <div class="background"></div>
    <div class="overlay"></div>

    <!-- 导航栏 Navbar -->
    <nav class="topbar">
      <div class="logoText">Northwind Airlines</div>
      <button class="home-button" @click="goToHomePage">Home Page</button>
    </nav>

    <!-- 欢迎文本 Welcome texts -->
    <div class="welcome-text">
      <h1>WELCOME BACK</h1>
      <p>Nice To See You Again</p>
    </div>

    <!-- 登录框 Login frame -->
    <div class="login-form">
      <t-space direction="vertical" class="login-box" size="large">
        <t-space direction="vertical" size="small" class="child-box">
          <label for="email">Account</label>
          <t-input
            class="input-box"
            size="large"
            v-model="form.email"
            placeholder="Email Address *"
            :status="emailError ? 'error' : ''"
            @blur="validateEmailOnBlur"
            :tips="emailError ? 'Please enter a valid email address' : ''"
          />
        </t-space>
        <t-space direction="vertical" size="small" class="child-box">
          <label for="password">Password</label>
          <t-input
            size="large"
            class="input-box"
            type="password"
            v-model="form.password"
            placeholder="Password *"
          />
        </t-space>
      </t-space>
      <t-button
        class="login-button"
        shape="round"
        size="large"
        type="submit"
        :loading="isLoading"
        :theme="buttonTheme"
        @click="onSubmit"
        >{{ isLoading ? 'Loading...' : buttonLabel }}</t-button
      >
      <div class="sign-up">
        <p class="sign-up text">Don't Have An Account?</p>
        <a href="/register">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'
import { adjustAspectRatio } from '@/utils/adjustAspectRatio'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      emailError: false, // 输入的邮箱string格式校验状态 Email string format verification status
      isLoading: false, // 登录按钮加载状态 Login Button loading animation display status
      buttonTheme: 'primary', // 登录按钮主题状态 Login button topic status
      buttonLabel: 'Login', // 按钮文本 Login button text

      rules: {
        email: [
          {
            required: true,
            message: 'Please enter a valid email address',
            type: 'email',
          },
        ],
        password: [{ required: true, message: 'Please enter your password' }],
      },
    }
  },

  methods: {
    async onSubmit() {
      this.isLoading = true

      setTimeout(async () => {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            {
              email: this.form.email,
              password: this.form.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          // 如果后端返回 200 状态码，表示登录成功  Information valid, show 'Success'
          if (response.status === 200) {
            this.buttonTheme = 'success'
            this.buttonLabel = 'Success'
            this.isLoading = false

            this.loginSuccess()
            // 成功后继续执行后续操作 Do other operations after login success
            setTimeout(() => {
              this.loginSuccess()
            }, 1000)
          }
        } catch (error) {
          console.error(error.response ? error.response.data : error.message)

          // 校验失败 Info invalid, show 'Failed'
          this.buttonTheme = 'danger'
          this.buttonLabel = 'Login Failed'
          this.isLoading = false

          // 监听用户的鼠标点击和键盘按下事件 Listen for input events
          window.addEventListener('click', this.resetButtonOnAction)
          window.addEventListener('keydown', this.resetButtonOnAction)

          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            // 使用后端返回的错误信息
            MessagePlugin.error(error.response.data.error)
          } else {
            // 如果没有返回特定的错误信息，显示通用错误
            MessagePlugin.error('Login failed, please try again')
            console.log('Login failed, please try again')
          }

          // 重置按钮状态
          setTimeout(() => {
            this.resetButton()
          }, 5000)
        } finally {
          this.isLoading = false
        }
      }, 1000)
    },

    goToHomePage() {
      console.log('go to Home Page from goToHomePage method')
      this.$router.push('/')
    },

    loginSuccess() {
      console.log('Login successful from loginSuccess method')
      this.$router.push('/')
    },

    // 当用户有鼠标点击或键盘按下动作时，恢复按钮状态 Reset button after input
    resetButtonOnAction() {
      this.resetButton()

      // 移除事件监听器，防止重复触发
      window.removeEventListener('click', this.resetButtonOnAction)
      window.removeEventListener('keydown', this.resetButtonOnAction)
    },

    // 重置按钮状态 Reset button
    resetButton() {
      this.buttonTheme = 'primary'
      this.buttonLabel = 'Login'
      this.isLoading = false
    },

    // 邮箱输入校验 Email validation
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(email)
    },

    // 当离开输入框时触发邮箱校验 Auto validation
    validateEmailOnBlur() {
      if (!this.validateEmail(this.form.email)) {
        this.emailError = true // 当校验失败时设置错误状态 true for failed
      } else {
        this.emailError = false // 校验通过时清除错误状态 false for success
      }
    },

    adjustAspectRatioHandler() {
      const pageContent = document.querySelector('.login-page')

      if (pageContent) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        const styles = adjustAspectRatio(windowWidth, windowHeight)

        pageContent.style.width = styles.width
        pageContent.style.height = styles.height
        pageContent.style.margin = styles.margin
      }
    },
  }, //methods End

  name: 'LoginPage',

  mounted() {
    document.addEventListener('DOMContentLoaded', this.adjustAspectRatioHandler)
    window.addEventListener('resize', this.adjustAspectRatioHandler)
  },
  beforeUnmount() {
    document.removeEventListener(
      'DOMContentLoaded',
      this.adjustAspectRatioHandler,
    )
    window.removeEventListener('resize', this.adjustAspectRatioHandler)
  },
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 背景图 Background img */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../img/bg.png') no-repeat center center;
  background-size: cover;
}

/* 透明遮罩层 Mask layer */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.28);
}

/* 导航栏 Navbar */
.topbar {
  position: absolute;
  top: 4.63%;
  width: 87%;
  height: 7.59%;
  max-height: 82px;
  display: flex;
  align-items: center;
  background: rgba(234, 240, 240, 0.4);
  backdrop-filter: blur(5.5px);
  border-radius: 1.5rem;
}

.logoText {
  position: absolute;
  width: 22.06%;
  height: 65.85%;
  left: 2.847%;

  top: 50%;
  transform: translateY(-50%);

  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.88vw;

  display: flex;
  text-align: center;
  align-items: center; /* 垂直居中 */

  letter-spacing: 0.06em;
  color: #283841;
  white-space: nowrap; /* 防止文本换行 */
}

.home-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: calc(82px * 0.146) calc(1686px * 0.019);
  gap: calc(1686px * 0.006);

  position: absolute;
  width: calc(1686px * 0.0985);
  height: 62.2%;

  right: 2.847%;
  top: 50%;
  transform: translateY(-50%);

  background: #3470c4;
  border-radius: calc(24 / 51 * 59px);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: calc(1686px * 0.011);
}

.home-button:hover {
  background-color: #285a9c;
}

/* 欢迎文本 Welcome texts */
.welcome-text {
  position: absolute;
  width: 31.25%;
  top: 34.7%;
  left: 16.56%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.welcome-text h1 {
  width: 100%;
  height: 70.92%;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 5.2vw;
  line-height: 5.2vw;
  letter-spacing: 0.06em;
  text-transform: capitalize;
  color: #ffffff;
  margin: 0;
}

.welcome-text p {
  height: 15.96%;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.56vw;
  letter-spacing: 0.06em;
  text-transform: capitalize;
  color: #ffffff;
  margin: 1rem 0 0 0; /* 添加一点上方的间距 */
  white-space: nowrap; /* 防止文本换行 */
}

/* 登录表单 Login form */
.login-form {
  position: absolute;
  top: 34.7%;
  left: 52.3%;

  width: 25%;
  height: 40.83%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  border-radius: 5.5%/7.256%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7.2%;
}

.login-box {
  width: 51.05%;
}

.child-box {
  width: 100%;
}

/* 标签文本 */
.child-box label {
  height: 22.7%;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 水平靠左 */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 550;
  font-size: 1.4rem;
  color: #344054;
}

/* 输入框 */
.input-box {
  width: 195.8988%;
  font-size: 1.2em;
  border-radius: 3.07%/18.2%;
  box-shadow: 0 0.2rem 0.4rem rgba(16, 24, 40, 0.05);
}

.login-button {
  width: 28.9%;
  height: 11.791%;
  max-width: 168px;
  max-height: 52px;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
}

.login-button:hover {
  background-color: #285a9c;
}

.sign-up {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置 p 和 a 之间的间距 */
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.06em;
  text-transform: capitalize;
  color: #000000;
}

.sign-up .text {
  margin: 0; /* 移除默认的段落边距 */
}

.sign-up a {
  color: #3470c4; /* 设置 Sign Up 链接的初始颜色 */
  text-decoration: none; /* 去除下划线 */
}

.sign-up a:hover {
  text-decoration: underline; /* 悬停时增加下划线 */
  color: #285a9c; /* 悬停时更改链接颜色 */
}
</style>
