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
      <div class="form">
        <div class="form-group">
          <label for="email">Account</label>
          <input type="email" id="email" placeholder="Email Address *" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password *" />
        </div>
      </div>
      <button type="submit" class="login-button">Login</button>
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
      rules: {
        email: [
          { required: true, message: 'Please enter your email', type: 'error' },
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password',
            type: 'error',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('Form submitted:', this.form)
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

  width: 30.26%;
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
.form {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  width: 47.5%;
  height: 42.18%;

  padding: 0;
  gap: 5.37%;
}

/* 表单字段 */
.form-group {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  height: 47.3%;
  width: 100%;

  padding: 0%;
  gap: 9.09%;
  box-sizing: border-box;
}

/* 标签文本 */
.form-group label {
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
.form-group input {
  width: 100%;
  height: 50%;
  font-size: 1.2em;
  border-radius: 3.07%/18.2%;
  border: 1px solid #d0d5dd;
  box-shadow: 0 0.1rem 0.2rem rgba(16, 24, 40, 0.05);
  padding: 4%;
}

.login-button {
  width: 28.9%;
  max-width: 168px;
  padding: 0.75rem;
  background-color: #3470c4;
  border: none;
  border-radius: 26px;
  cursor: pointer;

  color: #eaf0f0;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600; /* 600 的字体粗细 */
  font-size: 1.4rem;
  letter-spacing: 0.1em; /* 字符间距 */

  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  text-align: center; /* 文本居中对齐 */
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
