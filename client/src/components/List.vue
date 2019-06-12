<template>
  <div class="list">
    <div>
      {{listData.title}}
      <button type="button" @click="deleteList" class="btn btn-warning">Delete List</button>
    </div>
    <div>
      <task v-for="task in tasks" :key="task._id" :taskData="task" />
    </div>
    <div>
      <form @submit.prevent="addTask">
        <input type="text" v-model="description" placeholder="Enter task here">
        <button type="submit">enter your task</button>
      </form>
    </div>
    <hr />
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
    methods: {
      addTask({ target: form }) {
        let newTask = {
          description: this.description,
          authorId: this.listData.authorId,
          boardId: this.listData.boardId,
          listId: this.listData._id
        }
        this.$store.dispatch('addTask', newTask)
        form.reset()
      },
      deleteList() {
        this.$store.dispatch('deleteList', this.listData)
      }
    }

  }
</script>

<style scoped>
</style>