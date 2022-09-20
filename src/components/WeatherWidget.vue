<template>
  <v-card class="mx-auto primary" max-width="160">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 text-center">
          Mon, 8 Jun
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row>
        <v-col cols="12" offset-md="2" md="8">
          <v-img src="@/assets/img/LightCloud.png" alt="Sunny image"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="font-weight-bold" text> 16°C </v-list-item>
      <v-list-item text> 11°C </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      time: 0,
      forecast: [
        {
          day: "Tuesday",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0",
        },
        {
          day: "Wednesday",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0",
        },
        { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
      ],
    };
  },
};
</script>

<style scoped></style>
