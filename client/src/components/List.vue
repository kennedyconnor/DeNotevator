<template>
  <drop @drop="handleDrop" class="drop">
    <div class="card border-dark mb-3" style="max-width: 30rem;">
      <div class="card-header text-center pt-4">
        <div class="row">
          <div class="col-12">
            <h4><b>{{listData.title}}</b></h4>
          </div>
        </div>
        <div class="row">
          <div class="col-1 offset-md-4">
            <img src="../assets/icons8-add-property-20.png" alt="Add Note" title="Add Note"
              @click="showAddTaskForm = !showAddTaskForm" v-if="!showAddTaskForm">
          </div>
          <div class="col-1">
            <img src="../assets/icons8-compose-20.png" alt="Edit List Icon" title="Edit List"
              @click="showForm = !showForm" v-if="!showForm">
          </div>
          <div class="col-1">
            <img src="../assets/icons8-trash-20.png" alt="Delete List" title="Delete List" @click="deleteList">
          </div>
        </div>
      </div>
      <div class="card-body text-dark">
        <div class="row">
          <div class="col">
            <form v-show="showForm" @submit.prevent="editList">
              <input type="text" placeholder="Edit List Title" v-model="listTitle" class="text-center">
              <button type="submit" class="btn btn-sm btn-success mb-1 ml-1 py-1">Submit</button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button @click="showForm = !showForm" v-if="showForm" class="btn btn-warning">Cancel Edit</button>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <form @submit.prevent="addTask" v-show="showAddTaskForm">
              <input type="text" v-model="description" placeholder="Enter Your Note" required class="text-center">
              <button type="submit" class="btn btn-success btn-sm mb-1 ml-1 py-1">Add Note</button>
            </form>
          </div>
          <div class="col-12">
            <button class="btn btn-sm btn-warning mb-2 mt-1" @click="showAddTaskForm = !showAddTaskForm"
              v-if="showAddTaskForm">Cancel</button>
          </div>
        </div>
        <div class="row">
          <task class="col-12" v-for="task in tasks" :key="task._id" :taskData="task" />
        </div>
      </div>
    </div>


    <!-- <div class="row">
      <div class="col">
        <h4>{{listData.title}}</h4>
        <form v-show="showForm" @submit.prevent="editList">
          <input type="text" placeholder="Edit List Title" v-model="listTitle">
          <button type="submit" class="btn btn-success">Submit Changes</button>
        </form>
        <button @click="showForm = !showForm" v-if="!showForm" class="btn btn-secondary">Edit List Name</button>
        <button @click="showForm = !showForm" v-else="showForm" class="btn btn-warning">Cancel Edit</button>
        <button type="button" @click="deleteList" class="btn btn-danger ml-1">Delete List</button>
        <div class="row">
          <div class="col p-3">
            <task v-for="task in tasks" :key="task._id" :taskData="task" />
          </div>
        </div>
      </div>
    </div> -->


    <!-- <div>
      <form @submit.prevent="addTask">
        <input type="text" v-model="description" placeholder="Enter Note" required>
        <button type="submit" class="btn btn-secondary">Add a note</button>
      </form>
    </div> -->

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
        showForm: false,
        showAddTaskForm: false
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

  .card {
    background: transparent;
    border-width: 3px;
  }

  .card-header {
    background: transparent;
    font-family: 'Kalam', cursive;

  }

  .card-body {
    background: transparent;
  }

  .card-text {
    background: transparent;
  }

  img {
    cursor: pointer;
  }

  /* list-bg {
    background: transparent;
    height: 100vh;
  } */
</style>