<template>
  <div class="page-header" :class="!onHomePage ? 'header-colorized' : ''">
    <div class="container header-container">
      <div class="nav-block">
        <v-icon color="white" class="icon-nav">menu</v-icon>
        <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </div>

      <div class="user-block">
        <div class="user-photo"></div>

        <span class="user-name" d-inline-block>John Daniels</span>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </template>

          <v-card dark light class="settings_bar pl-3 mt-5" color="primary">
              <v-layout row class="pb-4">
                <v-list-item-avatar :size="60">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-list-item-avatar>
                <v-list-item-title class="settings_bar-user_name">John <br> Leider</v-list-item-title>
              </v-layout>
              <div class="settings_bar-par" xs12 @click="settingForm = true">
                <v-icon class="settings_bar-par_icon">settings</v-icon>
                <span class="settings_bar-par-text">Setting</span>
              </div>
              <div class="settings_bar-par" xs12 @click="logout">
                <v-icon class="settings_bar-par_icon">logout</v-icon>
                <span class="settings_bar-par-text">Log-out</span>
              </div>
          </v-card>
        </v-menu>
      </div>
    </div>
    <v-dialog max-width="450px" v-model="settingForm" transition="dialog-bottom-transition">
      <setting-form @closeSettings="settingForm = false"></setting-form>
    </v-dialog>
  </div>
</template>

<script>
import actionTypes from "../store/action-types";
import SettingForm from "./UserSettings.vue";
import { mapActions } from "vuex";

export default {
  name: "PageHeader",
  data: () => ({
    settingForm: false
  }),
  computed: {
    // changes background color of header. It should blue on all pages instead of home page
    onHomePage() {
      if (
        Object(this.$route) === this.$route &&
        typeof this.$route.name === "string"
      ) {
        return this.$route.name.indexOf("Home") !== -1;
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("access-token");
      this.$router.push("/login");
    }
  },
  components: {
    "setting-form": SettingForm
  }
};
</script>

<style lang="scss">
@import "../css/variables";

.header-colorized {
  background-color: #051d3e;
}

.page-header {
  .company-name {
    display: inline-block;
    color: $text-primary;
  }

  .page-header {
    padding: 0 5px;
  }

  .container {
    display: flex;
  }

  .header-container {
    justify-content: space-between;
    padding: 15px 24px;
  }

  .nav-block {
    display: flex;
    align-items: center;
  }

  .v-icon {
    color: $text-primary;
  }

  .icon-nav {
    margin-right: 5px;
  }

  .user-block {
    display: flex;
    align-items: center;
  }

  .user-name {
    color: $text-primary;
    margin-right: 10px;
  }

  .user-photo {
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 100%;
    margin-right: 10px;
  }

  .icon-expand:hover {
    cursor: pointer;
  }
}
.settings_bar {
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  .settings_bar-user_name {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    color: #FFFFFF;
  }
  .settings_bar-par-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .settings_bar-par {
    padding-bottom: 16px;
  }
  .settings_bar-par_icon {
    padding-right: 10px;
  }
}
</style>
