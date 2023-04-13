<template>
  <v-card class="primary" min-height="235">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 text-center">
          {{ time.titulo }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text style="height: 100px">
      <v-row>
        <v-col cols="12" offset-md="2" md="8">
          <v-img :src="time.img" :alt="time.alt"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="font-weight-bold h6 ml-2" text>
        {{ time.max }}
      </v-list-item>
      <v-list-item class="h6" text> {{ time.min }} </v-list-item>
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

<style scoped></style>
