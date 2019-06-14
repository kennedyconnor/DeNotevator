<template>
  <div class="board">
    <div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <router-link to="/">Your Boards</router-link>
        </div>
        <div class="col-4">
          <button class="btn btn-primary float-right" @click="userLogOut">Log Out</button>
          <span class="float-right">@{{this.$store.state.user.name}} </span>
        </div>
      </div>
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
      this.$store.dispatch('getSharedBoards', this.boardId)

    },
    data() {
      return {
        title: "",
        showForm: false,
        boardTitle: "",
        boardDescription: "",
        userName: ""
      }
    },
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || this.$store.state.sharedBoards.find(b => b._id == this.boardId) ||
          { title: "Loading..." }
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
      },
      userLogOut() {
        this.$store.dispatch('logout')
      },
      addSharedUser() {
        let sharedUser = this.$store.dispatch('getUserByName', this.userName)
        let sharedBoard = {
          _id: this.board._id,
          sharedIds: this.board.sharedIds.push(sharedUser._id)
        }
        this.$store.dispatch('editBoard', sharedBoards)
        this.userName = ""
      }
    }
  };
</script>

<style scoped>
  .board {
    font-family: 'Indie Flower', cursive;
  }
</style>