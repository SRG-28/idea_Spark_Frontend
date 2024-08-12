import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import axios from './axios';

import LoginPage from './components/LoginPage.vue';
import Dashboard from './components/Dashboard.vue';
import RegisterPage from './components/RegisterPage.vue';
import Find from './components/Find.vue';
import Swot from './components/Swot.vue';
import Create from './components/Create.vue';
import SixHats from './components/SixHats.vue';
import Search from './components/Search.vue';
import SwotProjectDetails from './components/SwotProjectDetails.vue';
import SixHatsProjectDetails from './components/SixHatsProjectDetails.vue';
import ActionBrainstormingProjectDetails from './components/ActionBrainstormingProjectDetails.vue';
import EditSixHatsProject from './components/EditSixHatsProject.vue'; 
import EditSwotProject from './components/EditSwotProject.vue'; 
import EditActionBrainstormingProject from './components/EditActionBrainstormingProject.vue'; 

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: Dashboard },
  { path: '/find', component: Find },
  { path: '/swot', component: Swot },
  { path: '/create', component: Create },
  { path: '/sixHats', component: SixHats },
  { path: '/search', component: Search },
  { path: '/register', component: RegisterPage },
  { path: '/swot-projects/:id', name: 'SwotProjectDetails', component: SwotProjectDetails },
  { path: '/six-hats-projects/:id', name: 'SixHatsProjectDetails', component: SixHatsProjectDetails },
  { path: '/action-brainstorming-projects/:id', name: 'ActionBrainstormingProjectDetails', component: ActionBrainstormingProjectDetails },
  { path: '/edit-six-hats-project/:id', name: 'EditSixHatsProject', component: EditSixHatsProject },
  { path: '/edit-swot-project/:id', name: 'EditSwotProject', component: EditSwotProject },
  { path: '/edit-action-brainstorming-project/:id', name: 'EditActionBrainstormingProject', component: EditActionBrainstormingProject }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
