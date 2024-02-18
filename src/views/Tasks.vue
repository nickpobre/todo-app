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
      <button class="btn btn-primary rounded-4 p-2 fw-bold">
        <i class="bi bi-plus"></i
        ><router-link
          to="/tasks/create"
          class="link-underline link-underline-opacity-0 text-light"
        >
          Add Task</router-link
        >
      </button>
    </div>
    <div class="w-100">
      <div class="d-flex justify-content-between fw-bold">
        <div
          v-for="day in days"
          :key="day"
          class="d-flex flex-column justify-content-center text-primary-emphasis"
        >
          <a
            class="link-underline link-underline-opacity-0"
            @click="selectDay(day)"
          >
            <p class="m-0">{{ day }}</p>
            <p>{{ getDayFormatted(day) }}</p>
          </a>
        </div>
      </div>
    </div>
    <!--tasks -->
    <div class="w-100">
      <div
        v-for="task in getTasksByDate(selectedDay)"
        :key="task.title"
        class="d-flex flex-row gap-3 mb-2"
      >
        <div class="h-auto d-flex flex-column text-success">
          <i class="bi bi-circle-fill"></i>
          <div class="vr h-100 m-auto opacity-100 bg-success"></div>
        </div>
        <div
          class="d-flex flex-column w-100 p-4 rounded-4 text-light bg-success"
        >
          <div class="d-flex flex-row justify-content-between ">
            <h4 class=" fs-5">{{ task.title }}</h4>
            <h5 class=" fs-5">{{ task.time }}</h5>
          </div>
          <div class="w-100">
            <p class="text-wrap fs-6">{{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { format, formatISO, parseISO } from "date-fns";
import { useStore } from "vuex";

export default {
  data() {
    return {
      tasks: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectedDay: "",
      token: "",
    };
  },
  mounted() {
    const store = useStore();
    this.token = store.state.token;

    axios
      .get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.tasks = response.data;
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });

    this.selectedDay = formatISO(new Date()).split("T")[0];
  },
  methods: {
    selectDay(day) {
      const today = new Date();
      const dayIndex = this.days.indexOf(day);
      const date = today.setDate(today.getDate() + dayIndex);
      this.selectedDay = formatISO(date).split("T")[0];
    },
    getTasksByDate(date) {
      if (!date) {
        return this.tasks;
      }

      return this.tasks.filter((task) => {
        return task.date.split("T")[0] === date;
      });
    },
    getDayFormatted(day) {
      const today = new Date();
      const dayIndex = this.days.indexOf(day);
      const date = today.setDate(today.getDate() + dayIndex);

      return format(date, "d");
    },
  },
};
</script>
