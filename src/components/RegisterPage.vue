<template>
  <div style="background-color: #f4f3f3; text-align: center;">
    <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"><br><br>
    <h1 style="color: #e12526;">Sign up</h1>
    <form @submit.prevent="register">
      <h3>Name</h3><input type="text" v-model="name" placeholder="Name" required><br>
      <h3>Last name</h3><input type="text" v-model="lastName" placeholder="Last Name" required><br>
      <h3>Username</h3><input type="text" v-model="username" placeholder="Username" required><br>
      <h3>Email</h3><input type="email" v-model="email" placeholder="Email" required><br>
      <h3>Phone</h3><input type="tel" v-model="phone" placeholder="Phone" required><br>
      <h3>Password</h3><input type="password" v-model="password" placeholder="Password" required><br>
      <p>Minimum: 8 characters</p>
      <h3>Confirm password</h3><input type="password" v-model="password_confirmation" placeholder="Confirm Password" required><br><br><br>
      <button type="submit" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Sign Up</button><br><br>
    </form>
    <p v-if="error">{{ error }}</p>
    <router-link to="/" style="color: gray;"><br>Do you want to return to login? click here</router-link>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: this.name,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        if (response.status === 201) {
          alert('User successfully registered');
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        console.error(error);
        this.error = 'Error during registration. Please try again.';
      }
    }
  }
};
</script>

  