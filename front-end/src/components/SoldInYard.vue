<template>
  <div class="inventory-reports-page sold-in-yard container">
    <div class="page-top-line">
      <h2 class="page-header-text">Inventory Reports</h2>
      <div class="buttons-top-container">
        <button to="/" @click="$router.push('')" class="btn-choose-page btn-default btn-left btn-active" type="button">
          LSY Report
        </button>
        
        <button to="/" @click="$router.push('/yard-audit')" class="btn-choose-page btn-right btn-default" type="button">
          Yard Audit Report
        </button>
      </div>
    </div>

    <v-card class="card-wrapper">
      <div class="card-left-side">
        
        <v-card-title>
            <h2 class="table-name mr">Lot Sold in Yard</h2>
        </v-card-title>

          <div class="tables-wrapper">

            <v-list>
              <v-list-group class="" v-for="(table, name, index) in tables" :key="name" v-model="table.active">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="table.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                  <v-list-item class="list-wrapper">
                    <v-list-item-content>

                      <v-data-table
                        :headers="headers_table"
                        :items="table.activities_computed_1"
                        :hide-default-footer="true"
                        class="elevation-1"
                        ref="table"
                      >
                        <template v-slot:item="{ item }">
                          <tr>
                            <td class="text-xs-center photo-cell">
                              <img alt="Car photo" @click="call_gallery(item.content.lot_number)" src="https://picsum.photos/80/45?random"></v-btn>
                            </td>
                            <td class="text-xs-left">{{ item.content.img }}</td>
                            <td class="text-xs-left">{{ item.content.lot_number }}</td>
                            <td class="text-xs-left">{{ item.content.website }}</td>
                            <td class="text-xs-left">{{ item.content.yard }}</td>
                            <td class="text-xs-left">{{ item.content.date_sold }}</td>
                            <td class="text-xs-left">{{ item.content.days_in_yard }}</td>
                            <td class="text-xs-left">{{ item.content.holding_fees }}</td>
                            <v-icon>comment</v-icon>
                          </tr>
                        </template>
                      
                        <template v-slot:footer="{ table_footer_props }">
                          <div class="table-footer">
                            <span class="rows-amount-label mr">Rows per page:</span>

                            <div class="rows_select mr">
                              <v-select v-model="table.rows_amount" :items="items_per_page"></v-select>
                            </div>

                            <v-btn @click="change_active_page(-1), tables.not_in_yard" icon class="v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-btn--text theme--light v-size--default">
                              <v-icon class="">chevron_left</v-icon>
                            </v-btn>
                            
                            <span class="rows-amount-label">{{ page_info }}</span>
                            
                            <v-btn @click="change_active_page(1)" icon class="v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-btn--text theme--light v-size--default">
                              <v-icon class="">chevron_right</v-icon>
                            </v-btn>
                          </div>
                        </template>
                      </v-data-table>

                    </v-list-item-content>
                  </v-list-item>
              </v-list-group>
            </v-list>
        </div>
      </div>

      <div class="card-right-side">
        <div class="top-line">
          <v-icon class="mr-3">launch</v-icon>
          <v-icon>print</v-icon>
        </div>

        <h3>SUMMARY</h3>

          <v-layout row wrap>
            <v-flex xs12>
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
      </div>
    </v-card>

    <!-- <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    
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
      api_timeout: null,
      activities: [],
      activities_computed_1: [],
      show_gallery: false,
      lot_id: "",
      date: "",
      items_per_page: [50, 100, 150],
      rows_amount: 50,
      active_page: 1,
      dialog: {},

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

      
      // unic data for separate tables
      // common data is stored data object
      tables: {
        not_in_yard: {
          title: "Not in Yard",
          active: true,
          rows_amount: 50,
          active_page: 1,
          content: {
            activities: {
              img: "",
              lot_number: "",
              website: "",
              yard: "",
              date_sold: "",
              days_in_yard: "",
              holding_fees: ""
            },
            activities_computed: {},
          }
        },

        location_discrepancy: {
          title: "Row Location Discrepancy",
          active: false,
          rows_amount: 50,
          active_page: 1,
          content: {
            activities: {
              img: "",
              lot_number: "",
              website: "",
              yard: "",
              date_sold: "",
              days_in_yard: "",
              holding_fees: ""
            },
            activities_computed: {}
          }
        },

        location_confirmed: {
          title: "Row Location Confirmed",
          active: false,
          rows_amount: 50,
          active_page: 1,
          content: {
            activities: {
              img: "",
              lot_number: "",
              website: "",
              yard: "",
              date_sold: "",
              days_in_yard: "",
              holding_fees: ""
            },
            activities_computed: {}
          }
        }
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
      ]
    }
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


    get_vehicle_data_handler(response, table) {
      /**
       * response - response from api
       * table - target table
       */ 

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

        table.activities = vehicles_to_render;
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

    get_table_data() {

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

    call_gallery (id) {
      this.show_gallery = true
      this.lot_id = id
    },

    change_items_for_render(target) {
      target.activities_computed = target.activities.slice((target.active_page - 1) * target.rows_amount, target.active_page * target.rows_amount);
    },

    change_active_page(value, target) {
      let new_page = target.active_page + value;
      let pages_amount = Math.ceil(target.activities.length / target.rows_amount);

      if(new_page >= 1 && new_page <= pages_amount) {
        target.active_page = new_page;
        this.change_items_for_render(target);
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
    // this.get_default_data();
  }
};

</script>


<style lang="scss" src="../css/inventory_report.scss">
</style>
