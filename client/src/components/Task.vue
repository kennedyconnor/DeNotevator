<template>
  <div class="tasks">
    {{taskData.description}}
    <p v-for="comment in taskData.comments">{{comment.content}}</p>
  </div>
</template>

<script>
  export default {
    name: "Task",
    props: ['taskData'],
    data() {
      return {}
    },
    methods: {},
    components: {}
  }
</script>