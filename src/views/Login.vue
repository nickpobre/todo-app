<template>
  <div class="vh-100 vw-100 d-flex align-items-center justify-content-center">
    <form @submit.prevent="submitLogin">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-success w-100 py-2 mt-3">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await axios.post('http://127.0.0.1:3000/login', {
          email: this.email,
          password: this.password
        })

        const token = response.data.accessToken
        this.$store.commit('setToken', token)
        this.$router.push('/home')
      } catch (error) {
        console.error('Error during login:', error.response || error)
      }
    }
  }
};
</script>
