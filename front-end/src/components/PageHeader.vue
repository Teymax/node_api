<template>
  <div class="page-header" :class="!onHomePage ? 'header-colorized' : ''">
    <div class="container header-container">
      <div class="nav-block">
        <v-icon color="white" class="icon-nav">menu</v-icon>
        <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </div>

      <div class="user-block">
        <div class="user-photo">
          
        </div>

        <span class="user-name" d-inline-block>John Daniels</span>

        <v-icon @click="logout" color="white" class="icon-expand" primary>expand_more</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import actionTypes from "../store/action-types";
import { mapActions } from "vuex";

export default {
  name: "PageHeader",
  computed: {
    // changes background color of header. It should blue on all pages instead of home page
    onHomePage() {
      if(Object(this.$route) === this.$route && typeof this.$route.name === "string") {
        return this.$route.name.indexOf("Home") !== -1
      }
    }
  },
  methods: {
    // ...mapActions({ logoutAction: actionTypes.LOGOUT }),   

    logout() {
      // console.warn(this.logoutAction);
      localStorage.removeItem("access-token");
      this.$router.push("/login");

      // this.logoutAction.then(response => {
      //   this.$router.push("/login");
      // })
    }
  }
};
</script>

<style lang="scss">
@import "../css/variables";

.header-colorized {
  background-color: #051D3E;
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
</style>
