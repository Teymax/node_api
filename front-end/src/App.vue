<template>
  <v-app class="root-container" :class="onHomePage ? 'home-with-image' : ''">
    <page-header></page-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import PageHeader from "./components/PageHeader";

export default {
  name: "App",
  components: {
    PageHeader
  },
  computed: {
    // we show background image only on home page
    onHomePage() {
      return this.$route.name.indexOf("Home") !== -1
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
