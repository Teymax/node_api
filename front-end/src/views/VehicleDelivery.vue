<template>
  <!-- <v-app> -->
  <div class="vehicle-delivery-container container">
    <h2 class="page-header-text">Vehicle Delivery</h2>
    <v-card>
      <v-card-title>
        Activity
        <v-spacer></v-spacer>
        <!-- <v-date-picker></v-date-picker> -->

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
              v-model="formattedDate"
              label="mm/dd/yyyy"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker class="date-picker" v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="saveDate">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <!-- v-model="selectValue" -->
        <v-select
          class="table-select"
          :items="selectData"
          max-height="1"
          width="10"
          label="Search field"
        ></v-select>
        <v-text-field v-model="search" append-icon="search" class="table-search" label="Search..."></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="activities"
        :search="search"
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

export default {
  name: "VehicleDelivery",
  data() {
    return {
      date: "",
      menu: false,
      search: "",
      headers: [
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
      getVehicleData: actionTypes.GET_VEHICLE_DATA
    }),

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");

      return `${month}/${day}/${year.slice(0, 2)}`;
    },
    formatDateForApi(date) {
      return( ("00" + (date.getMonth() + 1)).slice(-2) + "/" + 
        ("00" + date.getDate()).slice(-2) + "/" + 
        date.getFullYear() + " " + 
        ("00" + date.getHours()).slice(-2) + ":" + 
        ("00" + date.getMinutes()).slice(-2) + ":" + 
        ("00" + date.getSeconds()).slice(-2)
      )
    },
    saveDate() {
      this.$refs.menu.save(this.date);

      if (this.formattedDate) {
        this.search = this.formattedDate;
      }

      // this.$refs.table.search =  this.formattedDate;
      // this.$refs.table.filter;
      // console.log("TCL: saveDate -> this.$refs.table.filter", this.$refs.table.filter)
    }
  },
  computed: {
    selectData() {
      return this.headers.map(item => item.text);
    },
    selectValue() {
      return "";
    },
    tableSearch() {
      return "";
    },
    formattedDate() {
      let dateCopy = this.date;
      return this.formatDate(dateCopy);
    }
  },
  created() {
    let date = this.formatDateForApi(new Date());
    let response = this.getVehicleData(date);
    console.warn(response);
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
