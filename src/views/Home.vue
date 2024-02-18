<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="w-100 mb-4">
      <span for="#title"> Good Morming, {{ username }}! </span>
      <h1 id="title" class="text-wrap">
        <p class="fw-bold">
          You Have <span class="text-primary">{{ alltasks }} Tasks</span> this
          Month 👍
        </p>
      </h1>
    </div>
    <div class="w-100 mb-4">
      <div class="form-floating">
        <input
          type="text"
          class="form-control rounded-5"
          id="floatingInput"
          placeholder="Search a task..."
        />
        <label for="floatingInput"
          ><i class="bi bi-search"></i> Search a task...</label
        >
      </div>
    </div>
    <div class="w-100 gap-2 d-flex flex-row justify-content-evenly mb-4">
      <div
        class="w-75 bg-body-tertiary p-2 d-flex flex-column align-items-center rounded-5"
      >
        <div
          class="bg-danger-subtle p-2 rounded-5 border-1 d-flex justify-content-center border border-danger"
          style="width: 50px; height: 50px"
        >
          <i class="bi bi-clipboard2-x-fill align-self-center text-danger"></i>
        </div>
        <p class="fs-6 mt-2">to-do</p>
      </div>
      <div
        class="w-75 bg-body-tertiary p-2 d-flex flex-column align-items-center rounded-5"
      >
        <div
          class="bg-warning-subtle p-2 rounded-5 border-1 d-flex justify-content-center border border-warning"
          style="width: 50px; height: 50px"
        >
          <i
            class="bi bi-clipboard2-pulse-fill align-self-center text-warning"
          ></i>
        </div>
        <p class="fs-6 mt-2">Progress</p>
      </div>
      <div
        class="w-75 bg-body-tertiary p-2 d-flex flex-column align-items-center rounded-5"
      >
        <div
          class="bg-success-subtle p-2 rounded-5 border-1 d-flex justify-content-center border border-success"
          style="width: 50px; height: 50px"
        >
          <i
            class="bi bi-clipboard2-check-fill align-self-center text-success"
          ></i>
        </div>
        <p class="fs-6 mt-2">Done</p>
      </div>
    </div>
    <div class="w-100 d-flex flex-row justify-content-between">
      <div class="d-flex align-content-center">
        <h1 class="text-primary-emphasis fw-bold">Today`s Tasks</h1>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <router-link
          to="/tasks"
          class="link-underline-opacity-0 link-underline badge bg-body-tertiary text-body-tertiary"
          >See all</router-link
        >
      </div>
    </div>
    <!-- task today -->
    <TasksToday></TasksToday>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import NavBar from "../components/Nav.vue";
import TasksToday from "../components/TasksToday.vue";

export default {
  components: {
    NavBar,
    TasksToday,
  },
  data() {
    return {
      username: "",
      alltasks: 0,
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
      this.username = response.data.username;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }

    try {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        },
      });
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;

      const tasksThisMonth = response.data.filter((task) => {
        const taskDate = new Date(task.date);
        const taskMonth = taskDate.getMonth() + 1;

        return taskMonth === currentMonth;
      });

      this.alltasks = tasksThisMonth.length;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
};
</script>
