<template>
  <div>
    <h1>注册</h1>
    <form @submit.prevent="submitRegister">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" required />
      <label for="confirmPassword">确认密码:</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
      />
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegistrationPage',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    submitRegister() {
      if (this.password !== this.confirmPassword) {
        alert('密码不匹配')
      } else {
        console.log('注册信息:', this.email, this.password)
        // 待添加实际的注册逻辑
      }
    },
  },
}
</script>
