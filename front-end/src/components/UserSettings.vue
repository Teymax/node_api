<template>
  <!-- <v-card>
    <v-toolbar>
      <v-toolbar-title>
        Settings form      
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="closeSettings()">close</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>-->
  <v-card>
    <v-toolbar dark flat color="primary">
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeSettings">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-list-item-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-list-item-avatar>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar-title>Change user name</v-toolbar-title>
          <p>John Daniels</p>
          <v-toolbar-title>Change password</v-toolbar-title>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <p>Old password</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field placeholder="Old password" solo></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <p>New password</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field xs6 placeholder="New password" solo></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <p>Confirm</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field placeholder="Confirm" solo></v-text-field>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "settings-form",
  data: () => ({
    settingForm: true
  }),
  methods: {
    closeSettings() {
      this.$emit("closeSettings");
    }
  }
};
</script>

<style>
</style>
