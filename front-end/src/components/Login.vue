<template>
  <div class="login-page container">
    <div class="tabs">
      <button @click="tab = 'login'" type="button" class="default-button mr-3 tab">Login</button>
      <button @click="tab = 'register'" type="button" class="default-button tab">Register</button>
    </div>

    <form class="login-form form" v-if="tab === 'login'">
      <label for="username-email" class="email-label login-label">
        <input
          v-model="email"
          id="username-email"
          class="default-input"
          placeholder="Email"
          type="email"
        >
      </label>

      <label for="username-password" class="password-label login-label">
        <input
          v-model="password"
          id="username-password"
          class="default-input"
          placeholder="Password"
          type="password"
        >
      </label>

      <!-- <div class="buttons-container"> -->

      <button @click="loginHandler" class="default-button login-btn" type="button">Login</button>

      <!-- <button class="default-button login-btn login-btn__margin-right" type="button">Login</button>

      <button @click="registerHandler" class="default-button login-btn" type="button">Register</button>-->

      <!-- </div> -->
    </form>

    <form class="register-form form" v-if="tab === 'register'">
      <label for="username-input-2" class="username-label login-label">
        <input
          v-model="username"
          id="username-input-2"
          class="default-input"
          placeholder="Username"
          type="text"
        >
      </label>

      <label for="username-email-2" class="email-label login-label">
        <input
          v-model="email"
          id="username-email-2"
          class="default-input"
          placeholder="Email"
          type="email"
        >
      </label>

      <label for="username-password-2" class="password-label login-label">
        <input
          v-model="password"
          id="username-password-2"
          class="default-input"
          placeholder="Password"
          type="password"
        >
      </label>

      <label for="confirm-password-2" class="password-label login-label">
        <input
          v-model="confirmPassword"
          id="confirm-password-2"
          class="default-input"
          placeholder="Confirm password"
          type="password"
        >
      </label>

      <button class="default-button" type="button" @click="registerHandler">Register</button>
    </form>

    <div class="messages-container mt-2">
      <p v-for="(item, index) in validation" :key="index" class="error-text">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import actionTypes from "../store/action-types";

export default {
  data() {
    return {
      tab: "login",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      validation: []
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      register: actionTypes.REGISTER,
      login: actionTypes.LOGIN
    }),

    validate() {
      this.validation = [];

      if (this.password !== this.confirmPassword) {
        this.validation.push("confirm password");
      }

      return this.validation.length > 0 ? true : false;
    },

    loginHandler() {
      // console.log(this.validate());
        this.login({
          email: this.email,
          password: this.password
        })
        .then(response => {
          if(response.data && response.data.success) {
            this.$router.push("/");
          }
        })
        
    },

    registerHandler() {
      // console.log(this.validate());
      // if (this.validate()) {
        this.register({
          username: this.username,
          email: this.email,
          password: this.password
        });
      // }
    }
  }
};
</script>

<style lang="scss">
@import "../css/variables";

.login-page {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-page {
  .input-name {
  }

  .tabs {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    // width: 100%;
  }

  .tab {
    display: flex;
    padding: 5px 25px;
    // flex-grow: 1;
    // flex: 1 1 0;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .login-label {
    margin-bottom: 1rem;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    // flex: 1 1 0;
  }

  .login-btn__margin-right {
    margin-right: 1rem;
  }
}
</style>
