<template>
  <div class="board">
    <div>
      <router-link to="/">Your Boards</router-link>
    </div>
    {{board.title}}
    <br>
    {{board.description}}
    <form v-show="showForm" @submit.prevent="editBoard">
      <input type="text" placeholder="Edit Title" v-model="boardTitle">
      <input type="text" placeholder="Edit Description" v-model="boardDescription">
      <button type="submit">Submit Changes</button>
    </form>
    <button @click="showForm = !showForm" v-if="showForm == false">EDIT BOARD</button>
    <button @click="showForm = !showForm" v-else="showForm == true">Cancel Edit</button>

    <div>
      <form @submit.prevent="addList">
        <input type="text" v-model="title" placeholder="Enter list name here">
        <button type="submit">enter your list</button>
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
      this.$store.dispatch('getBoards', this.boardId)
    },
    data() {
      return {
        title: "",
        showForm: false,
        boardTitle: "",
        boardDescription: ""
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
      },

      editBoard() {
        if (!this.boardTitle) { this.boardTitle = this.board.title }
        if (!this.boardDescription) { this.boardDescription = this.board.description }
        debugger
        let boardEdits = {
          title: this.boardTitle,
          description: this.boardDescription,
          _id: this.board._id
        }
        this.$store.dispatch('editBoard', boardEdits)
        this.boardTitle = ""
        this.boardDescription = ""
      }
    }
  };
</script>