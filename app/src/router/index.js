import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import PatientTableView from '../views/PatientTableView.vue';
import Assessment from '../views/Assessment.vue';
import Orders from '../views/Orders.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/patient',
    name: 'patient',
    component: PatientTableView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/assessment',
    name: 'assessment',
    component: Assessment,
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
