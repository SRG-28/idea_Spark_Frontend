<template>
  <div class="six-hats-details-container" style="text-align: center;">
    <br><img src="@/assets/images/logo2.png" alt="logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    <h2>Title</h2>
    <p>{{ project.title }}</p>
    <div>
      <h3>Information</h3>
      <p>{{ project.information }}</p>
    </div>
    <div>
      <h3>Emotions</h3>
      <p>{{ project.emotions }}</p>
    </div>
    <div>
      <h3>Discernment</h3>
      <p>{{ project.discernment }}</p>
    </div>
    <div>
      <h3>Optimistic Response</h3>
      <p>{{ project.optimisticResponse }}</p>
    </div>
    <div>
      <h3>Creativity</h3>
      <p>{{ project.creativity }}</p>
    </div>
    <div>
      <h3>Overview</h3>
      <p>{{ project.overview }}</p>
    </div>
    <button @click="edit" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Edit</button> &nbsp; &nbsp;
    <button @click="deleteSixHats" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Delete</button> &nbsp; &nbsp;
    <button @click="goBack" style="background-color: #e12526; color: #f4f3f3; font-weight: bold; font-size: 14px; padding: 8px 16px; border-radius: 8px;">Back</button><br><br>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'SixHatsProjectDetails',
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
    async deleteSixHats() {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:8000/api/sixhats/${this.route.params.id}`, {
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
    edit() {
      this.router.push({ name: 'EditSixHatsProject', params: { id: this.route.params.id } });
    }
  }
};
</script>

<style scoped>
.six-hats-details-container {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  background-color: #f7f7f7;
  border-radius: 5px;
}
</style>

  