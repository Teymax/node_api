<template>
  <div class="vehicle-delivery-container container">
    <h2 class="page-header-text">Vehicle Delivery</h2>
    <v-card>
      <v-card-title>
        Activity
        <v-spacer></v-spacer>
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
            :max="new Date().toISOString()">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="start_menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save_start_date">OK</v-btn>
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
            :max="new Date().toISOString()">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="end_menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save_end_date">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-select
          class="table-select"
          :items="select_data"
          max-height="1"
          width="10"
          label="Search field"
          v-model="search_field"
        ></v-select>
        <v-text-field v-model="search_phraze" append-icon="search" class="table-search mr-4" label="Search..." @input="search_vehicles"></v-text-field>
        <v-btn small color="primary" class="mb-2" @click="get_default_data">Clear filters</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="activities"
        :search="search_on_front"
        class="elevation-1"
        ref="table"
      >
        <template v-slot:items="props">
          <td class="text-xs-right photo-cell">
            <img alt="Car photo">
          </td>
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.time }}</td>
          <td class="text-xs-right">{{ props.item.lot_number }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
          <td class="text-xs-right">{{ props.item.color }}</td>
          <td class="text-xs-right">{{ props.item.make }}</td>
          <td class="text-xs-right">{{ props.item.model }}</td>
          <td class="text-xs-right">{{ props.item.licence_plate }}</td>
          <td class="text-xs-right">{{ props.item.location }}</td>
          <td class="text-xs-right">{{ props.item.towing_company }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import actionTypes from "../store/action-types";
import { VDaterange } from "vuetify-daterange-picker"
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
import { setTimeout, clearTimeout } from "timers";
import moment from 'moment'

export default {
  name: "VehicleDelivery",
  components: {
    VDaterange
  },
  data() {
    return {
      date: "",
      start_menu: false,
      end_menu: false,
      search_on_front: "",
      search_field: "LOT#",
      search_phraze: "",
      start_date: "",
      end_date: "",
      dates: [],
      datesGetter: [],
      headers: [
        {
          text: "LOT#",
          value: "lot_number",
          align: "center"
        },
        {
          text: "TYPE",
          value: "type",
          align: "center"
        },
        {
          text: "COLOR",
          value: "color",
          align: "center"
        },
        {
          text: "MAKE",
          value: "make",
          align: "center"
        },
        {
          text: "MODEL",
          value: "model",
          align: "center"
        },
        {
          text: "Year",
          value: "year",
          align: "center"
        },
        {
          text: "LP",
          value: "license_plate",
          align: "center"
        },
        {
          text: "DATE",
          value: "date",
          align: "center"
        },
        {
          text: "TIME",
          value: "time",
          align: "center"
        },
        {
          text: "LOCATION",
          value: "location",
          align: "center"
        },
        {
          text: "TOWING COMPANY",
          value: "towing_company",
          align: "center"
        }
      ],
      api_timeout: null,
      activities: [],
      yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD')
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
        let vehicles = response.data.vehicles;

        // we get data from api not in US format, so we had to format it
        vehicles.forEach(item => {
          let date = item.date.slice(0, item.date.indexOf("T"));
          item.date = this.format_date(date);
        });

        this.activities = vehicles;
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

    save_end_date() {
      this.$refs.end_date_menu.save(this.end_date);
      this.search_vehicles();
    },
    save_start_date() {
      this.$refs.start_date_menu.save(this.start_date);
      this.$refs.end_date_menu.save(this.end_date);
      this.end_date = this.start_date
      this.search_vehicles();
    },
    get_default_data () {
      this.start_date = this.end_date = this.yesterday
      this.search_vehicles()
    }
  },
  computed: {
    select_data() {
      // here we get field names for rendering in v-select component
      return this.headers.map(item => item.text).filter(item => item.toLowerCase() !== "date");
    },
  },

  created() {
    this.get_default_data()
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
}
</style>
