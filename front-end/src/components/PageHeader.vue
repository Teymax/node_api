<template>
  <div class="page-header" :class="!on_home_page ? 'header-colorized' : ''">
    <div class="container header-container">
      <div class="nav-block">
        <v-icon @click="toggle_drawer" color="white" class="icon-nav">menu</v-icon>
        <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </div>

      <div class="user-block">
        <div class="user-photo">
          <img :src="avatar" alt="">
        </div>
        <span class="user-name" d-inline-block>{{ initial_username }}</span>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </template>

          <v-card dark light class="settings_bar pl-3 mt-5" color="primary">
              <v-layout row class="pb-4">
                <v-list-item-avatar :size="60">
                  <img :src="avatar" alt="John" />
                </v-list-item-avatar>
                <v-list-item-title class="settings_bar-user_name">{{ initial_username }}</v-list-item-title>
              </v-layout>
              <div class="settings_bar-par" xs12 @click="show_settings_form = true">
                <v-icon class="settings_bar-par_icon">settings</v-icon>
                <span class="settings_bar-par-text">Settings</span>
              </div>
              <div class="settings_bar-par" xs12 @click="logout">
                <v-icon class="settings_bar-par_icon">logout</v-icon>
                <span class="settings_bar-par-text">Log-out</span>
              </div>
          </v-card>
        </v-menu>
      </div>
    </div>

      <v-dialog max-width="450px" v-model="show_settings_form" transition="dialog-bottom-transition">
        <settings-form @close_settings="show_settings_form = false"></settings-form>
      </v-dialog>

    <v-navigation-drawer class="nav-drawer" v-model="drawer" absolute temporary>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="navigation-item" :class="nav_item_is_active('vehicle') ? 'active-nav-item' : ''">
          <router-link class="nav-link" to="/vehicle-delivery">
            <v-list-item-icon>
              <img src="../assets/home/vehicle-icon.svg" class="tab-icon" alt="Car image" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title color="white">Vehicle Delivery</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item class="navigation-item" :class="nav_item_is_active('inventory') ? 'active-nav-item' : ''">
          <router-link to class="nav-link">
            <v-list-item-icon>
              <img src="../assets/home/inventory-icon.svg" class="tab-icon" alt="Car image" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Inventory Reports</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item class="navigation-item" :class="nav_item_is_active('lot') ? 'active-nav-item' : ''">
          <router-link to class="nav-link">
            <v-list-item-icon>
              <img src="../assets/home/locator-icon.svg" class="tab-icon" alt="Car image" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Lot # Locator</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import actionTypes from "../store/action-types";
import SettingsForm from "./SettingsForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "PageHeader",
  data: () => ({
    show_settings_form: false,
    drawer: false,
  }),
  computed: {
    ...mapState({
      initial_username: state => state.user_data.username,
      user_image: state => state.user_data.user_image
    }),
    avatar () {
      const databaseImage = this.user_image ? `http://localhost:9000/${this.user_image}` : ''
      return databaseImage || `https://ui-avatars.com/api/?name=${this.initial_username}`
    },
    // changes background color of header. It should blue on all pages instead of home page
    on_home_page() {
      if (
        Object(this.$route) === this.$route &&
        typeof this.$route.name === "string"
      ) {
        return this.$route.name.indexOf("Home") !== -1;
      }
    }
  },
  methods: {
    ...mapActions( { logoutAction: actionTypes.LOGOUT } ),
    logout() {
      this.logoutAction();
      this.$router.push("/login");
    },
    toggle_drawer() {
      this.drawer = !this.drawer;
    },
    nav_item_is_active(input) {
      return this.$route.path.toLowerCase().indexOf(input) !== -1
    }
  },
  components: {
    "settings-form": SettingsForm
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

  .user-photo img {
    width: 100%;
    border-radius: 50%;
  }

  .icon-expand:hover {
    cursor: pointer;
  }

  .v-navigation-drawer__content {
    background-color: #182e4c;
  }

  .navigation-item:hover {
    background-color: #4c5b70;
  }

  .theme--light.v-btn:not(.v-btn--flat) {
    background-color: inherit !important;
  }

  .active-nav-item {
    background-color: #4c5b70;
  }

  .nav-drawer {
    .v-list-item__content .v-list-item__title {
      color: white;
      font-size: 0.85rem !important;
    }

    .tab-icon {
      width: 23px;
      margin-left: 10px;
    }

    .v-list-item__icon {
      margin-right: 25px !important;
    }

    .nav-link {
      width: 100%;
      display: flex;
      outline: none;
    }
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
