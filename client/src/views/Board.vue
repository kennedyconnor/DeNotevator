<template>
  <div class="board">
    {{board.title}}
    <div>
      <form @submit="addList">
        <input type="text" v-model="title" placeholder="Enter list name here">
        <button type="submit">enter your shizzle</button>
      </form>
    </div>
    <list v-for="list in lists" :key="list._id" :listData="list" />
  </div>
</template>

<script>
  import List from "@/components/List.vue"

  export default {
    name: "board",
    props: ["boardId"],
    mounted() {
      this.$store.dispatch('getLists', this.boardId)
    },
    data() {
      return {
        title: ""
      }
    },
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      },
      lists() {
        return this.$store.state.lists
      }
    },
    components: {
      List
    },
    methods: {
      addList() {
        let newList = {
          title: this.title,
          boardId: this.boardId,
          authorId: this.board.authorId
        }
        this.$store.dispatch('addList', newList)
        this.title = ''
      }
    }
  };
</script>