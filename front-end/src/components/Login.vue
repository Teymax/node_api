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
                  <p class="red--text mt-1 mb-3" v-if="server_message_login">{{ server_message_login }}</p>

                  <v-text-field v-model="email1" :rules="email_rules" label="E-mail" required></v-text-field>

                  <v-text-field
                    v-model="password1"
                    :append-icon="password_visible_1 ? 'visibility' : 'visibility_off'"
                    :rules="password_rules_1"
                    :type="password_visible_1 ? 'text' : 'password'"
                    name="login-password"
                    label="Password"
                    @click:append="password_visible_1 = !password_visible_1"
                  ></v-text-field>

                  <v-btn :disabled="!valid" color="success" class="mt-3" @click="login_handler">Login</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid grid-list-sm>
            <v-layout wrap>
              <v-flex fluid>
                <v-form class="register-form form" ref="form" v-model="valid2">
                  <p class="red--text mt-1 mb-3">{{ server_message_registration }}</p>
                                
                  <v-text-field v-model="username" :rules="name_rules" label="User name" required></v-text-field>

                  <v-text-field v-model="email2" :rules="email_rules" label="E-mail" required></v-text-field>

                  <v-text-field
                    v-model="password2"
                    :append-icon="password_visible_2 ? 'visibility' : 'visibility_off'"
                    :rules="password_rules"
                    :type="password_visible_2 ? 'text' : 'password'"
                    name="login-password"
                    label="Password"
                    hint="At least 6 characters"
                    @click:append="password_visible_2 = !password_visible_2"
                  ></v-text-field>

                  <v-text-field
                    v-model="confirm_password"
                    :append-icon="password_visible_3 ? 'visibility' : 'visibility_off'"
                    :rules="confirm_password_rules"
                    :type="password_visible_3 ? 'text' : 'password'"
                    name="login-password-confirm"
                    label="Password confirmation"
                    hint="At least 6 characters"
                    @click:append="password_visible_3 = !password_visible_3"
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid2"
                    color="success"
                    class="mt-3"
                    @click="register_handler"
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
      server_message_login: "",
      server_message_registration: "",
      tab: "null",
      username: "",
      password1: "",
      password2: "",
      password_visible_1: false,
      password_visible_2: false,
      password_visible_3: false,
      confirm_password: "",
      email1: "",
      email2: "",
      valid: true,
      valid2: true,
      name_rules: [
        v => !!v || "Name is required"
      ],
      email_rules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password_rules_1: [
        v => !!v || "Password is required"
      ],
      password_rules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be longer than 6 characters"
      ],
      confirm_password_rules: [
        v => !!v || "Password is required",
        v => (v === this.password2) || "Confrirm password correctly"
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

    async login_handler() {
      let result = await this.login({
        email: this.email1,
        password: this.password1
      }).then(response => {
        if ( Object(response) === response && response.data && response.data.success ) {
          this.$router.push("/");
        } else if( Object(response) === response 
                  && Object(response.response) === response.response 
                  && Object(response.response.data) === response.response.data ) {

          this.server_message_login = response.response.data.error;
        }
      })
    },

    register_handler() {
      this.register({
        username: this.username,
        email: this.email2,
        password: this.password2
      }).then(response => {
        if ( Object(response) === response && response.data && response.data.success ) {
          this.$router.push("/");
        } else if( Object(response) === response && !response.success ) {
          this.server_message_registration = response;
        }
      });
    },

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
