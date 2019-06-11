<template>
  <div class="list">
    <div>
      {{listData.title}}
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
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    components: {
      Task
    },
  }
</script>

<style scoped>
</style>