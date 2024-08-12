<!-- src/components/SixHats.vue -->
<template>
  <div class="create-container" style="background-color: #f4f3f3; text-align: center;">
    <img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2 style="color: #e12526; text-align: center;">Create a Six Hats</h2>
    <form @submit.prevent="createProject">
      <div style="font-weight: bold;">
        <label for="title">Title: </label>
        <input type="text" v-model="project.title" required>
      </div>
      <div style="font-weight: bold;">
        <label for="information"><br>Information: </label>
        <input type="text" v-model="project.information" required>
      </div>
      <div style="font-weight: bold;">
        <label for="emotions"><br>Emotions: </label>
        <input type="text" v-model="project.emotions" required>
      </div>
      <div style="font-weight: bold;">
        <label for="discernment"><br>Discernment: </label>
        <input type="text" v-model="project.discernment" required>
      </div>
      <div style="font-weight: bold;">
        <label for="optimisticResponse"><br>Optimistic Response: </label>
        <input type="text" v-model="project.optimisticResponse" required>
      </div>
      <div style="font-weight: bold;">
        <label for="creativity"><br>Creativity: </label>
        <input type="text" v-model="project.creativity" required>
      </div>
      <div style="font-weight: bold;">
        <label for="overview"><br>Overview: </label>
        <input type="text" v-model="project.overview" required>
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
        information: '',
        emotions: '',
        discernment: '',
        optimisticResponse: '',
        creativity: '',
        overview: '',
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
        await axios.post('http://localhost:8000/api/sixhats', this.project, {
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
