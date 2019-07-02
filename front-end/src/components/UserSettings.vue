<template>
  <v-form>
    <v-card>
      <v-toolbar class="modal_setting-toolbar px-3" dark flat color="primary">
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeSettings">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card class="modal_setting-wrap">
        <v-toolbar-title class="modal_setting-title pb-2">Change avatar</v-toolbar-title>
        <v-list-item-avatar :size="75">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-list-item-avatar>
        <v-flex xs12>
          <v-toolbar-title class="modal_setting-title pb-3">Change user name</v-toolbar-title>
          <span class="modal_setting-edit">John Daniels</span>
          <v-icon class="pl-2">edit</v-icon>
          <v-toolbar-title class="modal_setting-title pt-4 pb-4">Change password</v-toolbar-title>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm4 class="pt-3 pb-xs3">
            <p class="change_password_lable">Old password</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field
              v-model="password1"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              solo
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pt-3">
            <p class="change_password_lable">New password</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
              solo
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pt-3">
            <p class="change_password_lable">Confirm</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field
              v-model="password3"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
              solo
            ></v-text-field>
          </v-flex>
          <v-btn color="primary ml-auto" flat>Save</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "settings-form",
  data: () => ({
    // settingForm: false,
    show1: false,
    show2: false,
    show3: false,
    password: "Password",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  methods: {
    closeSettings() {
      this.$emit("closeSettings");
    }
  }
};
</script>

<style lang="scss">
.modal_setting-wrap {
  padding: 0 32px;
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
</style>
