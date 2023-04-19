<template>
  <v-card class="primary main">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 text-center">
          {{ time.titulo }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="main-img">
      <v-row>
        <v-col cols="12" offset-md="2" md="8">
          <v-img :src="time.img" :alt="time.alt"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row d-flex>
        <v-col class="h6 d-flex justify-start" text offset="md-2" md="4">
          {{ time.max }}°C
        </v-col>
        <v-col
          class="h6 d-flex justify-end grey--text font-weight-light"
          md="4"
          text
        >
          {{ time.min }}°C
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    time: Object,
  },
};
</script>

<style scoped>
@media screen and (min-width: 1400px) {
  .main-img {
    height: 175px;
  }
  .main {
    min-height: 300px;
  }
}

@media screen and (max-width: 1366px) {
  .main-img {
    height: 100px;
  }
  .main {
    min-height: 135px;
  }
}
</style>
