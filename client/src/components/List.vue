<template>
  <drop @drop="handleDrop" class="drop">
    <div class="row">
      <div class="col">
        <h4>{{listData.title}}</h4>
      </div>
    </div>
    <div>
      <form v-show="showForm" @submit.prevent="editList">
        <input type="text" placeholder="Edit List Title" v-model="listTitle">
        <button type="submit" class="btn btn-success">Submit Changes</button>
      </form>
      <button @click="showForm = !showForm" v-if="!showForm" class="btn btn-secondary">Edit List Name</button>
      <button @click="showForm = !showForm" v-else="showForm" class="btn btn-warning">Cancel Edit</button>
      <button type="button" @click="deleteList" class="btn btn-danger ml-1">Delete List</button>
    </div>

    <div class="row">
      <div class="col p-3">
        <task v-for="task in tasks" :key="task._id" :taskData="task" />
      </div>
    </div>

    <div>
      <form @submit.prevent="addTask">
        <input type="text" v-model="description" placeholder="Enter Note" required>
        <button type="submit" class="btn btn-secondary">Add a note</button>
      </form>
    </div>
    <hr />
  </drop>
</template>

<script>
  import Task from '@/components/Task.vue'
  import { Drag, Drop } from 'vue-drag-drop';

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
      Task,
      Drag,
      Drop
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
      },
      handleDrop(data) {
        let oldListId = data.listId
        data.listId = this.listData._id
        this.$store.dispatch('moveTask', { task: data, oldListId })
      }
    }

  }
</script>

<style scoped>
  .btn {
    padding: .1rem .3rem;
  }

  /* list-bg {
    background: transparent;
    height: 100vh;
  } */
</style>