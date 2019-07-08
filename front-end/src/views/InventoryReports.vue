<template>
  <div class="inventory-reports-page container">
    <div class="page-top-line">
      <h2 class="page-header-text">Inventory Reports</h2>
      <div class="buttons-top-container">
        <button to="/" @click="$router.push('/inventory-reports/sold-in-yard')" class="btn-choose-page btn-default btn-left btn-active" type="button">
          LSY Report
        </button>
        
        <button to="/" @click="$router.push('/inventory-reports/yard-audit')" class="btn-choose-page btn-right btn-default" type="button">
          Yard Audit Report
        </button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>


<script>


export default {
  name: "InventoryReports",
  components: {
  },
};

</script>

<style lang="scss">
@import "../css/variables";
@import "../css/common";

// .inventory-reports-page {
//   .page-top-line {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .card-wrapper {
//     display: flex;
//   }

//   .buttons-top-container {
//     display: flex;
//   }

//   .card-left-side {
//     display: flex;
//     flex-direction: column;
//     width: 65%;
//   }

//   .card-right-side {
//     flex-grow: 1;
//     padding-left: 4rem;

//     .top-line {
//       padding: 1.2rem;
//       display: flex;
//       justify-content: flex-end;
//     }

//     .v-data-iterator {
//       width: 14rem;
//     }

//     .list-bordered {
//       border: 1px solid #EAEAEA;
//     }

//     .item-grey {
//       background-color: #EAEAEA;
//     }

//     .summary-item {
//       font-size: .9rem;

//       .padding-left {
//         padding-left: 2rem;
//       }
//     }
//   }

//   .tables-wrapper {
//     display: flex;
//     flex-direction: column;
//   }

//   .v-text-field .v-label--active {
//     transform: translateY(-26px) scale(0.75) !important;
//   }

//   .v-text-field {
//     margin-top: 0;
//   }

//   .table-select {
//     width: 150px;
//     flex: initial;
//     box-sizing: border-box;
//   }

//   .v-data-table th {
//     text-align: left !important;
//     font-weight: bold;
//     color: #333 !important;
//   }

//   .table-select {
//     .v-input__slot {
//       background-color: $bg-third;
//       padding: 2px 10px;
//       height: 38px;
//       border-radius: 5px 0 0 5px;
//       border: 1px solid $border-primary;
//     }

//     .v-input__slot::before {
//       display: none;
//     }
//   }

//   .table-search {
//     flex: inherit;
//   }

//   .table-footer {
//     display: flex;
//     justify-content: flex-end;
//   }

//   .footer-select {
//     width: 100px;
//   }

//   .table-search {
//     .v-input__slot {
//       padding: 2px 10px;
//       border-radius: 0 5px 5px 0;
//       border: 1px solid $border-primary;
//       border-left: none;
//     }

//     .v-input__slot::before {
//       display: none;
//     }
//   }

//   .date-text-field {
//     position: relative;
//     flex: initial;
//     width: 150px;
//     margin-right: 1.5rem;
//   }

//   .date-text-field {
//     .v-input__slot {
//       padding: 2px 10px;
//       border-radius: 5px;
//       border: 1px solid $border-primary;
//     }

//     .v-input__slot::before {
//       display: none;
//     }

//     .v-input__prepend-outer {
//       position: absolute;
//       top: 15px;
//       right: 0;
//     }

//     .mdi-close {
//       margin-right: 47px;
//       z-index: 1;
//     }
//   }

//   .table-footer {
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     color: rgba(0, 0, 0, 0.87);

//     .mr {
//       margin-right: 2.5rem;
//     }

//     .rows_select {
//       max-width: 50px;
//     }
//   }
// }
</style>