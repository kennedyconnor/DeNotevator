<template>
  <div class="container-fluid" id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
  #app {
    text-align: center;
    padding: 0px 0px;
    height: 100vh;
    width: 100vw;
    user-select: none;
  }
</style>