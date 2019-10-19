<template>
  <div class="container-fluid login login-bg">
    <div class="row login-row">
      <div class="col-4 offset-5 login-col">
        <div class="card">

          <div class="card-img-overlay">
            <h5 class="card-title"><b>Login</b></h5>
            <form v-if="loginForm" @submit.prevent="loginUser" class="text-center">
              <input type="email" v-model="creds.email" placeholder="Email" class="text-center login-inputs">
              <input type="password" v-model="creds.password" placeholder="Password"
                class="text-center mt-1 login-inputs">
              <br>
              <button type="submit" class="btn btn-success mt-1">Login</button>
              <button type="button" @click="demoLogin()" class="btn btn-primary mt-1">Demo</button>
            </form>
            <form v-else @submit.prevent="register">
              <input type="text" v-model="newUser.name" placeholder="Name" class="text-center">
              <input type="email" v-model="newUser.email" placeholder="Email" class="text-center">
              <input type="password" v-model="newUser.password" placeholder="Password" class="text-center">
              <button type="submit" class="btn btn-success mt-1">Create Account</button>
            </form>
            <div class="action mr-2" @click="loginForm = !loginForm">
              <p v-if="loginForm" class="mt-2">No account? Click here to Register</p>
              <p v-else>Already have an account? Click here to Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        demoUser: {
          email: "demoUser@test.com",
          password: "password"
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      demoLogin() {
        this.$store.dispatch("login", this.demoUser)
      }
    }
  };
</script>

<style scoped>
  .action {
    cursor: pointer;
  }

  .container-fluid {
    height: 100vh;
  }

  .login-bg {
    background-image: url("../assets/deskbg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }




  .login-row {
    height: 100vh;
    /* justify-content: center; */
    align-items: center;
  }

  /* .login-btn {
    margin-left: 75px;
    margin-top: 5px;
    margin-right: 5px
  } */

  .login-inputs {
    /* max-width: 100%; */
  }

  .card {
    border: 1px 1px black;
    height: 28vh;
    background-color: rgba(255, 255, 255, 0.5);
    width: 25vh;
    justify-content: center;
  }
</style>