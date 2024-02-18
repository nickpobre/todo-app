<template>
  <div class="w-100">
    <div class="carousel-custom">
      <div
        v-for="task in tasks"
        :key="task.title"
        class="item-custom bg-success rounded-4 text-light mx-2"
        style="width: 250px"
      >
        <div class="d-flex flex-column h-100 p-2 text-wrap">
          <h4 class="fw-bold mb-4">{{ task.title }}</h4>
          <p class="opacity-50 fs-6 mb-4">
            {{ task.description }}
          </p>
          <h5>{{ task.time }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
export default {
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.getTasksToday();
  },
  methods: {
    getTasksToday() {
      const store = useStore();
      const token = store.state.token;

      axios
        .get("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];

          this.tasks = response.data.filter((task) => {
            const taskDate = new Date(task.date);
            const formattedTaskDate = taskDate.toISOString().split("T")[0];

            return formattedTaskDate === formattedDate;
          });
        })
        .catch((error) => {
          console.error("Error fetching tasks for today:", error);
        });
    },
  },
};
</script>
