<template>
  <div class="container">
    <div
      class="w-100 d-flex flex-row justify-content-between mt-2 mb-4 align-items-center text-light"
    >
      <router-link
        to="/tasks"
        class="item-icon bg-body-tertiary text-primary-emphasis d-flex align-items-center justify-content-center rounded-5"
        ><i class="bi bi-arrow-left-short"></i
      ></router-link>
    </div>

    <div class="w-100">
      <div class="d-flex flex-row gap-3 mb-2">
        <div
          class="d-flex flex-column w-100 p-4 rounded-4 text-light bg-success"
        >
          <div class="d-flex flex-row justify-content-between">
            <h4 class=" fs-5">Task title</h4>
            <h5 class=" fs-5">10:00 AM</h5>
          </div>
          <div class="w-100 ">
            <p class="text-wrap fs-6">Task</p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100">
      <form @submit.prevent="createTask">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Task Title:</label
          >
          <input
            v-model="taskTitle"
            type="Text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Ex: Make cake"
          />
        </div>
        <div class="mb-3">
          <label for="Date" class="form-label">Date:</label>
          <input
            v-model="taskDate"
            type="date"
            name=""
            id="Date"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="Time" class="form-label">Time:</label>
          <input
            v-model="taskTime"
            type="time"
            name=""
            id="Time"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Task:</label
          >
          <textarea
            v-model="taskDescription"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: "CreateTasks",
  data() {
    return {
      taskTitle: "",
      taskDate: "",
      taskTime: "",
      taskDescription: "",
      token: null,
    };
  },
  setup() {
    const store = useStore();
    const token = store.state.token;
    console.log(token)
    return {
      token
    };
  },
  methods: {
    async createTask() {
      console.log(this.token)
      try {
        const response = await axios.post("http://localhost:3000/tasks", {
          title: this.taskTitle,
          date: this.taskDate,
          time: this.taskTime,
          description: this.taskDescription,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`
          }
        });
        console.log(response.data);
        this.taskTitle = "";
        this.taskDate = "";
        this.taskTime = "";
        this.taskDescription = "";
      } catch (error) {
        console.error('Error:', error.response || error)
      }
    },
  }
};
</script>
