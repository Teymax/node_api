<template>
  <v-form class="user-settings" v-model="valid">
    <v-card>
      <v-toolbar class="modal_setting-toolbar px-3" dark flat color="primary">
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close_settings">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="modal_setting-wrap">
        <v-toolbar-title class="modal_setting-title pb-2">Change avatar</v-toolbar-title>

        <v-flex xs12 class="avatar-container">
          <v-layout>
            <v-list-item-avatar :size="75">
              <img :src="avatar" alt="John" />
            </v-list-item-avatar>

            <v-layout  row class="file-input-container text-xs-center text-sm-center text-md-center text-lg-center">
            <!-- <img :src="image_url" height="150" v-if="image_url"/> -->
                <div class="btn-container">
                  <v-text-field label="Select Image" readonly clearable class="file-input" v-model='image_name'></v-text-field>

                  <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="on_file_picked"
                  >

                  <v-btn v-if="image_name" @click="saveImage" class="file-btn" small color="primary ml-auto" text>Save avatar</v-btn>
                  <v-btn v-else @click='pick_file' class="file-btn" small color="primary ml-auto" text>Choose File</v-btn>
                </div>

            </v-layout>
          </v-layout>


          <!-- <v-dialog class="file-dialog" v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Hello World!</v-card-title>
              <v-card-text>Image Upload Script in VUE JS
                <hr>Yubaraj Shrestha
                <br>http://yubarajshrestha.com.np/</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary-btn" color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->

        </v-flex>


        <v-flex xs12>
          <v-toolbar-title class="modal_setting-title pb-3">Change user name</v-toolbar-title>

          <v-layout row>
            <v-text-field
              ref="name_input"
              class="modal_setting-edit"
              v-model="username"
              :append-outer-icon="initial_username === new_username ? undefined : 'edit'"
              @click:append-outer="saveUsername"
            ></v-text-field>
<!--            <v-icon @click="focus_name_input" class="edit-icon pl-5">edit</v-icon>-->
          </v-layout>

          <v-toolbar-title class="modal_setting-title pt-4 pb-4">Change password</v-toolbar-title>
        </v-flex>

        <v-layout row wrap>
          <v-flex xs12 sm4 class="py-3 pl-2">
            <p class="change_password_lable">Previous</p>
          </v-flex>

          <v-flex xs12 sm8>
            <v-text-field
              v-model="password1"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              solo
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4 class="py-3 pl-2">
            <p class="change_password_lable">New</p>
          </v-flex>

          <v-flex xs12 sm8>
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="new_password_rules"
              :type="show2 ? 'text' : 'password'"
              name="password-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
              solo
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4 class="py-3 pl-2">
            <p class="change_password_lable">Confirm</p>
          </v-flex>

          <v-flex xs12 sm8>
            <v-text-field
              v-model="confirm_password"
              :append-icon="show3 ? 'visibility' : 'visibility_off'"
              :rules="confirm_password_rules"
              :type="show3 ? 'text' : 'password'"
              name="password-2"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show3 = !show3"
              solo
            ></v-text-field>
          </v-flex>

          <v-layout justify-center class="">
            <p class="red--text mt-1 mb-3" v-if="server_response">{{ server_response }}</p>
          </v-layout>

          <div class="save-btn-container">
            <v-btn @click="savePassword" :disabled="!valid" class="primary-btn" color="primary ml-auto" text>Save</v-btn>
          </div>
        </v-layout>
      </v-card>

    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import actionTypes from "../store/action-types";

export default {
  name: "settings-form",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      password1: "",
      password2: "",
      confirm_password: "",
      valid: false,
      rules: {
        required: value => !!value || "Password is required",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      new_password_rules: [
        // v => (!!v && this.password1) || "Password is required"
      ],
      confirm_password_rules: [
        // v => !!v || "Confirm password",
        v => (v === this.password2) || "Confrirm password correctly",
      ],
      new_username: "",
      dialog: false,
      image_name: "",
      image_file: "",
      image_url: "",
      server_response: ""
    }
  },
  methods: {
    ...mapActions({ save_user_settings: actionTypes.SAVE_USER_SETTINGS }),

    close_settings() {
      this.$emit("close_settings");
    },
    saveImage () {
      this.save_settings([{
        name: 'user_image',
        value: this.image_file
      }])
    },
    saveUsername () {
      this.save_settings([{
        name: 'username',
        value: this.new_username
      }])
    },
    savePassword () {
      this.save_settings([
        {
          name: 'old_password',
          value: this.password1
        },
        {
          name: 'new_password',
          value: this.confirm_password
        }
      ])
    },
    save_settings(arrayOfData) {
      let payload = new FormData()
      payload.append('email', this.email)
      arrayOfData.forEach(item => {
        payload.append(item.name, item.value);
      })
      this.save_user_settings(payload).then(response => {
        if (response.success) {
          this.server_response = "Successfully changed";
          if (arrayOfData.includes('user_image')) {
            this.image_name = ''
            this.image_file= ''
            this.image_url = ''
          } else if (arrayOfData.includes('new_password')) {
            this.password1 = ''
            this.password2 = ''
            this.confirm_password = ''
          } else {
            this.new_username = this.initial_username
          }
        }
      })
      .catch(response => {
        // this.server_response
        if(Object(response) === response && Object(response.data) === response.data) {
          this.server_response = response.response.data.error;
        } else if(Object(response) === response) {
          this.server_response = response;
        }
      })


      // this.$emit("close_settings");
    },

    focus_name_input() {
      this.$refs.name_input.focus();
    },

    on_file_picked (e) {
      const files = e.target.files;

			if(files[0] !== undefined) {
        this.image_name = files[0].name;

				if(this.image_name.lastIndexOf('.') <= 0) {
					return
        }

        const fr = new FileReader();
        fr.readAsDataURL(files[0]);

				fr.addEventListener('load', () => {
					this.image_url = fr.result
					this.image_file = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.image_name = ""
				this.image_file = ""
				this.image_url = ""
			}
    },

    pick_file() {
      this.$refs.image.click();
    }
  },
  computed: {
    ...mapState({
      initial_username: state => state.user_data.username,
      email: state => state.user_data.email,
      user_image: state => state.user_data.user_image
    }),
    avatar () {
      const dbImage = this.user_image ? `http://localhost:9000/${this.user_image}` : null
      return this.image_url || dbImage || `https://ui-avatars.com/api/?name=${this.initial_username}`
    },
    username: {
      get() {
        return this.new_username.length > 0 ? this.new_username : this.initial_username
      },
      set (value) {
        this.new_username = value;
      }
    }
  },
  created () {
    this.new_username = this.initial_username
  }
};
</script>

<style lang="scss">
@import "../css/variables";

.user-settings {
  .modal_setting-wrap {
    padding: 30px 32px;
  }
  .modal_setting-title {
    font-size: 24px;
    color: #333333;
  }
  .modal_setting-edit {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    color: #051d3e;
  }
  .change_password_lable {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #051d3e;
  }

  .edit-icon:hover {
    cursor: pointer;
  }

  .file-input-container {
    align-items: center;
  }

  .file-input {

   .v-label--active {
      transform: translateY(-24px) scale(0.75) !important;
    }

    .v-input__slot {
      padding: 2px 10px;
      border-radius: 5px 0 0 5px;
      border: 1px solid $border-primary;
      border-right: none;
    }

    .v-input__slot::before {
      display: none;
    }
  }

  .primary-btn {
    background-color: #1976d2 !important;
    color: #fff !important;
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .v-btn__content {
    text-transform: none !important;
    font-size: .9rem !important;
  }

  .btn-container {
    display: flex;
    justify-content: center;


    .file-btn {
      width: 130px;
      flex: initial;
      box-sizing: border-box;
      background-color: #1976d2 !important;
      color: #fff !important;
      margin-top: 16px;
      height: 38px !important;

      .v-input__slot {
        background-color: $bg-third;
        padding: 2px 10px;
        height: 38px;
        border-radius: 5px 0 0 5px;
        border: 1px solid $border-primary;
      }

      .v-input__slot::before {
        display: none;
      }
    }
  }

  .save-btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }
}

</style>
