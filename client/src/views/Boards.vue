<template>
  <div class="container-fluid boards">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <h1 class="brand">de<span class="brand-mid">Note</span>vator</h1>
      </div>
      <div class="col-4">
        <button class="btn btn-sm btn-danger float-right mt-1" @click="userLogOut">Log Out</button>
        <span class="float-right mr-2 mt-2 user-name">@{{this.$store.state.user.name}} </span>
      </div>
    </div>
    <div class="row" v-show="showForm">
      <div class="col">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="Title" v-model="newBoard.title" required class="text-center">
          <input type="text" placeholder="Description" v-model="newBoard.description" required class="text-center ml-1">
          <button class="btn btn-success ml-1 mb-1 btn-sm" type="submit">Create Board</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-sm btn-dark mb-2" @click="showForm = !showForm"
          v-if="showForm == false">Add
          Board</button>
        <button type="button" class="btn btn-sm btn-warning mb-2" @click="showForm = !showForm"
          v-else-if="showForm == true">Cancel</button>
      </div>
    </div>


    <div class="row">
      <div class="card-columns">
        <div class="container" v-for="board in boards" :key="board._id" @click="openBoard(board._id)">
          <img src="https://cdn.shopify.com/s/files/1/0535/6917/products/Ruthlessness.jpg?v=1476131976"
            alt="Demotivator Image" class="image">
          <div class="middle">
            <div class="text">
              <h5><b>{{board.title}}</b> <i class="fas fa-users"></i></h5>
              <p>{{board.description}}</p>
              <button type="button" class="btn btn-sm btn-danger" @click="deleteBoard(board._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>

<script>
  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        },
        showForm: false
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      userLogOut() {
        this.$store.dispatch('logout')
      },
      openBoard(boardId) {
        this.$router.push({ name: 'board', params: { boardId } })
      }
    }
  };
</script>

<style>
  .boards {
    background-image: url('https://cdn.wallpapersafari.com/27/2/neKuYV.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    font-family: 'Kalam', cursive;
  }

  .container-fluid {
    height: 100vh;
  }

  .brand {
    font-size: 4em;
    font-family: 'Permanent Marker', cursive;
  }

  .brand-mid {
    font-size: 1.3em;
    font-family: 'Permanent Marker', cursive;
  }

  .user-name {
    font-family: 'Kalam', cursive;
    font-weight: bold
  }

  .card-columns {
    @include media-breakpoint-only(lg) {
      column-count: 4;
    }

    @include media-breakpoint-only(xl) {
      column-count: 5;
    }

    @include media-breakpoint-only(sm) {
      column-count: 2;
    }
  }

  .container {
    position: relative;
    width: 85%;
    display: inline-block;
  }

  .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }

  .middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;

  }

  .container:hover .image {
    opacity: 0.5;
  }

  .container:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: rgba(253, 253, 253, 0.363);
    color: rgb(0, 0, 0);
    font-size: 20px;
    background-size: cover;
    /* padding: 16px 32px; */
  }
</style>



/* <router-link :to="{name: 'board', params: {boardId: board._id}}"><b>{{board.title}}</b></router-link> */