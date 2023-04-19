<template>
  <div>
    <v-card class="mx-auto primary mb-10" height="250">
      <v-card-title
        ><v-card-text class="text-center text-h4">{{ info.title }}</v-card-text>
      </v-card-title>

      <v-card-text class="text-center mt-n4">
        <div class="d-flex align-center justify-center mb-5">
          <span class="md:text-h1 font-weight-bold text-h2">
            <!-- {{ info.main.humidity }} -->
            {{ info.body }}
          </span>
          <span class="ml-1 text-h4">{{ info.unit }}</span>
        </div>
        <div>
          <v-row v-if="info.title == 'Humidity'">
            <v-col md="8" offset-md="2">
              <div class="rounded-full h-2.5 bg-grey lighten-3">
                <div
                  class="flex justify-between absolute w-full text-caption grey--text"
                >
                  <div class="d-flex justify-space-between">
                    <span class="start">0</span>
                    <span class="center">50</span>
                    <span class="end">100</span>
                  </div>
                </div>
              </div>
              <v-progress-linear
                class="mt-1"
                :value="50"
                height="10"
                rounded
                color="#FFEC65"
              >
              </v-progress-linear>
            </v-col>
            <v-text class="d-flex justify-end mt-7 ml-0">%</v-text>
          </v-row>
          <v-row v-else class="mt-5">
            <v-col md="8" offset-md="2">
              <v-icon class="mr-2">fa-solid fa-location-arrow</v-icon>
              <v-text>WSW</v-text>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto primary" height="190">
      <v-card-title
        ><v-card-text class="text-center text-h4">{{
          info.extra.title
        }}</v-card-text>
      </v-card-title>

      <v-card-text class="text-center mt-n4">
        <div class="d-flex align-center justify-center mb-5">
          <span class="md:text-h1 font-weight-bold text-h2">
            <!-- {{ info.main.humidity }} -->
            {{ info.extra.body }}
          </span>
          <span class="ml-1 text-h4">{{ info.extra.unit }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.text-h2 {
  font-family: "Raleway", sans-serif !important;
}
.text-h4 {
  font-family: "Raleway", sans-serif !important;
}
</style>
