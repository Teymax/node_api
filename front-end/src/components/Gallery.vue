<template>
  <v-dialog v-model="display_gallery" persistent max-width="700px" transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title class="font-weight-medium">Photos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close_gallery">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-layout row>
          <v-flex xs12 class="mb-2">
            <v-layout row>
              <v-flex xs12>
                <v-layout wrap row>
                  <v-flex xs6 class="pl-2 pr-2" v-for="(photo, index) in photos" :key="photos + index">
                    <a :href="serverUrl + photo.substring(1)" target="_blank">
                      <v-img :src="serverUrl + photo.substring(1)"></v-img>
                    </a>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "gallery",
  props: {
    show_gallery: {
      type: Boolean
    },
    lot_id: {
      type: String
    },
    history: {
      type: Object
    }
  },
  data() {
    return {
      display_gallery: false
    }
  },
  computed: {
    serverUrl () {
      return 'http://localhost:9000'
    },
    photos () {
      const photosDimensionalArray = this.history.photo1_filenames ? this.history.photo1_filenames.map(item => {
        return Object.values(item)
      }) : []
      let photos = []
      photosDimensionalArray.forEach(item => {
        photos = [...photos, ...item]
      })
      return photos
    }
  },
  watch: {
    show_gallery: function  (val) {
      this.display_gallery = val
    }
  },
  methods: {
    close_gallery () {
      this.$emit('close_gallery')
    }
  }
}
</script>

<style scoped>

</style>
