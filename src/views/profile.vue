<template>
  <div class="container">
    <div
      class="w-100 d-flex flex-row justify-content-between mt-2 mb-4 align-items-center text-light"
    >
      <router-link
        to="/home"
        class="item-icon bg-body-tertiary text-primary-emphasis d-flex align-items-center justify-content-center rounded-5"
        ><i class="bi bi-arrow-left-short"></i
      ></router-link>
    </div>
    <div class="w-100 mt-4">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <div class="d-flex">
          <!-- <img src="" alt="Profile image" class="w-25 h-25" /> -->
          <div
            style="width: 50px; height: 50px"
            class="rounded-4 overflow-hidden"
          >
        <img src="https://cdn-icons-png.freepik.com/256/3033/3033143.png" alt="" class="w-100 h-100 object-fit-cover">
        </div>
          <button
            class="border-0 bg-transparent translate-middle-x translate-middle-y position-absolute mx-4 mt-3 d-flex justify-content-center align-items-center"
          >
            <i class="bi bi-pencil-fill text-primary bg-primary-subtle rounded-5 fs-6" style="width: 25px; height: 25px;"></i>
          </button>
        </div>
        <div class="text-center">
          <p class="fs-3 fw-medium">{{ username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useStore } from "vuex";

export default {
  components: {},
  data() {
    return {
      username: "",
    };
  },
  async created() {
    const store = useStore();

    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
      console.log(response.data);
      this.username = response.data.fullname;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },
};
</script>
