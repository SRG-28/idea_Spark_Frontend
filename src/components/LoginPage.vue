<template>
  <div class="login-container" style="background-color: #f4f3f3;">
    <img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2 style="color:  #e12526; text-align: center;">Login</h2>
    <form @submit.prevent="login">
      <div style="font-weight: bold;">
        <label for="email"><br> Email: </label>
        <input type="email" v-model="email" required>
      </div>
      <div style="font-weight: bold;">
        <label for="password"> <br> Password: </label>
        <input type="password" v-model="password" required>
      </div>
      <br><button type="submit" style="background-color:  #e12526; color:  #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <router-link to="/register" style="color: gray;"><br>Don't have an account? Sign up here</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));  
        this.router.push('/dashboard');
      } catch (error) {
        this.error = 'Login failed. Please check your credentials.';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>

  