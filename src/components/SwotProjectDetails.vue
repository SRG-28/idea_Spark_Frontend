<template>
  <div class="swot-details-container" style="text-align: center;">
    <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2>Title</h2>
    <p>{{ project.title }}</p>
    <div>
      <h3>Strengths</h3>
      <p>{{ project.strengths }}</p>
    </div>
    <div>
      <h3>Weaknesses</h3>
      <p>{{ project.weaknesses }}</p>
    </div>
    <div>
      <h3>Opportunities</h3>
      <p>{{ project.opportunities }}</p>
    </div>
    <div>
      <h3>Threats</h3>
      <p>{{ project.threats }}</p>
    </div>
    <button @click="editSwotProject" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Edit</button> &nbsp; &nbsp;
    <button @click="deleteSwot" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Delete</button> &nbsp; &nbsp;
    <button @click="goBack" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Back</button><br><br>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'SwotProjectDetails',
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
    async deleteSwot() {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:8000/api/swots/${this.route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Project deleted successfully.');
        this.router.push('/find');
      } catch (error) {
        console.error('Failed to delete project', error);
        alert('Failed to delete the project.');
      }
    },
    goBack() {
      this.router.push('/find');
    },
    editSwotProject() {
      this.router.push({ name: 'EditSwotProject', params: { id: this.route.params.id } });
    }
  }
};
</script>

<style scoped>
.swot-details-container {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>
