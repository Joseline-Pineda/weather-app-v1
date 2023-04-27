<template>
  <v-card
    style="user-select: none"
    class="mx-auto primary"
    max-width="344"
    elevation="0"
  >
    <v-card-text class="text-center">
      <p class="num">
        {{ fahrenheit ? info.tempF : info.temp }}
        <span class="unit">{{ fahrenheit ? "°F" : "°C" }}</span>
      </p>
      <p class="description">{{ info.description }}</p>
      <div class="information">
        <p>
          Today
          <span style="margin: 0 15px; font-weight: bold">.</span>
          {{ info.date }}
        </p>

        <p class="location">
          <span
            ><v-icon color="#88869D" size="12"
              >fa-solid fa-location-dot</v-icon
            ></span
          >
          {{ info.location }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
    fahrenheit: {
      type: Boolean,
    },
  },
};
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

@media screen and (min-width: 1400px) {
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
    margin-top: 7rem;
    font-size: 2.75rem;
    font-weight: 500;
  }
  .information {
    font-size: 1.7rem;
    font-weight: 100;
    margin-top: 7rem;
  }
  .location {
    margin-top: 2.5rem;
  }
}
</style>
