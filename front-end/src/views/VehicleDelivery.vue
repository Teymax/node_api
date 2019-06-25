<template>
  <!-- <v-app> -->
  <div class="vehicle-delivery-container container">
    <v-card>
      <v-card-title>
        Vehicles
        <v-spacer></v-spacer>
        <!-- <v-date-picker></v-date-picker> -->
        <v-select class="table-select" :items="select" height="1" :width="10" label="Label" filled></v-select>
        <v-text-field v-model="search" append-icon="search" class="table-search" label="Search"></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="activities" :search="search" class="elevation-1">
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
      select: [],
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
    };
  }
};
</script>

<style lang="scss">

.v-input {
  /* flex: inherit; */
}

.vehicle-delivery-container {
  // .table-select {
  //   flex: inherit;
  //   width: 10rem;
  //   // height: 2rem;
  //   margin-right: 3rem;
  // }

  // .table-select {
  //   .v-select__selections {
  //     padding: 0;
  //   }
  // }

  // .table-search {
  //   flex: inherit;
  // }
}

</style>
