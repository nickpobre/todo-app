// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App)

// Adicione um hook de navegação global para verificar a autenticação antes de acessar rotas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['isAuthenticated']
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    // Redirecione para a página de login se a autenticação for necessária e o usuário não estiver autenticado
    next('/login')
  } else {
    next() // Prossiga para a próxima rota
  }
})

app.use(router)
app.use(store)
app.mount('#app')
