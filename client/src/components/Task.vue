<template>
  <div class="tasks">
    {{taskData.description}}
    <p v-for="comment in taskData.comments">{{comment.content}}</p>
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
      addComment(event) {
        let newComment = {
          content: this.content,
          authorId: this.taskData.authorId,
        }
        this.taskData.comments.push(newComment)
        this.$store.dispatch('editTask', this.taskData)
        // form.reset()
        // this.content = ""
        event.target.reset()
      }
    },
    components: {}
  }
</script>

<!-- { target: form } -->