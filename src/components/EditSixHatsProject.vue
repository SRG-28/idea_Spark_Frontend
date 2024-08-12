<template>
    <div class="edit-six-hats-container" style="text-align: center;">
      <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"> 
      <h2 style="color:  #e12526; ">Edit Six Hats Project</h2>
      <form @submit.prevent="submitForm">
        <label for="title" style="font-weight: bold;">Title:</label><br>
        <input type="text" id="title" v-model="project.title" required><br><br>
        <label for="information" style="font-weight: bold;">Information:</label><br>
        <input type="text" id="information" v-model="project.information" required><br><br>
        <label for="emotions" style="font-weight: bold;">Emotions:</label><br>
        <input type="text" id="emotions" v-model="project.emotions" required><br><br>
        <label for="discernment" style="font-weight: bold;">Discernment:</label><br>
        <input type="text" id="discernment" v-model="project.discernment" required><br><br>
        <label for="optimisticResponse" style="font-weight: bold;">Optimistic Response:</label><br>
        <input type="text" id="optimisticResponse" v-model="project.optimisticResponse" required><br><br>
        <label for="creativity" style="font-weight: bold;">Creativity:</label><br>
        <input type="text" id="creativity" v-model="project.creativity" required><br><br>
        <label for="overview" style="font-weight: bold;">Overview:</label><br>
        <input type="text" id="overview" v-model="project.overview" required><br><br>
        <button type="submit" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Save</button>
      </form>
      <br>
      <button @click="goBack" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Cancel</button><br><br>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'EditSixHatsProject',
    data() {
      return {
        project: {}
      };
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      return { router, route };
    },
    async created() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/api/sixhats/${this.route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.project = response.data;
      } catch (error) {
        console.error('Failed to fetch project details', error);
      }
    },
    methods: {
      async submitForm() {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.put(`http://localhost:8000/api/sixhats/${this.route.params.id}`, this.project, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data);
          alert('Project updated successfully.');
          this.router.push(`/six-hats-projects/${this.route.params.id}`);
        } catch (error) {
          console.error('Failed to update project', error);
          alert('Failed to update the project.');
        }
      },
      goBack() {
        this.router.push(`/six-hats-projects/${this.route.params.id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-six-hats-container {
    max-width: 600px;
    margin: auto;
    padding: 1em;
    background-color: #f7f7f7;
    border-radius: 5px;
  }
  </style>
  