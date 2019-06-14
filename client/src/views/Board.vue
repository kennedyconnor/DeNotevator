<template>
  <div class="board board-img container-fluid">
    <div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <h2 class="brand">de<span class="brand-mid">Note</span>vator</h2>
        </div>
        <div class="col-4">
          <button class="btn btn-primary float-right" @click="userLogOut">Log Out</button>
          <span class="float-right">@{{this.$store.state.user.name}} </span>
        </div>
        <div class="col">
          <router-link to="/"><button class="btn btn-secondary">Your Boards</button></router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="row p-1">
      <div class="col">
        <h2>{{board.title}}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h4>{{board.description}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form v-show="showForm" @submit.prevent="editBoard">
          <input type="text" placeholder="Edit Title" v-model="boardTitle">
          <input type="text" placeholder="Edit Description" v-model="boardDescription">
          <button class="btn btn-secondary" type="submit">Submit Changes</button>
        </form>
        <button class="btn btn-secondary" @click="showForm = !showForm" v-if="!showForm">Edit Board Details</button>
        <button class="btn btn-secondary" @click="showForm = !showForm" v-else="showForm">Cancel Edit</button>
      </div>
    </div>
    <div class="row p-3">
      <div class="col">
        <form @submit.prevent="addList">
          <input type="text" v-model="title" placeholder="Enter list name here">
          <button class="btn btn-secondary" type="submit">Enter New List</button>
        </form>
      </div>
    </div>
    <hr />
    <div>
      <list v-for="list in lists" :key="list._id" :listData="list" />
    </div>
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
      },
      userLogOut() {
        this.$store.dispatch('logout')
      }
    }
  };
</script>

<style scoped>
  .board {
    font-family: 'Indie Flower', cursive;
  }

  .board-img {
    background-image: url('../assets/whiteboard.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    height: 100%;
    width: 100%;
    font-family: 'Raleway', sans-serif;
  }

  .brand {
    font-size: 3em;
    font-family: 'Permanent Marker', cursive;
  }

  .brand-mid {
    font-size: 1.3em;
    font-family: 'Permanent Marker', cursive;
  }

  .container-fluid {
    height: 100vh;
  }
</style>