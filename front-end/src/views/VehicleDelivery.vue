<template>
  <!-- <v-app> -->
  <div class="vehicle-delivery-container container">
    <h2 class="page-header-text">Vehicle Delivery</h2>
    <v-card>
      <v-card-title>
        Activity
        <v-spacer></v-spacer>

        <v-menu
          class="date-menu"
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template class="date-slot" v-slot:activator="{ on }">
            <v-text-field
              class="date-text-field"
              v-model="formatted_date"
              label="mm/dd/yyyy"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker class="date-picker" v-model="dates" no-title scrollable multiple>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save_date">OK</v-btn>
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

        <v-text-field v-model="search_phraze" append-icon="search" class="table-search" label="Search..." @input="search_vehicles"></v-text-field>
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
  <!-- </v-app> -->
</template>

<script>
import { mapActions } from "vuex";
import actionTypes from '../store/action-types';
import { VDaterange } from "vuetify-daterange-picker"
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";

export default {
  name: "VehicleDelivery",
  components: {
    VDaterange
  },
  data() {
    return {
      date: "",
      menu: false,
      search_on_front: "",
      search_field: "lot_number",
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
          text: "LP",
          value: "licence_plate",
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
      activities: [
        // {
        //   photo: "",
        //   icon: "",
        //   date: "02/11/19",
        //   time: "11:03:38",
        //   lot_number: "14170",
        //   type: "SUV",
        //   color: "white",
        //   make: "Reno",
        //   model: "Captur",
        //   licence_plate: "9CA:185",
        //   location: "GATE 1",
        //   towing_company: "California Towing"
        // },
        // {
        //   photo: "",
        //   icon: "",
        //   date: "12/05/19",
        //   time: "11:03:38",
        //   lot_number: "14170",
        //   type: "other",
        //   color: "black",
        //   make: "Ford",
        //   model: "Escort",
        //   licence_plate: "1CA:185",
        //   location: "GATE 2",
        //   towing_company: "California Towing"
        // },
        // {
        //   photo: "",
        //   icon: "",
        //   date: "17/11/19",
        //   time: "12:33:38",
        //   lot_number: "14170",
        //   type: "SUV",
        //   color: "red",
        //   make: "GMC",
        //   model: "Sierra",
        //   licence_plate: "3CA:285",
        //   location: "GATE 1",
        //   towing_company: "Keith's Towing"
        // },
        // {
        //   photo: "",
        //   icon: "",
        //   date: "03/05/18",
        //   time: "06:33:08",
        //   lot_number: "14170",
        //   type: "Sedan",
        //   color: "purple",
        //   make: "Toyota",
        //   model: "Supra",
        //   licence_plate: "2CA:183",
        //   location: "Detail Center C",
        //   towing_company: "Marvin's Towing"
        // },
        // {
        //   photo: "",
        //   icon: "",
        //   date: "17/11/19",
        //   time: "12:33:38",
        //   lot_number: "14170",
        //   type: "SUV",
        //   color: "red",
        //   make: "GMC",
        //   model: "Sierra",
        //   licence_plate: "3CA:285",
        //   location: "GATE 1",
        //   towing_company: "Keith's Towing"
        // },
        // {
        //   photo: "",
        //   icon: "",
        //   date: "02/11/19",
        //   time: "11:03:38",
        //   lot_number: "14170",
        //   type: "SUV",
        //   color: "white",
        //   make: "Reno",
        //   model: "Captur",
        //   licence_plate: "9CA:185",
        //   location: "GATE 1",
        //   towing_company: "California Towing"
        // }
      ]
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

      return `${month}/${day}/${year.slice(0, 2)}`;
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

    debounce(f) {
      let timer = null;

      return function (...args) {
        const on_complete = () => {
          f.apply(this, args);
          timer = null;
        }

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(on_complete, 300);
      };
    },

    search_vehicles() {
      let params = {
        start_date: this.dates_computed[0], 
        end_date: this.dates_computed[1], 
        search_field: this.search_field, 
        search_param: this.search_phraze
      };

      this.$root.debounce(() => {
        this.get_vehicle_data(params)
          .then(response => {
            // console.warn('search response', response.data.vehicles);
            this.activities = response.data.vehicles; 
          })
          .catch(err => {
            console.error(err);
          });
      })()
    },

    save_date() {
      this.$refs.menu.save(this.date);

      if (this.formatted_date) {
        this.search = this.formatted_date;
      }
    }
  },
  computed: {
    select_data() {
      return this.headers.map(item => item.text);
    },
    formatted_date() {
      let date_copy = this.date;
      return this.format_date(date_copy);
    },
    dates_computed: {
      // get() {
      //   return this.dates.length > 2 ? this.dates.slice(this.dates.length - 2) : this.dates;
      // },
      // set(input) {
      //   this.dates = this.dates.length > 2 ? this.dates.slice(this.dates.length - 2) : this.dates;
      //   this.dates.push(input);
      //   console.log(input);
      //   console.log(this.dates);
      // }

      get() {
        return this.dates.length > 2 ? this.dates.slice(this.dates.length - 2) : this.dates;
      }
    }
  },
  watch: {
    // dates() {
    //   this.dates.splice(this.dates.length - 2);
    //   console.log(this.dates);
    // }
  },

  created() {
    this.get_vehicle_data()
      .then(response => { 
        this.activities.push(...response.data.vehicles); 
      })
  }
};
</script>

<style lang="scss">
@import "../css/variables";

.vehicle-delivery-container {
  // .page-header {
  //   font-size: 2.2rem;
  //   font-weight: bold;
  //   margin-bottom: 1.8rem;
  // }

  // .table-select {
  //   flex: inherit;
  //   width: 10rem;
  //   margin-right: 3rem;
  // }

  .v-text-field .v-label--active {
    transform: translateY(-26px) scale(0.75) !important;
  }

  .v-text-field {
    margin-top: 0;
  }

  .table-select {
    // margin-top: 13px;
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
  }
}
</style>
