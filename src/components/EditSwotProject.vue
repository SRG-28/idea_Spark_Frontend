<template>
    <div class="edit-swot-container" style="text-align: center;">
      <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"> 
      <h2 style="color:  #e12526; ">Edit SWOT Project</h2>
      <form @submit.prevent="submitForm">
        <label for="title" style="font-weight: bold;">Title:</label><br>
        <input type="text" id="title" v-model="project.title" required><br><br>
        <label for="strengths" style="font-weight: bold;">Strengths:</label><br>
        <input type="text" id="strengths" v-model="project.strengths" required><br><br>
        <label for="weaknesses" style="font-weight: bold;">Weaknesses:</label><br>
        <input type="text" id="weaknesses" v-model="project.weaknesses" required><br><br>
        <label for="opportunities" style="font-weight: bold;">Opportunities:</label><br>
        <input type="text" id="opportunities" v-model="project.opportunities" required><br><br>
        <label for="threats" style="font-weight: bold;">Threats:</label><br>
        <input type="text" id="threats" v-model="project.threats" required><br><br>
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
    name: 'EditSwotProject',
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
        const response = await axios.get(`http://localhost:8000/api/swots/${this.route.params.id}`, {
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
          const response = await axios.put(`http://localhost:8000/api/swots/${this.route.params.id}`, this.project, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data);
          alert('Project updated successfully.');
          this.router.push(`/swot-projects/${this.route.params.id}`);
        } catch (error) {
          console.error('Failed to update project', error);
          alert('Failed to update the project.');
        }
      },
      goBack() {
        this.router.push(`/swot-projects/${this.route.params.id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-swot-container {
    max-width: 600px;
    margin: auto;
    padding: 1em;
    background-color: #f7f7f7;
    border-radius: 5px;
  }
  </style>
  