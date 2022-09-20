<template>
  <v-container class="fill-height py-0" fluid
    ><v-row class="fill-height"
      ><v-col class="primary" md="3"><v-row class="sidebar"></v-row></v-col
      ><v-col class="secondary"></v-col></v-row
  ></v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style scoped>
.sidebar {
  background-image: url(@/assets/img/Cloud-background.png);
  background-size: 45rem;
  background-position: 45% 15%;
  filter: grayscale(200%) opacity(0.1) drop-shadow(0 0 0 black);
  height: 50%;
}
</style>
