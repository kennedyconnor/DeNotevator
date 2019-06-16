<template>
  <drag :transfer-data="taskData" :effect-allowed="['move']" drop-effect="move" class="drag task">

    <div class="card border-dark mb-3 justify-content-center" style="max-width: 25rem;">
      <div class="card-header">
        <div class="row">
          <div class="col-8">
            <h6 class="float-right mt-1"><b>{{taskData.description}}</b></h6>
          </div>
          <div class="col-1">
            <img src="../assets/icons8-add-node-20.png" alt="Add Comment" title="Add Comment"
              @click="showAddCommentForm = !showAddCommentForm" v-if="!showAddCommentForm">
          </div>
          <div class="col-1">
            <img src="../assets/icons8-compose-20.png" alt="Edit Note Icon" title="Edit Note"
              @click="showForm = !showForm" v-if="!showForm">
          </div>
          <div class="col-1">
            <img src="../assets/icons8-trash-20.png" alt="Delete Task" title="Delete Task" @click="deleteTask">
          </div>
        </div>
      </div>

      <div class="card-body text-dark">
        <div class="row">
          <div class="col-12">
            <form v-show="showForm" @submit.prevent="editTask">
              <input type="text" placeholder="Edit Description" v-model="taskDescription">
              <button type="submit" class="btn btn-sm btn-success ml-1 mt-1">Submit Changes</button>
            </form>
            <button @click="showForm = !showForm" v-if="showForm" class="btn btn-sm btn-warning ml-1 mt-1">Cancel
              Edit</button>
          </div>
          <div class="col-12 mt-1">
            <form @submit.prevent="addComment" v-show="showAddCommentForm">
              <input type="text" v-model="content" placeholder="Your Comment" class="text-center">
              <button class="btn btn-sm btn-success mt-1 ml-1" type="submit">Add Comment</button>
            </form>
            <button @click="showAddCommentForm = !showAddCommentForm" v-if="showAddCommentForm"
              class="btn btn-sm btn-warning ml-1 mt-1 mb-1">Cancel</button>
          </div>
        </div>
        <div class="row justify-content-center" v-for="comment in taskData.comments">
          <div class="card border-dark mb-3" style="max-width: 20rem;">
            <div class="card-body text-dark text-center comment-body">
              <p class="mb-1">{{comment.content}}</p>
              <p class="author-comment">@{{comment.authorId.name}} <img src="../assets/icons8-delete-filled-15.png"
                  alt="Delete Comment" title="Delete Comment" @click="deleteComment(comment._id)" class="ml-1 mb-1">
              </p>
            </div>

          </div>
        </div>

      </div>


    </div>




    <!-- {{taskData.description}}
    <form v-show="showForm" @submit.prevent="editTask">
      <input type="text" placeholder="Edit Description" v-model="taskDescription">
      <button type="submit" class="btn btn-success ml-1">Submit Changes</button>
    </form>
    <button @click="showForm = !showForm" v-if="showForm == false" class="btn btn-secondary">Edit Note</button>
    <button @click="showForm = !showForm" v-else="showForm == true" class="btn btn-warning">Cancel Edit</button>

    <button type="button" @click="deleteTask" class="btn btn-danger ml-1">Delete Note</button> -->
    <!-- <div v-for="comment in taskData.comments">{{comment.content}} - {{comment.authorId.name}}
      <button type="button" @click="deleteComment(comment._id)" class="btn btn-info ml-1">Delete Comment</button>
    </div> -->
    <!-- <form @submit.prevent="addComment">
      <input type="text" v-model="content" placeholder="Your Comment">
      <button class="btn btn-secondary" type="submit">Add Comment</button>
    </form> -->
  </drag>
</template>

<script>
  import { Drag, Drop } from 'vue-drag-drop';

  export default {
    name: "Task",
    props: ['taskData'],
    data() {
      return {
        content: "",
        taskDescription: "",
        showForm: false,
        showAddCommentForm: false
      }
    },
    components: {
      Drag,
      Drop
    },
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.taskData)
      },
      addComment() {
        let newComment = {
          content: this.content,
          authorId: this.taskData.authorId,
        }
        this.taskData.comments.push(newComment)
        this.$store.dispatch('editTask', this.taskData)
        this.content = ''
      },
      deleteComment(id) {
        this.taskData.comments = this.taskData.comments.filter(comment => comment._id !== id)
        this.$store.dispatch('editTask', this.taskData)
      },
      editTask() {
        if (this.taskDescription) {
          this.taskData.description = this.taskDescription
          this.$store.dispatch('editTask', this.taskData)
          this.taskDescription = ""
        }
      },
      changeList(newListId) {
        let oldListId = this.taskData.listId
        this.taskData.listId = newListId
        this.$store.dispatch('moveTask', { task: this.taskData, oldListId })
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
    }
  }
</script>

<style scoped>
  .card {
    background: transparent;
  }

  .button {
    padding: .1rem .3rem;
  }

  img {
    cursor: pointer;
    size: 1rem;
  }

  .author-comment {
    font-size: 12px;
    margin-bottom: 1px;
    font-style: italic;
  }

  .comment-body {
    padding: 5px 5px;
  }
</style>


<!-- <div class="dropdown">
      <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">Move
        Note </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <p class="dropdown-item" @click="changeList(list._id)" v-for="list in lists"
          v-if="list._id !== taskData.listId">{{list.title}}</p>
      </div>
    </div> -->