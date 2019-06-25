<template>
  <v-app class="root-container">
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
  data() {
    return {
      //
    };
  }
};
</script>
<style lang="scss">
.application--wrap {
  background: url("./assets/home-bg.png");
  background-size: cover;
}
</style>
