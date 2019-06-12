<template>
  <div class="list">

    <div>
      {{listData.title}}
      <form v-show="showForm" @submit.prevent="editList">
        <input type="text" placeholder="Edit Title" v-model="listTitle">
        <button type="submit" class="btn btn-success">Submit Changes</button>
      </form>
      <button @click="showForm = !showForm" v-if="showForm == false" class="btn btn-warning">Edit List</button>
      <button @click="showForm = !showForm" v-else="showForm == true" class="btn btn-warning">Cancel Edit</button>
      <button type="button" @click="deleteList" class="btn btn-danger ml-1">Delete List</button>
    </div>

    <div>
      <task v-for="task in tasks" :key="task._id" :taskData="task" />
    </div>
    <div>
      <form @submit.prevent="addTask">
        <input type="text" v-model="description" placeholder="Enter task here">
        <button type="submit" class="btn btn-success">enter your task</button>
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
        listTitle: "",
        showForm: false
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
      addTask() {
        let newTask = {
          description: this.description,
          authorId: this.listData.authorId,
          boardId: this.listData.boardId,
          listId: this.listData._id
        }
        this.$store.dispatch('addTask', newTask)
        this.description = ''
      },
      deleteList() {
        this.$store.dispatch('deleteList', this.listData)
      },

      editList() {
        if (this.listTitle) {
          this.listData.title = this.listTitle
          this.$store.dispatch('editList', this.listData)
          this.listTitle = ''
        }
      }
    }

  }
</script>

<style scoped>
</style>