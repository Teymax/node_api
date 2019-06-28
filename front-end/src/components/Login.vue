<template>
  <div class="login-page container">
    <v-card>
      <v-tabs background-color="white" color="deep-purple accent-4">
        <div class="tabs-container">
          <v-tab>Login</v-tab>
          <v-tab>Register</v-tab>
        </div>

        <v-tab-item>
          <v-container fluid grid-list-sm>
            <v-layout wrap>
              <v-flex fluid>
                <v-form class="login-form form" ref="form" v-model="valid">
                  <v-text-field v-model="email1" :rules="emailRules" label="E-mail" required></v-text-field>

                  <v-text-field
                    v-model="password1"
                    :append-icon="passwordVisible1 ? 'visibility' : 'visibility_off'"
                    :rules="passwordRules"
                    :type="passwordVisible1 ? 'text' : 'password'"
                    name="login-password"
                    label="Password"
                    hint="At least 6 characters"
                    @click:append="passwordVisible1 = !passwordVisible1"
                  ></v-text-field>

                  <v-btn :disabled="!valid" color="success" class="mt-3" @click="loginHandler">Login</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid grid-list-sm>
            <v-layout wrap>
              <v-flex fluid>
                <v-form class="login-form form" ref="form" v-model="valid2">
                  <v-text-field v-model="username" :rules="nameRules" label="User name" required></v-text-field>

                  <v-text-field v-model="email2" :rules="emailRules" label="E-mail" required></v-text-field>

                  <v-text-field
                    v-model="password2"
                    :append-icon="passwordVisible2 ? 'visibility' : 'visibility_off'"
                    :rules="passwordRules"
                    :type="passwordVisible2 ? 'text' : 'password'"
                    name="login-password"
                    label="Password"
                    hint="At least 6 characters"
                    @click:append="passwordVisible2 = !passwordVisible2"
                  ></v-text-field>

                  <v-text-field
                    v-model="confirmPassword"
                    :append-icon="passwordVisible3 ? 'visibility' : 'visibility_off'"
                    :rules="confirmPasswordRules"
                    :type="passwordVisible3 ? 'text' : 'password'"
                    name="login-password-confirm"
                    label="Password"
                    hint="At least 6 characters"
                    @click:append="passwordVisible3 = !passwordVisible3"
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid2"
                    color="success"
                    class="mt-3"
                    @click="registerHandler"
                  >Register</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import actionTypes from "../store/action-types";

export default {
  data() {
    return {
      tab: "null",
      username: "",
      password1: "",
      password2: "",
      passwordVisible1: false,
      passwordVisible2: false,
      passwordVisible3: false,
      confirmPassword: "",
      email1: "",
      email2: "",
      valid: true,
      valid2: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be longer than 6 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Password is required",
        v => (v && v === this.password2) || "Confrirm password correctly"
      ],
      lazy: false
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      register: actionTypes.REGISTER,
      login: actionTypes.LOGIN
    }),

    // loginHandler() {
    //   // console.log(this.validate());
    //   this.login({
    //     email: this.email1,
    //     password: this.password1
    //   }).then(response => {
    //     console.warn(response);
    //     if (
    //       Object(response) === response &&
    //       response.data &&
    //       response.data.success
    //     ) {
    //       // this.$router.push("/");
    //     }
    //   });

    async loginHandler() {
      // console.log(this.validate());
      let result = await this.login({
        email: this.email1,
        password: this.password1
      }).then(response => {
        console.warn(response);
        if (
          Object(response) === response &&
          response.data &&
          response.data.success
        ) {
          this.$router.push("/");
        }
      })
      
    },

    registerHandler() {
      this.register({
        username: this.username,
        email: this.email2,
        password: this.password2
      }).then(response => {
        
      });

    },

    // pasted

    validate() {
      return this.$refs.form.validate();
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
  justify-content: center;
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

  .tabs-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  // .login-label {
  //   margin-bottom: 1rem;
  // }

  // .buttons-container {
  //   display: flex;
  //   justify-content: space-between;
  // }

  // .login-btn {
  //   // flex: 1 1 0;

  // }

  // .login-btn__margin-right {
  //   margin-right: 1rem;
  // }
}
</style>
