<template>
  <!-- <v-container>
    <v-layout>
      <v-flex>
          <v-icon mr-5>menu</v-icon>
          <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </v-flex>
    </v-layout>
  </v-container> -->
  <div class="page-header">
    <div class="container header-container">
      <div class="nav-block">
        <v-icon>menu</v-icon>
        <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </div>

      <div class="user-block">
        <v-icon color--white>menu</v-icon>
        <h2 class="company-name" d-inline-block>AptoTrac</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader "
};
</script>

<style lang="scss">
@import "../css/variables";

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
  }

  .nav-block {
    display: flex;
  }

  .v-icon {
    margin-right: 5px;
    color: $text-primary;
  }
}
</style>
