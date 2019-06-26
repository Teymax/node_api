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

      <v-data-table :headers="headers" :items="activities" :search="search" class="elevation-1" ref="table">
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
export default {
  name: "VehicleDelivery",
  data() {
    return {
      date: "",
      menu: false,
      search: "",
      headers: [
        // {
        //   text: "Dessert (100g serving)",
        //   align: "left",
        //   sortable: false,
        //   value: "name"
        // },
        // { text: "Calories", value: "calories" },
        // { text: "Fat (g)", value: "fat" },
        // { text: "Carbs (g)", value: "carbs" },
        // { text: "Protein (g)", value: "protein" },
        // { text: "Iron (%)", value: "iron" }
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
        {
          photo: "",
          icon: "",
          date: "02/11/19",
          time: "11:03:38",
          lot_number: "14170",
          type: "SUV",
          color: "white",
          make: "Reno",
          model: "Captur",
          licence_plate: "9CA:185",
          location: "GATE 1",
          towing_company: "California Towing"
        },
        {
          photo: "",
          icon: "",
          date: "02/11/19",
          time: "11:03:38",
          lot_number: "14170",
          type: "SUV",
          color: "white",
          make: "Reno",
          model: "Captur",
          licence_plate: "9CA:185",
          location: "GATE 1",
          towing_company: "California Towing"
        },
        {
          photo: "",
          icon: "",
          date: "02/11/19",
          time: "11:03:38",
          lot_number: "14170",
          type: "SUV",
          color: "white",
          make: "Reno",
          model: "Captur",
          licence_plate: "9CA:185",
          location: "GATE 1",
          towing_company: "California Towing"
        },
        {
          photo: "",
          icon: "",
          date: "03/05/18",
          time: "06:33:08",
          lot_number: "14170",
          type: "Sedan",
          color: "purple",
          make: "Toyota",
          model: "Supra",
          licence_plate: "2CA:183",
          location: "Detail Center C",
          towing_company: "Marvin's Towing"
        }
      ]
    }
  },
  methods: {
    formatDate(date) {
      if(!date) return null;

      const [year, month, day] = date.split('-')

      return `${month}/${day}/${year.slice(0, 2)}`
    },
    saveDate() {
      this.$refs.menu.save(this.date);
      
      if (this.formattedDate) {
        this.search = this.formattedDate
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
      return ""
    },
    tableSearch() {
      return '';
    },
    formattedDate() {
      let dateCopy = this.date; 
      return this.formatDate(dateCopy);
    }
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
