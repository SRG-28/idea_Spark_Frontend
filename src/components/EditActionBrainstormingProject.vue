<template>
    <div class="edit-action-brainstorming-container" style="text-align: center;">
      <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;"> 
      <h2 style="color:  #e12526; ">Edit Action Brainstorming Project</h2>
      <form @submit.prevent="editActionBrainstorming">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="project.title" required>
        </div>
        <div>
          <label for="stop">Stop:</label>
          <input type="text" id="stop" v-model="project.stop" required>
        </div>
        <div>
          <label for="minimize">Minimize:</label>
          <input type="text" id="minimize" v-model="project.minimize" required>
        </div>
        <div>
          <label for="keepGoing">Keep Going:</label>
          <input type="text" id="keepGoing" v-model="project.keepGoing" required>
        </div>
        <div>
          <label for="doMore">Do More:</label>
          <input type="text" id="doMore" v-model="project.doMore" required>
        </div>
        <div>
          <label for="start">Start:</label>
          <input type="text" id="start" v-model="project.start" required>
        </div>
        <button type="submit" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Save</button>
      </form>
      <br><button @click="goBack" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Cancel</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'EditActionBrainstormingProject',
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
      this.fetchProjectDetails();
    },
    methods: {
      async fetchProjectDetails() {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`http://localhost:8000/api/actionbrainstormings/${this.route.params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.project = response.data;
        } catch (error) {
          console.error('Failed to fetch project details', error);
        }
      },
      async editActionBrainstorming() {
        const token = localStorage.getItem('token');
        try {
          await axios.put(`http://localhost:8000/api/actionbrainstormings/${this.route.params.id}`, this.project, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Project updated successfully.');
          this.router.push('/find');
        } catch (error) {
          console.error('Failed to update project', error);
          alert('Failed to update the project.');
        }
      },
      goBack() {
        this.router.push('/find');
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-action-brainstorming-container {
    max-width: 600px;
    margin: auto;
    padding: 1em;
    background-color: #f7f7f7;
    border-radius: 5px;
  }
  
  form div {
    margin-bottom: 1em;
  }
  
  form label {
    font-weight: bold;
  }
  
  form input[type="text"] {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  }
  </style>
  