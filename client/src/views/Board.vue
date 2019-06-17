<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-5">
        <h2 class="brand float-left">de<span class="brand-mid">Note</span>vator</h2>
      </div>
      <div class="col-5">
        <router-link to="/"><a class="float-left ml-5 mt-1 text-dark boards-link"><b>Boards Home</b></a>
        </router-link>
      </div>
      <div class="col-2">
        <button class="btn btn-danger btn-sm mt-1 float-right" @click="userLogOut">Log Out</button>
        <span class="user-name mr-2 float-right">@{{this.$store.state.user.name}}</span>
      </div>
    </div>

    <div class="row">
      <div class="col-8 offset-md-2 pl-4">
        <h1 class="board-title">{{board.title}}</h1>
      </div>
      <div class="row">
        <div class="col mt-1">
          <img src="../assets/icons8-add-user-group-man-man-filled-30.png" alt="Add Collaborator"
            title="Add Collaborator" @click="showAddCollabForm = !showAddCollabForm" v-if="!showAddCollabForm"
            class="mt-3 mr-3">
        </div>
      </div>
      <div class="row">
        <div class="col mt-1">
          <img src="../assets/icons8-compose-30.png" alt="Edit Board Icon" title="Edit Board"
            @click="showForm = !showForm" v-if="!showForm" class="mt-3 mr-3">
        </div>
      </div>
      <div class="row">
        <div class="col mt-1 add-list">
          <img src="../assets/icons8-add-list-30.png" alt="Add List Icon" title="Create List"
            @click="showAddListForm = !showAddListForm" v-if="!showAddListForm" class="mt-3">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addSharedUser" v-show="showAddCollabForm">
          <input type="text" placeholder="User Name" v-model="userName" class="text-center">
          <button type="submit" class="btn btn-sm btn-success ml-1 mb-1 py-1">Add User</button>
        </form>
      </div>
      <div class="col-12">
        <button @click="showAddCollabForm = !showAddCollabForm" v-if="showAddCollabForm" class="btn btn-sm btn-warning">
          Cancel</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h5 class="board-desc">{{board.description}}</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form v-show="showForm" @submit.prevent="editBoard">
          <input type="text" placeholder="Edit Board Title" v-model="boardTitle" class="text-center">
          <input type="text" placeholder="Edit Board Description" v-model="boardDescription" class="text-center ml-1">
          <button class="btn btn-success ml-1 mb-1" type="submit">Submit Changes</button>
        </form>
      </div>
      <div class="col-12">
        <button class="btn btn-warning mt-1" @click="showForm = !showForm" v-if="showForm">Cancel Edit</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addList" v-show="showAddListForm">
          <input type="text" v-model="title" placeholder="Enter List Name" required class="text-center">
          <button class="btn btn-success ml-1 mb-1 py-1" type="submit">Add List</button>
        </form>
      </div>
      <div class="col-12">
        <button class="btn btn-warning" @click="showAddListForm = !showAddListForm"
          v-if="showAddListForm">Cancel</button>
      </div>
    </div>

    <div class="row">
      <list class="col-4" v-for="list in lists" :key="list._id" :listData="list" />
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
        userName: "",
        showAddCollabForm: false,
        showAddListForm: false
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

        let sharedBoard = {
          name: this.userName,
          _id: this.board._id,
          sharedIds: this.board.sharedIds
        }
        this.$store.dispatch('getUserByName', sharedBoard)

        this.userName = ""
      }
    }
  };
</script>

<style scoped>
  .board {
    font-family: 'Raleway', sans-serif;
    background-image: url('../assets/whiteboard-3.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: 100% 100%;
    background-position: center;
    /* background-repeat: no-repeat; */
    min-width: 100vw;
    min-height: 100%;
  }

  .boards-link {
    font-size: 1.3em;
    font-family: 'Kalam', cursive;
  }

  .router-link:hover {
    color: blue;
  }

  .brand {
    font-size: 1.3em;
    font-family: 'Kalam', cursive;
    font-weight: bold;
    margin-top: .3rem
  }

  .brand-mid {
    font-size: 1.2em;
    font-family: 'Kalam', cursive;
    font-weight: bold;
    padding-top: .5rem
  }

  .user-name {
    font-family: 'Kalam', cursive;
    font-weight: bold;
    margin-top: .5rem;
  }

  .board-title {
    font-family: 'Permanent Marker', cursive;
    font-size: 3rem;
  }

  .fas {
    cursor: pointer;
  }

  .fa-user-plus {
    color: rgb(0, 158, 0);
  }

  .fa-user-edit {
    color: rgb(185, 185, 0);
  }

  .btn {
    padding: .0rem .3rem;
  }

  img {
    cursor: pointer;
  }

  .add-list {
    color: blue;
  }
</style>