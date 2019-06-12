<template>
  <div class="tasks">
    {{taskData.description}}
    <button type="button" @click="deleteTask" class="btn btn-secondary">Delete Task</button>
    <p v-for="comment in taskData.comments">{{comment.content}}
      <button type="button" @click="deleteComment(comment._id)" class="btn btn-info">Delete Comment</button>
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
        content: ""
      }
    },
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.taskData)
      },
      addComment({ target: form }) {
        let newComment = {
          content: this.content,
          authorId: this.taskData.authorId,
        }
        this.taskData.comments.push(newComment)
        this.$store.dispatch('editTask', this.taskData)
        form.reset()
      },
      deleteComment(id) {
        this.taskData.comments = this.taskData.comments.filter(comment => comment._id !== id)
        this.$store.dispatch('editTask', this.taskData)
      }
    },
    components: {}
  }
</script>