import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'
import login from '../views/Login.vue'
import home from '../views/Home.vue'
import tasks from '../views/Tasks.vue'
import tasksCreate from '../views/CreateTasks.vue'
import profile from '../views/profile.vue'
const requireAuth = (to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    console.log(isAuthenticated)
    console.log('Not authenticated. Redirecting to login.')
    next('/login')
  } else {
    console.log('Authenticated. Proceeding to the route.')
    next()
  }
}

const routes = [
  {
    path: '/',
    component: home,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth 
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/tasks',
    component: tasks,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/tasks/create',
    component: tasksCreate,
    meta : { requireAuth: true},
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    component: profile,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
