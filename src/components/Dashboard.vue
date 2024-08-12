<template>
  <div class="dashboard-container">
    <img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"><br><br>
    <!-- Menu -->
    <h3 style="background-color: lightgray; text-align: center; color: #e12526;"><br>
      <router-link to="/Find" style="color: #e12526;">Find projects</router-link> &nbsp;&nbsp; | &nbsp;&nbsp;
      <router-link to="/Swot" style="color: #e12526;">New Swot</router-link> &nbsp;&nbsp;  | &nbsp;&nbsp;
      <router-link to="/Create" style="color: #e12526;">New Brainstorming</router-link> &nbsp;&nbsp;  | &nbsp;&nbsp;
      <router-link to="/SixHats" style="color: #e12526;">New 6 hats</router-link><br><br>
    </h3>

    <h2 style="color: #e12526;">Welcome to IdeaSpark</h2>
    <h3 style="font-weight: bold; text-align: center; ">Account information</h3>
    <div v-if="user" style="text-align: center;">
      <p>Name: {{ user.name }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
    </div>
    <button @click="deleteAccount" style="background-color:  #e12526; color:  #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Delete account</button>&nbsp; &nbsp; 
    <button @click="logout" style="background-color: lightgray; color: #e12526; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const user = JSON.parse(localStorage.getItem('user')); 
      if (!user) {
        this.router.push('/');
        return;
      }
      this.user = user;
    },
    async logout() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Failed to logout', error);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.push('/');
    },
    async deleteAccount() {
      const token = localStorage.getItem('token');
      const userId = this.user.id;
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Failed to delete account', error);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.push('/');
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>
