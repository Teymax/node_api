<template>
  <div class="vehicle-delivery-container container">
    <h2 class="page-header-text">Vehicle Delivery</h2>
    <v-card>
      <v-card-title>
        <v-layout column>
          <v-layout row>
            Activity
          </v-layout>  

          <v-spacer></v-spacer>   

          <v-layout row align-center justify-end> 
            <v-switch  v-model="enable_date_search" class="mr-4" label="Enable date search"></v-switch>

            <v-menu
              class="date-menu"
              ref="start_date_menu"
              v-model="start_menu"
              :close-on-content-click="false"
              :return-value.sync="start_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="190px"
            >
              <template class="date-slot" v-slot:activator="{ on }">
                <v-text-field
                  :disabled="!enable_date_search"
                  class="date-text-field"
                  v-model="start_date"
                  label="From"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                class="date-picker"
                v-model="start_date"
                @input="save_start_date"
                :max="new Date().toISOString()">
              </v-date-picker>
            </v-menu>

            <v-menu
              class="date-menu"
              ref="end_date_menu"
              v-model="end_menu"
              :close-on-content-click="false"
              :return-value.sync="end_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="190px"
            >
              <template class="date-slot" v-slot:activator="{ on }">
                <v-text-field
                  :disabled="!enable_date_search"
                  class="date-text-field"
                  v-model="end_date"
                  label="To"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                class="date-picker"
                v-model="end_date"
                :min="new Date(start_date).toISOString()"
                @input="save_end_date"
                :max="new Date().toISOString()">
              </v-date-picker>
            </v-menu>


            <v-layout class="search-container flex align-center">
              <v-select
                class="table-select"
                :items="select_data"
                max-height="1"
                label="Search field"
                v-model="search_field"
                @input="$refs.search_input.focus()"
                @change="clear_search_phraze">
              </v-select>
              <v-text-field v-model="search_phraze" ref="search_input" append-icon="search" class="table-search mr-4" label="Search..." @input="search_vehicles"></v-text-field>
            </v-layout>
            <v-btn small color="primary" class="mb-2" @click="get_default_data">Clear filters</v-btn>

          </v-layout>
        </v-layout>
      </v-card-title>

      <v-data-table
        :headers="headers_table"
        :items="activities_computed"
        :hide-default-footer="true"
        class="elevation-1"
        ref="table"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-xs-center photo-cell">
              <img v-if="carPreview(item)" alt="Car photo" @click="call_gallery(item.lot_number, item.history)" :src="carPreview(item)"></v-btn>
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
    </v-card>
    <gallery-card :show_gallery="show_gallery" :history="activeItemHistory" :lot_id="lot_id" @close_gallery="closeGalleryHandler"></gallery-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import actionTypes from "../store/action-types";
import { setTimeout, clearTimeout } from "timers";
import moment from 'moment';
import Gallery from '../components/Gallery';
import api from "../api/axiosInstance";

export default {
  name: "VehicleDelivery",
  components: {
    'gallery-card': Gallery
  },
  data() {
    return {
      date: "",
      start_menu: false,
      end_menu: false,
      enable_date_search: false,
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
          value: "img"
        },
        {
          text: "DATE",
          value: "date"
        },
        {
          text: "TIME",
          value: "time"
        },
        {
          text: "LOCATION",
          value: "location"
        },
        {
          text: "LOT#",
          value: "lot_number"
        },
        {
          text: "LP",
          value: "license_plate"
        },
        {
          text: "TYPE",
          value: "type"
        },
        {
          text: "COLOR",
          value: "color"
        },
        {
          text: "MAKE",
          value: "make"
        },
        {
          text: "MODEL",
          value: "model"
        },
        {
          text: "YEAR",
          value: "year"
        },
        {
          text: "TOWING COMPANY",
          value: "towing_company"
        }
      ],
      api_timeout: null,
      activities: [],
      activities_computed: [],
      show_gallery: false,
      lot_id: "",
      activeItemHistory: {}
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
            item.time = moment(history.date).format("HH:MM:SS");
            item.location = history.location_name;
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
      this.headers_table.forEach(item => {
        if(item.text === this.search_field) {
          computed_search_field = item.value;
        }
      })

      let params = {
        start_date: this.enable_date_search ? this.start_date : "",
        end_date: this.enable_date_search ? this.enable_date : "",
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

    call_gallery (id, history) {
      this.show_gallery = true
      this.activeItemHistory = history.length ? history[0] : {}
      this.lot_id = id
    },

    closeGalleryHandler () {
      this.show_gallery = false
      this.activeItemHistory = {}
    },

    change_items_for_render() {
      this.activities_computed = this.activities.slice((this.active_page - 1) * this.rows_amount, this.active_page * this.rows_amount);
    },

    carPreview(vehicle) {
      if(Object(vehicle) === vehicle 
          && Object(vehicle.history[0]) === vehicle.history[0] 
          && vehicle.history[0].photo1_filenames.length) 
      {
        return vehicle.history[0].icon_photo ? this.serverUrl + vehicle.history[0].icon_photo.substring(1) : 'https://dummyimage.com/80x45/d9daeb/ffffff.jpg&text=not+loaded'
      }

      return false;
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
      return this.headers_table.map(item => item.text).filter(item => item.toLowerCase() !== "date" && item.toLowerCase() !== "");
    },

    page_info() {
      // return pagination info

      let pages_amount = Math.ceil(this.activities.length / this.rows_amount);
      let active_page_computed = pages_amount === 0 ? 0 : this.active_page;

      return `${active_page_computed} of ${pages_amount}`;
    },
    serverUrl () {
      return api.defaults.baseURL;
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
    },

    enable_date_search() {
      this.search_vehicles();
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

.vehicle-delivery-container {
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
    font-size: 0.9rem;
  }

  .v-data-table td {
    font-size: 0.9rem;
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

  .table-footer {
    display: flex;
    justify-content: flex-end;
  }

  .footer-select {
    width: 100px;
  }

  .search-container {
    max-width: 36rem;
  }

  .table-search {
    flex: inherit;

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
      margin-right: 2.5rem;
    }

    .rows_select {
      max-width: 50px;
    }
  }
}

</style>
