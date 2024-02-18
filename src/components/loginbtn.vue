<template>
    <div>
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useAuthStore } from '@/store/auth';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            localStorage.setItem('accessToken', data.accessToken);
            authStore.login(data.accessToken);
            // Redireciona para a página de tarefas
            router.push('/tasks');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while logging in');
        }
      };
  
      return {
        email,
        password,
        login,
      };
    },
  });
  </script>
  @/store