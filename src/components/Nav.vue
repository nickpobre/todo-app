<template>
  <nav class="w-100 mb-4" style="height: 50px;">
    <div class="d-flex justify-content-between align-items-center p-2">
        <a style="width: 50px; height: 50px;" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <div class="w-100 h-100 d-flex align-items-center justify-content-center rounded-5 bg-body-tertiary text-dark">
                <i style="font-size: 20pt;" class="bi bi-list"></i>
            </div>
        </a>
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body  d-flex flex-column align-items-center w-100">
              <ul class="list-unstyled d-flex flex-column gap-4">
                <li><router-link to="/home" class="text-decoration-none">Home</router-link></li>
                <li><router-link to="/tasks" class="text-decoration-none">Tasks</router-link></li>
                <li><router-link to="/tasks/create" class="text-decoration-none">Create Task</router-link></li>
                <li><router-link to="/profile" class="text-decoration-none">Profile</router-link></li>
              </ul>
          </div>
        </div>
        <div style="width: 50px; height: 50px;" class="bg-black rounded-4">
        </div>
    </div>
  </nav>
</template>
<script></script>
