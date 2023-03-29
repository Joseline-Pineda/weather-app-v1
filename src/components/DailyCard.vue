<template>
  <v-card class="mx-auto primary" max-width="344" elevation="0">
    <v-card-text class="text-center">
      <p class="num">15 <span class="unit">°C</span></p>
      <p class="description">Shower</p>
      <div class="information">
        <p>
          Today <span style="margin: 0 15px; font-weight: bold">.</span> Fri 5
          Jun
        </p>
        <p>Santa Ana</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.num {
  font-size: 8rem;
  font-weight: 500;
}
.unit {
  font-size: 3rem;
  font-weight: 500;
  margin-left: -25px;
}
.description {
  margin-top: 4rem;
  font-size: 2.25rem;
  font-weight: 500;
}
.information {
  font-size: 1.7;
  font-weight: 100;
  margin-top: 3rem;
}
</style>
