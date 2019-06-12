<template>
  <div class="tasks">
    {{taskData.description}}
    <br>
    <form v-show="showForm" @submit.prevent="editTask">
      <input type="text" placeholder="Edit Description" v-model="taskDescription">
      <button type="submit" class="btn btn-success ml-1">Submit Changes</button>
    </form>
    <button @click="showForm = !showForm" v-if="showForm == false" class="btn btn-warning">Edit Task</button>
    <button @click="showForm = !showForm" v-else="showForm == true" class="btn btn-warning">Cancel Edit</button>

    <button type="button" @click="deleteTask" class="btn btn-danger ml-1">Delete Task</button>
    <p v-for="comment in taskData.comments">{{comment.content}}
      <button type="button" @click="deleteComment(comment._id)" class="btn btn-info ml-1">Delete Comment</button>
    </p>
    <br>
    <form @submit.prevent="addComment">
      <input type="text" v-model="content" placeholder="Enter new comment here">
      <button type="submit">enter your comment</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Task",
    props: ['taskData'],
    data() {
      return {
        content: "",
        taskDescription: "",
        showForm: false
      }
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
      }
    },
    components: {}
  }
</script>