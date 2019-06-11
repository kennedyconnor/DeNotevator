<template>
  <div class="board">
    {{board.title}}
    <!-- <list v-for="list in lists" :listData='list'></list> -->
    <lists />
  </div>
</template>

<script>
  import Lists from "@/components/Lists.vue"

  export default {
    name: "board",
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      }
    },
    components: {
      Lists
    },
    mounted() {
      this.$store.dispatch('getLists', this.boardId)
    },
    props: ["boardId"]
  };
</script>