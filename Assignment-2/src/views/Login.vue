<template>
  <div class="login-page">
    <!-- 背景图片 -->
    <div class="background"></div>
    <div class="overlay"></div>

    <!-- 导航栏 -->
    <nav class="topbar">
      <div class="logoText">Northwind Airline</div>
      <button class="home-button">Home Page</button>
    </nav>

    <!-- 欢迎文本 -->
    <div class="welcome-text">
      <h1>WELCOME BACK</h1>
      <p>Nice To See You Again</p>
    </div>

    <!-- 登录框 -->
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
        <a href="#">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      emailError: false, // 输入的邮箱string格式校验状态
      isLoading: false, // 登录按钮加载状态
      buttonTheme: 'primary', // 登录按钮主题状态
      buttonLabel: 'Login', // 按钮文本

      validEmail: 'user@example.com', // 模拟正确的账号
      validPassword: 'password', // 模拟正确的密码

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
    onSubmit() {
      this.isLoading = true // 开始加载状态

      // 模拟后端延迟校验，等待1秒
      setTimeout(() => {
        if (
          this.form.email === this.validEmail &&
          this.form.password === this.validPassword
        ) {
          // 校验成功，按钮变为 success 状态
          this.buttonTheme = 'success'
          this.buttonLabel = 'Success'

          // 成功后继续执行后续操作
          setTimeout(() => {
            this.isLoading = false
            this.loginSuccess()
          }, 1000)
        } else {
          // 校验失败，按钮变为 danger 状态，显示错误
          this.buttonTheme = 'danger'
          this.buttonLabel = 'Login Failed'
          this.isLoading = false // 停止加载状态、

          // 监听用户的鼠标点击和键盘按下事件
          window.addEventListener('click', this.resetButtonOnAction)
          window.addEventListener('keydown', this.resetButtonOnAction)

          // 在失败后的10秒内按钮保持失败状态
          setTimeout(() => {
            // 等待10秒后如果用户没有任何动作则恢复按钮状态
            this.resetButton()
          }, 10000)
        }
      }, 1000)
    },

    // 登录成功操作
    loginSuccess() {
      console.log('登录成功，执行后续操作')
      // window.location.href = '/home' // 预设成功后跳转到首页
    },

    // 当用户有鼠标点击或键盘按下动作时，恢复按钮状态
    resetButtonOnAction() {
      this.resetButton()

      // 移除事件监听器，防止重复触发
      window.removeEventListener('click', this.resetButtonOnAction)
      window.removeEventListener('keydown', this.resetButtonOnAction)
    },

    // 重置按钮状态
    resetButton() {
      this.buttonTheme = 'primary'
      this.buttonLabel = 'Login'
      this.isLoading = false
    },

    // 邮箱输入校验
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(email)
    },

    // 当离开输入框时触发邮箱校验
    validateEmailOnBlur() {
      if (!this.validateEmail(this.form.email)) {
        this.emailError = true // 当校验失败时设置错误状态
      } else {
        this.emailError = false // 校验通过时清除错误状态
      }
    },
  },

  name: 'LoginPage',
}

document.addEventListener('DOMContentLoaded', function () {
  adjustAspectRatio() // 页面加载时调用一次
  window.addEventListener('resize', adjustAspectRatio) // 监听窗口调整事件
})

function adjustAspectRatio() {
  const pageContent = document.querySelector('.login-page')

  if (pageContent) {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const aspectRatio = 16 / 9 // 目标比例 16:9
    const windowRatio = windowWidth / windowHeight

    if (windowRatio > aspectRatio) {
      // 窗口过扁，需要左右留白
      const contentHeight = windowHeight
      const contentWidth = contentHeight * aspectRatio // 根据高度调整宽度
      pageContent.style.width = `${contentWidth}px`
      pageContent.style.height = `${contentHeight}px`
      pageContent.style.margin = `0 auto` // 水平居中
    } else {
      // 窗口过窄，需要上下留白
      const contentWidth = windowWidth
      const contentHeight = contentWidth / aspectRatio // 根据宽度调整高度
      pageContent.style.width = `${contentWidth}px`
      pageContent.style.height = `${contentHeight}px`
      pageContent.style.margin = `auto 0` // 垂直居中
    }
  } else {
    console.error('Page content not found')
  }
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

/* 背景图 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../img/bg.png') no-repeat center center;
  background-size: cover;
}

/* 透明遮罩层 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.28);
}

/* 导航栏 */
.topbar {
  position: absolute;
  top: 4.63%;
  width: 87%;
  height: 7.59%;
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
  font-size: 1.88vw; /* 36px 换算为 vw */

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

  padding: calc(82px * 0.146) calc(1686px * 0.019); /* 动态 padding，基于父元素的比例 */
  gap: calc(1686px * 0.006); /* 动态 gap，基于父元素宽度 */

  position: absolute;
  width: calc(1686px * 0.0985); /* 166px 换算为父元素宽度的比例 */
  height: 62.2%; /* 48px 换算为父元素高度的比例 */

  right: 2.847%;
  top: 50%;
  transform: translateY(-50%);

  background: #3470c4;
  border-radius: calc(24 / 51 * 59px);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: calc(1686px * 0.011); /* 动态字体大小，基于父元素宽度 */
}

.home-button:hover {
  background-color: #285a9c; /* 鼠标悬停时的背景颜色变化 */
}

/* 欢迎文本 */
.welcome-text {
  position: absolute;
  width: 31.25%;
  top: 34.7%; /* 根据视口高度定位 */
  left: 16.56%; /* 根据视口宽度定位 */
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
  line-height: 5.2vw; /* 行高与字体大小一致 */
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

/* 登录表单 */
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
  gap: 7.2%; /* 间距占父元素高度的3% */
}

/* 表单 */
.login-box {
  width: 51.05%;
}

/* 表单字段 */
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

.input-box ::deep .t-input__inner {
  background-color: #d0d5dd;
  border-radius: 10px; /* 设置圆角 */
}

.login-button {
  width: 28.9%;
  height: 11.791%;
  max-width: 168px;
  max-height: 52px;
  background-color: #3470c4;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
}

.login-button:hover {
  background-color: #285a9c;
}

.sign-up {
  display: flex; /* 使用 flexbox 使子元素水平排列 */
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
