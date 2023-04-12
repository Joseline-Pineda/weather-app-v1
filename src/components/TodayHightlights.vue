<template>
  <v-container>
    <v-card class="primary">
      <v-card-title class="text-center">Humidity</v-card-title>
      <v-card-text class="text-center">
        <div class="d-flex align-center justify-center">
          <span class="text-h2 md:text-h1 font-weight-bold">
            <!-- {{ info.main.humidity }} -->
            45
          </span>
          <span class="ml-1">%</span>
        </div>
        <div class="rounded-full h-2.5 bg-grey lighten-3">
          <div
            class="flex justify-between absolute top-0 w-full text-caption grey--text"
          >
            <div class="d-flex justify-space-between">
              <span class="start">0</span>
              <span class="center">50</span>
              <span class="end">100</span>
            </div>
          </div>
        </div>
        <v-progress-linear
          class="mt-5"
          :value="50"
          height="5"
          rounded
          color="yellow darken-2"
        >
        </v-progress-linear>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped></style>
