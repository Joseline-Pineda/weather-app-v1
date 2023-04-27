<template>
  <v-card class="primary main">
    <v-list-item class="mb-0">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-2 text-center">
          {{
            time.titulo.split(" ")[0] +
            " " +
            time.titulo.split(" ")[1] +
            " " +
            time.titulo.split(" ")[2].slice(0, 3)
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- <v-card-title class="text-subtitle-1">
      <p class="text-center">{{ time.titulo }}</p>
    </v-card-title> -->

    <v-container class="main-img">
      <v-row>
        <v-col cols="12" offset-md="2" md="8">
          <v-img :src="time.img" :alt="time.alt"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="mt-7 text-caption">
      <v-row d-flex>
        <v-col class="h6 d-flex justify-start" text offset="md-2" md="4">
          {{ fahrenheit ? time.minF + "°F" : time.min + "°C" }}
        </v-col>
        <v-col
          class="h6 d-flex justify-end grey--text font-weight-light"
          md="4"
          text
        >
          {{ fahrenheit ? time.maxF + "°F" : time.max + "°C" }}
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    time: Object,
    fahrenheit: Boolean,
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
    height: 62px;
  }
  .main {
    min-height: 75px;
    height: 177px;
    width: 120px;
  }

  .text-caption {
    font-family: "Raleway", sans-serif !important;
  }
  .text-subtitle-2 {
    font-family: "Raleway", sans-serif !important;
  }
}
</style>
