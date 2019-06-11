<template>
  <ol>
    <li v-for="list in lists" :key="list._id">
      {{list.title}}
    </li>
  </ol>
</template>

<script>
  export default {
    name: 'Lists',
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    mounted() {
      // this.$store.dispatch('getTasks')
    }
  }
</script>

<style scoped>
</style>