<template>
  <div class="find-container" style="background-color: #f4f3f3; text-align: center;">
    <img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2 style="color:  #e12526; text-align: center;">Find my projects</h2>

    <div>
      <input v-model="searchQuery" placeholder="Search by title" style="padding: 8px; font-size: 14px; width: 60%; margin-bottom: 1em; border-radius: 8px; border: 1px solid #ccc;">
      <button @click="searchProjects" style="background-color: gray; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Search</button>
    </div>
    
    <h2 style="color: darkblue; text-align: center;">- SWOT Projects -</h2>
    <div v-if="filteredSwotProjects.length" style="font-weight: bold;">
      <ul>
        <li v-for="project in filteredSwotProjects" :key="project.id" style="list-style: none; margin-bottom: 1em;">
          Title:
          <span>{{ project.title }}</span>
          <button @click="openSwotProject(project.id)" style="background-color: gray; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px; margin-left: 1em;">Open</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p style="text-align: center;">No SWOT projects found.</p>
    </div>

    <br><h2 style="color: darkblue; text-align: center;">- Action Brainstorming Projects -</h2>
    <div v-if="filteredActionBrainstormingProjects.length" style="font-weight: bold;">
      <ul>
        <li v-for="project in filteredActionBrainstormingProjects" :key="project.id" style="list-style: none; margin-bottom: 1em;">
          Title:
          <span>{{ project.title }}</span>
          <button @click="openActionBrainstormingProject(project.id)" style="background-color: gray; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px; margin-left: 1em;">Open</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p style="text-align: center;">No Action Brainstorming projects found.</p>
    </div>

    <br><h2 style="color: darkblue; text-align: center;">- Six Hats Projects -</h2>
    <div v-if="filteredSixHatsProjects.length" style="font-weight: bold;">
      <ul>
        <li v-for="project in filteredSixHatsProjects" :key="project.id" style="list-style: none; margin-bottom: 1em;">
          Title:
          <span>{{ project.title }}</span>
          <button @click="openSixHatsProject(project.id)" style="background-color: gray; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px; margin-left: 1em;">Open</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p style="text-align: center;">No Six Hats projects found.</p>
    </div>

    <br>
    <button @click="goBack" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Back</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'FindProjects',
  data() {
    return {
      swotProjects: [],
      actionBrainstormingProjects: [], 
      sixHatsProjects: [],
      searchQuery: '',
      filteredSwotProjects: [],
      filteredActionBrainstormingProjects: [],
      filteredSixHatsProjects: []
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      const token = localStorage.getItem('token');
      try {
        const swotResponse = await axios.get('http://localhost:8000/api/swots', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.swotProjects = swotResponse.data;
        this.filteredSwotProjects = this.swotProjects;

        const actionBrainstormingResponse = await axios.get('http://localhost:8000/api/action-brainstormings', { 
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.actionBrainstormingProjects = actionBrainstormingResponse.data;
        this.filteredActionBrainstormingProjects = this.actionBrainstormingProjects;

        const sixHatsResponse = await axios.get('http://localhost:8000/api/six-hats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.sixHatsProjects = sixHatsResponse.data;
        this.filteredSixHatsProjects = this.sixHatsProjects;

      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    },
    searchProjects() {
      const query = this.searchQuery.toLowerCase();
      this.filteredSwotProjects = this.swotProjects.filter(project => project.title.toLowerCase().includes(query));
      this.filteredActionBrainstormingProjects = this.actionBrainstormingProjects.filter(project => project.title.toLowerCase().includes(query));
      this.filteredSixHatsProjects = this.sixHatsProjects.filter(project => project.title.toLowerCase().includes(query));
    },
    openSwotProject(id) {
      this.router.push({ name: 'SwotProjectDetails', params: { id } });
    },
    openActionBrainstormingProject(id) {
      this.router.push({ path: `/action-brainstorming-projects/${id}` });
    },
    openSixHatsProject(id) {
      this.router.push({ name: 'SixHatsProjectDetails', params: { id } });
    },
    goBack() {
      this.router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.find-container {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>

