<!-- src/components/Create.vue -->
<template>
  <div class="create-container" style="background-color: #f4f3f3; text-align: center;">
    <img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2 style="color: #e12526; text-align: center;">Create an Action Brainstorming</h2>
    <form @submit.prevent="createProject">
      <div style="font-weight: bold; ">
        <label for="title">Title: </label>
        <input type="text" v-model="project.title" required>
      </div>
      <div style="font-weight: bold;">
        <label for="stop"><br>Stop: </label>
        <input type="text" v-model="project.stop" required>
      </div>
      <div style="font-weight: bold;">
        <label for="minimize"><br>Minimize: </label>
        <input type="text" v-model="project.minimize" required>
      </div>
      <div style="font-weight: bold;">
        <label for="keepGoing"><br>Keep Going: </label>
        <input type="text" v-model="project.keepGoing" required>
      </div>
      <div style="font-weight: bold;">
        <label for="doMore"><br>Do More: </label>
        <input type="text" v-model="project.doMore" required>
      </div>
      <div style="font-weight: bold;">
        <label for="start"><br>Start: </label>
        <input type="text" v-model="project.start" required>
      </div>
      <br>
      <button type="submit" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Create Project</button>&nbsp; &nbsp;
      <button type="button" @click="goBack" style="background-color: lightgray; color: #e12526; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Create',
  data() {
    return {
      project: {
        title: '',
        stop: '',
        minimize: '',
        keepGoing: '',
        doMore: '',
        start: '',
        user_id: null
      }
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.project.user_id = user.id;
    } else {
      this.router.push('/');
    }
  },
  methods: {
    async createProject() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:8000/api/actionbrainstormings', this.project, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.router.push('/dashboard');
      } catch (error) {
        console.error('Failed to create project', error);
      }
    },
    goBack() {
      this.router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.create-container {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>
