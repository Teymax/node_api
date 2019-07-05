<template>
  <v-app class="root-container" :class="on_home_page ? 'home-with-image' : ''">
    <page-header v-if="show_header"></page-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import PageHeader from "./components/PageHeader";
import { mapState } from "vuex";
import { isIP } from 'net';

export default {
  name: "App",
  components: {
    PageHeader
  },
  computed: {
    // currently is_logged_in on login returns false, it isn't recalculated reactively
    ...mapState({is_logged_in: state => state.user_data.access_token }),
    // we show background image only on home page
    on_home_page() {
      if(Object(this.$route) === this.$route && typeof this.$route.name === "string") {
        return this.$route.name.indexOf("Home") !== -1
      }
    },
    show_header() {
      // need to refactor in future with mapState
      return this.$route.path.indexOf("login") === -1 && this.is_logged_in
    }
  }
};
</script>
<style lang="scss">
.home-with-image {
  background-image: url("./assets/home-bg.png") !important;
  background-size: cover !important;
}
</style>
