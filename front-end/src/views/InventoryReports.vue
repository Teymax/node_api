<template>
  <div class="inventory-reports-page container">
    <div class="page-top-line">
      <h2 class="page-header-text">Inventory Reports</h2>
      <div class="buttons-top-container">
        <button></button>
      </div>
    </div>

    <v-card class="card-wrapper">
      <div class="card-left-side">
        <v-card-title>
          <p>
            <h2 class="table-name mr">Lot Sold in Yard</h2>
            <!-- <span class="title-date">{{ moment(new Date()).format("mm/dd/yyyy") }}</span> -->
          </p>
        </v-card-title>

  <!-- :footer-props="{ 'rows-per-page-items': [50, 100, 150] }" -->
  <!-- :hide-default-footer="true" -->
  <!-- :items-per-page="50" -->

          <div class="tables-wrapper">
            <v-data-table
            :headers="headers_table"
            :items="activities_computed"
            :search="search_on_front"
            :hide-default-footer="true"
            class="elevation-1"
            ref="table"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-xs-center photo-cell">
                  <img alt="Car photo" @click="call_gallery(item.lot_number)" src="https://picsum.photos/80/45?random"></v-btn>
                  </td>
                  <td class="text-xs-left">{{ item.date }}</td>
                  <td class="text-xs-left">{{ item.time }}</td>
                  <td class="text-xs-left">{{ item.location }}</td>
                  <td class="text-xs-left">{{ item.lot_number }}</td>
                  <td class="text-xs-left">{{ item.license_plate }}</td>
                  <td class="text-xs-left">{{ item.type }}</td>
                  <td class="text-xs-left">{{ item.color }}</td>
                  <td class="text-xs-left">{{ item.make }}</td>
                  <td class="text-xs-left">{{ item.model }}</td>
                  <td class="text-xs-left">{{ item.year }}</td>
                  <td class="text-xs-left">{{ item.towing_company }}</td>
                </tr>
              </template>
            
            <template v-slot:footer="{ table_footer_props }">
              <div class="table-footer">
                <span class="rows-amount-label mr">Rows per page:</span>

                <div class="rows_select mr">
                  <v-select v-model="rows_amount" :items="items_per_page"></v-select>
                </div>
                <!-- <span class="mr rows-amount-label">{{ page_info }}</span> -->
                
                <v-btn @click="change_active_page(-1)" icon class="v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-btn--text theme--light v-size--default">
                  <v-icon class="">chevron_left</v-icon>
                </v-btn>
                
                <span class="rows-amount-label">{{ page_info }}</span>
                
                <v-btn @click="change_active_page(1)" icon class="v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-btn--text theme--light v-size--default">
                  <v-icon class="">chevron_right</v-icon>
                </v-btn>
              </div>
            </template>

            </v-data-table>
        </div>
      </div>

      <div class="card-right-side">
        <div class="top-line">
          <v-icon class="mr-3">launch</v-icon>
          <v-icon>print</v-icon>
        </div>

        <h3>SUMMARY</h3>

        <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        hide-default-footer
        >
          <!-- <template v-slot:header>
            <v-toolbar
              class="mb-2"
              color="indigo darken-5"
              dark
              flat
            >
              <v-toolbar-title>This is a header</v-toolbar-title>
            </v-toolbar>
          </template> -->
  
          <template v-slot:default="props">
            <v-layout row wrap>
              <v-flex v-for="item in props.items" :key="item.name" xs12>
                  <v-list dense>
                    <div class="list-bordered">
                      <v-list-item>
                        <v-list-item-content>Total Fees</v-list-item-content>
                        <v-list-item-content class="justify-end">${{ fees.group_1.total_fees }}</v-list-item-content>
                      </v-list-item>
      
                      <v-list-item class="item-grey font-weight-bold">
                        <v-list-item-content>Lot #Sold</v-list-item-content>
                        <v-list-item-content class="justify-end">{{ fees.group_1.lot_sold }}</v-list-item-content>
                      </v-list-item>
                    </div>

                    <v-list-item class="summary-item">
                      <v-list-item-content class="padding-left">% of Yard</v-list-item-content>
                      <v-list-item-content class="justify-end">{{ fees.group_1.of_yard }}%</v-list-item-content>
                    </v-list-item>
                  </v-list>     

                  <v-list dense>
                    <div class="list-bordered">
                      <v-list-item>
                        <v-list-item-content>Total Fees</v-list-item-content>
                        <v-list-item-content class="justify-end">${{ fees.group_2.not_in_yard }}</v-list-item-content>
                      </v-list-item>
      
                      <v-list-item class="item-grey font-weight-bold">
                        <v-list-item-content>Lot # Sold</v-list-item-content>
                        <v-list-item-content class="justify-end">{{ fees.group_2.days_in_yard }}</v-list-item-content>
                      </v-list-item>
                    </div>

                    <v-list-item class="summary-item">
                      <v-list-item-content class="padding-left">% of Yard</v-list-item-content>
                      <v-list-item-content class="justify-end">{{ fees.group_2.of_yard }}%</v-list-item-content>
                    </v-list-item>

                    <v-list-item class="summary-item">
                      <v-list-item-content class="padding-left">% Lot Sold</v-list-item-content>
                      <v-list-item-content class="justify-end">{{ fees.group_2.lot_sold }}%</v-list-item-content>
                    </v-list-item>
                  </v-list>                 
              </v-flex>
            </v-layout>
          </template>
    
          <!-- <template v-slot:footer>
            <v-toolbar
              class="mt-2"
              color="indigo"
              dark
              flat
            >
            <v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
          </v-toolbar>
        </template> -->
      </v-data-iterator>

        <!-- <div class="fees-block">
          <div class="fees-table">
            <div class="fees-header fees__row">
              <span>Total fees</span>
              <span>$0</span>
            </div>
            <div class="fees__row">
              <span>Lot # Sold</span>
              <span>89</span>
            </div>
          </div>

          <div class="fees-footer">
            <div class="fees-footer__row">
              <span>%> of Yard</span>
              <span>14.1%</span>
            </div>
          </div>
        </div>

        <div class="fees-block">
          <div class="fees-table">
            <div class="fees-header fees__row">
              <span>Total fees</span>
              <span>$0</span>
            </div>
            <div class="fees__row">
              <span>Lot # Sold</span>
              <span>89</span>
            </div>
          </div>

          <div class="fees-footer">
            <div class="fees-footer__row">
              <span>%> of Yard</span>
              <span>14.1%</span>
            </div>
          </div>
        </div> -->

      </div>
    </v-card>

    <gallery-card :show_gallery="show_gallery" :lot_id="lot_id" @close_gallery="show_gallery = !show_gallery"></gallery-card>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import actionTypes from "../store/action-types";
import { setTimeout, clearTimeout } from "timers";
import moment from 'moment'
import Gallery from '../components/Gallery'

export default {
  name: "InventoryReports",
  components: {
    'gallery-card': Gallery
  },
  data() {
    return {
      itemsPerPage: 4,
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        }
      ],
      fees: {
        group_1: {
          total_fees: 0,
          lot_sold: 89,
          of_yard: 14
        },
        group_2: {
          not_in_yard: 10,
          days_in_yard: 216,
          of_yard: 1.6,
          lot_sold: 11.2
        }
      },
      date: "",
      start_menu: false,
      end_menu: false,
      search_on_front: "",
      search_field: "LOT#",
      search_phraze: "",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      dates: [],
      datesGetter: [],
      items_per_page: [50, 100, 150],
      rows_amount: 50,
      active_page: 1,
      table_footer_props: {
      },
      headers_table: [
        {
          text: "",
          value: "img",
          align: "center"
        },
        {
          text: "LOT#",
          value: "lot_number",
          align: "center"
        },
        {
          text: "WEBSITE",
          value: "website",
          align: "center"
        },
        {
          text: "YARD",
          value: "yard",
          align: "center"
        },
        {
          text: "DATE SOLD",
          value: "date_sold",
          align: "center"
        },
        {
          text: "DAYS IN YARD",
          value: "days_in_yard",
          align: "center"
        },
        {
          text: "HOLDING FEES",
          value: "holding_fees",
          align: "center"
        },

      ],
      api_timeout: null,
      activities: [],
      activities_computed: [],
      show_gallery: false,
      lot_id: ""
    };
  },
  methods: {
    ...mapActions({
      /**
       * function get_vehicle_data
       * optional params { start_date, end_date, search_field, search_param }
      */

      get_vehicle_data: actionTypes.GET_VEHICLE_DATA
    }),

    format_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year.slice(2, 4)}`;
    },

    format_date_for_api(date) {
      return(
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2)
      )
    },

    get_vehicle_data_handler(response) {
      // validate response scheme

      if (Object(response) === response && Object(response.data) === response.data) {
        let vehicles = response.data;
        let vehicles_to_render = [];

        console.table("vehicles\n", vehicles);


        vehicles.forEach(item => {
          const history = item.history[0];

          if(history !== undefined) {
            // we get data from api not in US format, so we had to format it
            item.date = this.format_date(history.date.slice(0, history.date.indexOf("T")));
            item.location = history.location;
            item.towing_company = history.towing_company;

            vehicles_to_render.push(item);
          }
        });

        this.activities = vehicles_to_render;
      }
    },

    search_vehicles() {
      let computed_search_field;

      // get correct field names for request from v-select UI
      this.headers.forEach(item => {
        if(item.text === this.search_field) {
          computed_search_field = item.value;
        }
      })

      let params = {
        start_date: this.start_date,
        end_date: this.end_date,
        search_field: computed_search_field,
        search_param: this.search_phraze
      };

      // debounce api call
      if(this.api_timeout) {
        clearTimeout(this.api_timeout);
      }

      this.api_timeout = setTimeout(() => {
        this.get_vehicle_data(params)
          .then(response => {
            this.get_vehicle_data_handler(response);
          })
          .catch(err => {
            console.error(err);
          });
      }, 500)

    },

    clear_search_phraze() {
      this.search_phraze = "";
    },

    save_end_date() {
      this.$refs.end_date_menu.save(this.end_date);
      this.search_vehicles();
      this.end_menu = false;
    },

    save_start_date() {
      // if (this.start_date > this.end_date) {
      //   this.start_date = this.end_date;
      // }

      this.$refs.start_date_menu.save(this.start_date);
      this.$refs.end_date_menu.save(this.end_date);

      this.end_date = this.start_date;

      this.search_vehicles();
      this.start_menu = false;
    },

    get_default_data () {
      this.start_date = this.end_date = moment().format('YYYY-MM-DD');
      this.search_phraze = "";

      this.search_vehicles();

      this.search_field = "LOT#";
    },

    call_gallery (id) {
      this.show_gallery = true
      this.lot_id = id
    },

    change_items_for_render() {
      this.activities_computed = this.activities.slice((this.active_page - 1) * this.rows_amount, this.active_page * this.rows_amount);
    },

    change_active_page(value) {
      let new_page = this.active_page + value;
      let pages_amount = Math.ceil(this.activities.length / this.rows_amount);

      if(new_page >= 1 && new_page <= pages_amount) {
        this.active_page = new_page;
        this.change_items_for_render();
      }
    }
  },

  computed: {
    select_data() {
      // here we get field names for rendering in v-select component
      return this.headers.map(item => item.text).filter(item => item.toLowerCase() !== "date");
    },

    page_info() {
      // return pagination info

      let pages_amount = Math.ceil(this.activities.length / this.rows_amount);
      let active_page_computed = pages_amount === 0 ? 0 : this.active_page;

      return `${active_page_computed} of ${pages_amount}`;
    }
  },

  watch: {
    // if activities array is changed we run the following func
    activities() {
      this.change_items_for_render();
    },

    rows_amount() {
      this.active_page = 1;
      this.change_items_for_render();
    }
  },

  created() {
    this.get_default_data();
    window.vm = this;
  }
};

</script>


<style lang="scss">
@import "../css/variables";

.inventory-reports-page {
  .page-top-line {
    display: flex;
    justify-content: space-between;
  }

  .card-wrapper {
    display: flex;
  }

  .card-left-side {
    display: flex;
    flex-direction: column;
    width: 65%;
  }

  .card-right-side {
    flex-grow: 1;
    padding-left: 4rem;

    .top-line {
      padding: 1.2rem;
      display: flex;
      justify-content: flex-end;
    }

    .v-data-iterator {
      width: 14rem;
    }

    .list-bordered {
      border: 1px solid #EAEAEA;
    }

    .item-grey {
      background-color: #EAEAEA;
    }

    .summary-item {
      font-size: .9rem;

      .padding-left {
        padding-left: 2rem;
      }
    }
  }

  .tables-wrapper {
    display: flex;
    flex-direction: column;
  }



  .v-text-field .v-label--active {
    transform: translateY(-26px) scale(0.75) !important;
  }

  .v-text-field {
    margin-top: 0;
  }

  .table-select {
    width: 150px;
    flex: initial;
    box-sizing: border-box;
  }

  .v-data-table th {
    text-align: left !important;
    font-weight: bold;
    color: #333 !important;
  }

  .table-select {
    .v-input__slot {
      background-color: $bg-third;
      padding: 2px 10px;
      height: 38px;
      border-radius: 5px 0 0 5px;
      border: 1px solid $border-primary;
    }

    .v-input__slot::before {
      display: none;
    }
  }

  .table-search {
    flex: inherit;
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
  }

  .footer-select {
    width: 100px;
  }

  .table-search {
    .v-input__slot {
      padding: 2px 10px;
      border-radius: 0 5px 5px 0;
      border: 1px solid $border-primary;
      border-left: none;
    }

    .v-input__slot::before {
      display: none;
    }
  }

  .date-text-field {
    position: relative;
    flex: initial;
    width: 150px;
    margin-right: 1.5rem;
  }

  .date-text-field {
    .v-input__slot {
      padding: 2px 10px;
      border-radius: 5px;
      border: 1px solid $border-primary;
    }

    .v-input__slot::before {
      display: none;
    }

    .v-input__prepend-outer {
      position: absolute;
      top: 15px;
      right: 0;
    }

    .mdi-close {
      margin-right: 47px;
      z-index: 1;
    }
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: rgba(0, 0, 0, 0.87);

    .mr {
      margin-right: 3rem;
    }

    .rows_select {
      max-width: 50px;
    }
  }
}
</style>