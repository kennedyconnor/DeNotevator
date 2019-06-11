<template>
  <div class="list">
    <div>
      {{listData.title}}
    </div>

    <div>
      <form @submit="">
        <input type="text" v-model="description" placeholder="Enter task here">
        <button type="submit">enter your task</button>
      </form>
    </div>
    <div>
      <task v-for="task in tasks" :key="task._id" :taskData="task" />
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'

  export default {
    name: 'Lists',
    props: ['listData'],
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },
    data() {
      return {
        description: "",
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }
    },
    components: {
      Task
    },
  }
</script>

<style scoped>
</style>