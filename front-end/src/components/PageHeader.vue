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

          <v-card light class="settings_bar pl-3" color="primary">
            <v-layout row>
              <v-flex xs12>
                <v-list-item-avatar :size="60">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-list-item-avatar>
                <v-list-item-title>John Leider</v-list-item-title>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-icon class>settings</v-icon>
                <span @click="settingForm = true">Setting</span>
              </v-flex>
              <v-flex xs12 @click="logout">
                <v-icon>logout</v-icon>
                <span>Log-out</span>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn text @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" text @click="menu = false">Save</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </div>
    <v-dialog max-width="480px" v-model="settingForm" transition="dialog-bottom-transition">
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
  background: rgba(5, 29, 62, 0.92);
}
</style>
