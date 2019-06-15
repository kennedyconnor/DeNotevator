<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-5">
        <h2 class="brand float-left">de<span class="brand-mid">Note</span>vator</h2>
      </div>
      <div class="col-5">
        <router-link to="/"><a class="float-left ml-3 mt-1 text-dark">Boards Home</a>
        </router-link>
      </div>
      <div class="col-2 offset-md-">
        <span class="user-name mr-2">@{{this.$store.state.user.name}}</span>
        <button class="btn btn-danger btn-sm mt-1" @click="userLogOut">Log Out</button>
      </div>
    </div>

    <div class="row p-1">
      <div class="col-12">
        <h1 class="board-title">{{board.title}}</h1>
      </div>
      <div class="col-12">
        <h4 class="board-desc">{{board.description}}</h4>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <form v-show="showForm" @submit.prevent="editBoard">
          <input type="text" placeholder="Edit Board Title" v-model="boardTitle" class="text-center">
          <input type="text" placeholder="Edit Board Description" v-model="boardDescription" class="text-center">
          <button class="btn btn-success ml-1 mb-1" type="submit">Submit Changes</button>
        </form>
        <button class="btn btn-light" @click="showForm = !showForm" v-if="!showForm">Edit Board Details</button>
        <button class="btn btn-secondary" @click="showForm = !showForm" v-else="showForm">Cancel Edit</button>
      </div>
    </div>
    <div class="row p-3">
      <div class="col">
        <form @submit.prevent="addList">
          <input type="text" v-model="title" placeholder="Enter list name here" required>
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
    font-family: 'Raleway', sans-serif;
    background-image: url('../assets/whiteboard.jpg');
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    background-position: center;
    background-attachment: scroll;
    height: 100vh;
  }

  .brand {
    font-size: 1.3em;
    font-family: 'Permanent Marker', cursive;
  }

  .brand-mid {
    font-size: 1.2em;
    font-family: 'Permanent Marker', cursive;
  }

  .user-name {
    font-family: 'Kalam', cursive;
    font-weight: bold
  }

  .board-title {
    font-family: 'Permanent Marker', cursive;
    font-size: 3rem;
  }

  .board-desc {
    font-family: 'Kalam', cursive;
  }

  .btn {
    padding: .1rem .3rem;
  }
</style>