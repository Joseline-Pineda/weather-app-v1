<template>
  <v-card class="mx-auto main" width="450" height="300" elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="12" offset-md="2" md="8">
          <v-img :src="img" :alt="img"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    img: String,
  },
};
</script>

<style scoped>
.main {
  background-color: transparent !important;
}
</style>
