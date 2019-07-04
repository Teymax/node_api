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
                  <v-flex xs6 class="pl-2 pr-2">
                    <a href="https://picsum.photos/3840/2160?random" target="_blank">
                      <v-img src="https://picsum.photos/500/280?random"></v-img>
                    </a>
                  </v-flex>
                  <v-flex xs6 class="pl-2 pr-2">
                    <a href="https://picsum.photos/3840/2160?random" target="_blank">
                      <v-img src="https://picsum.photos/500/280?random"></v-img>
                    </a>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="pt-2">
                  <v-flex xs6 class="pl-2 pr-2">
                    <a href="https://picsum.photos/3840/2160?random" target="_blank">
                      <v-img src="https://picsum.photos/500/280?random"></v-img>
                    </a>
                  </v-flex>
                  <v-flex xs6 class="pl-2 pr-2">
                    <a href="https://picsum.photos/3840/2160?random" target="_blank">
                      <v-img src="https://picsum.photos/500/280?random"></v-img>
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
    }
  },
  data() {
    return {
      display_gallery: false
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
