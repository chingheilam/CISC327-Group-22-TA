<template>
  <div class="register-page">
    <!-- 背景图片和覆盖层 -->
    <div class="background"></div>
    <div class="overlay"></div>

    <!-- 导航栏 -->
    <nav class="topbar">
      <div class="logoText">Northwind Airline</div>
      <button class="home-button" @click="goToHomePage">Home Page</button>
    </nav>

    <!-- 注册表单 -->
    <div class="registerBox">
      <h2 class="announceText">Create Your Account</h2>
      <div class="infoBox">
        <t-form labelAlign="top" class="t-form">
          <t-form-item class="t-form-item" name="email">
            <template #label>
              <span class="custom-label">Email</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="Email Address *"
              v-model="form.email"
              :status="errors.email || emailError ? 'error' : ''"
              @blur="validateEmailOnBlur"
              :tips="emailError ? 'Please enter a valid email address' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="password">
            <template #label>
              <span class="custom-label">Password</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="Password *"
              type="password"
              v-model="form.password"
              :status="errors.password ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="FirstName">
            <template #label>
              <span class="custom-label">First Name</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="*"
              v-model="form.FirstName"
              :status="errors.FirstName ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="LastName">
            <template #label>
              <span class="custom-label">Last Name</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="*"
              v-model="form.LastName"
              :status="errors.LastName ? 'error' : ''"
            />
          </t-form-item>
        </t-form>

        <t-form labelAlign="top" class="t-form">
          <t-form-item class="t-form-item" name="Gender">
            <template #label>
              <span class="custom-label">Gender</span>
            </template>
            <t-select
              size="large"
              class="input-box"
              placeholder="*"
              v-model="form.Gender"
              :status="errors.gender ? 'error' : ''"
            >
              <t-option key="Male" label="Male" value="Male" />
              <t-option key="Female" label="Female" value="Female" />
              <t-option key="Other" label="Other" value="Other" />
            </t-select>
          </t-form-item>
          <t-form-item class="t-form-item" name="PhoneNumber">
            <template #label>
              <span class="custom-label">Phone Number</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="+1"
              v-model="form.PhoneNumber"
              :status="errors.PhoneNumber ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="Birth">
            <template #label>
              <span class="custom-label">Date of Birth</span>
            </template>
            <t-date-picker
              size="large"
              allowInput
              placeholder="dd / mm / yyyy"
              v-model="form.Birth"
              :status="errors.Birth ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="Address">
            <template #label>
              <span class="custom-label">Address</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="Mailing Address *"
              v-model="form.Address"
              :status="errors.Address ? 'error' : ''"
            />
          </t-form-item>
        </t-form>

        <t-form labelAlign="top" class="t-form">
          <t-form-item class="t-form-item" name="Unit">
            <template #label>
              <span class="custom-label">Unit / apt.</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="(optional)"
              v-model="form.Unit"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="City">
            <template #label>
              <span class="custom-label">Town / City</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="Town / City *"
              v-model="form.City"
              :status="errors.City ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="Country">
            <template #label>
              <span class="custom-label">Country</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="Country / Region *"
              v-model="form.Country"
              :status="errors.Country ? 'error' : ''"
            />
          </t-form-item>
          <t-form-item class="t-form-item" name="PostalCode">
            <template #label>
              <span class="custom-label">Postal Code</span>
            </template>
            <t-input
              size="large"
              class="input-box"
              placeholder="*"
              v-model="form.PostalCode"
              :status="errors.PostalCode ? 'error' : ''"
            />
          </t-form-item>
        </t-form>
      </div>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        PhoneNumber: '',
        Birth: '',
        Address: '',
        Unit: '',
        City: '',
        Country: '',
        PostalCode: '',
      },

      errors: {
        email: false,
        password: false,
        FirstName: false,
        LastName: false,
        Gender: false,
        PhoneNumber: false,
        Birth: false,
        Address: false,
        City: false,
        Country: false,
        PostalCode: false,
      },

      emailError: false, // 输入的邮箱string格式校验状态 Email string format verification status
      isLoading: false, // 登录按钮加载状态 Login Button loading animation display status
      buttonTheme: 'primary', // 登录按钮主题状态 Login button topic status
      buttonLabel: 'Sign Up', // 按钮文本 Login button text
    }
  },

  methods: {
    async onSubmit() {
      this.isLoading = true
      this.buttonLabel = 'Loading...'

      setTimeout(async () => {
        const requiredFields = [
          'email',
          'password',
          'FirstName',
          'LastName',
          'Gender',
          'PhoneNumber',
          'Birth',
          'Address',
          'City',
          'Country',
          'PostalCode',
        ]

        // 重置错误状态
        let hasError = false
        for (const field in this.errors) {
          this.errors[field] = false
        }

        // 检查必填字段是否为空
        for (const field of requiredFields) {
          if (!this.form[field]) {
            this.errors[field] = true
            hasError = true
          }
        }

        // 检查邮箱格式
        if (!this.validateEmail(this.form.email)) {
          this.errors.email = true
          hasError = true
        }

        if (hasError) {
          this.buttonTheme = 'danger'
          this.buttonLabel = 'Sign Up'
          this.isLoading = false

          window.addEventListener('click', this.resetButtonOnAction)
          window.addEventListener('keydown', this.resetButtonOnAction)

          setTimeout(() => {
            this.resetButton()
          }, 10000)

          console.log('请填写所有必填字段并确保邮箱格式正确')
        } else {
          console.log(this.form)

          const formData = transformFormData(this.form)

          try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/register/',
              formData,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )

            // 如果后端响应成功，更新按钮为成功状态
            if (response.status === 201) {
              this.buttonTheme = 'success'
              this.buttonLabel = 'Success'
              console.log('提交成功:', response.data)

              setTimeout(() => {
                this.goToHomePage()
              }, 1000)
            } else {
              throw new Error('注册失败')
            }
          } catch (error) {
            // 如果请求失败，显示失败状态
            this.buttonTheme = 'danger'
            this.buttonLabel = 'Failed'
            this.isLoading = false
            console.error(error.response ? error.response.data : error.message)

            window.addEventListener('click', this.resetButtonOnAction)
            window.addEventListener('keydown', this.resetButtonOnAction)

            setTimeout(() => {
              this.resetButton()
            }, 10000)
          } finally {
            // 请求完成后，重置加载状态
            this.isLoading = false
          }
        }
      }, 1000)
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

    goToHomePage() {
      this.$router.push('/')
    },
  },
}

function transformFormData(formData) {
  return {
    email: formData.email,
    password: formData.password,
    first_name: formData.FirstName,
    last_name: formData.LastName,
    gender: formData.Gender,
    phone_number: formData.PhoneNumber,
    birth: formData.Birth,
    address: formData.Address,
    unit: formData.Unit,
    city: formData.City,
    country: formData.Country,
    postal_code: formData.PostalCode,
  }
}

document.addEventListener('DOMContentLoaded', function () {
  adjustAspectRatio() // 页面加载时调用一次
  window.addEventListener('resize', adjustAspectRatio) // 监听窗口调整事件
})

function adjustAspectRatio() {
  const pageContent = document.querySelector('.register-page')

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

.register-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 背景图片和遮罩层 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../img/bg.png') no-repeat center center;
  background-size: cover;
}

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

/* 注册表单 */
.registerBox {
  position: absolute;
  width: 75%;
  max-width: 1440px;
  height: 70%;
  max-height: 755px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8%;
}

.announceText {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 3.7vh;
  line-height: 60px;
  text-align: center;
  white-space: nowrap;

  color: #000000;
  margin: 0; /* 去掉默认的外边距 */
}

.infoBox {
  width: auto;

  /* background: rgba(1, 204, 245, 0.3); */

  display: flex;
  gap: 64px;
  justify-content: center;
  align-items: center;
}

.t-form {
}

.t-form-item {
}

.custom-label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;

  color: #344054;
}

.input-box {
  max-width: 260px;
}

.childBox2 .input-box {
  width: 100%;
  font-size: 1.2em;
  border-radius: 3.07%/18.2%;
  box-shadow: 0 0.2rem 0.4rem rgba(16, 24, 40, 0.05);
}

.login-button {
  left: 0.7%;

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
</style>
