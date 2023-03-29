<template>
  <v-container class="fill-height py-0" fluid
    ><v-row class="fill-height"
      ><v-col class="primary" md="3"
        ><v-row class="sidebar"></v-row
        ><v-container class="main-icon"><MainImage :img="image" /></v-container
        ><DailyCard /></v-col
      ><v-col class="secondary"><WeatherWidget :time="tiempo" /></v-col
    ></v-row>
  </v-container>
</template>
<script>
import WeatherWidget from "@/components/WeatherWidget.vue";
import MainImage from "@/components/MainImage.vue";
import DailyCard from "@/components/DailyCard.vue";
import axios from "axios";
export default {
  name: "Home",
  created() {
    if ("geolocation" in navigator) {
      let lat = 0;
      let lon = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6ac7cc5ef159eb0ca2eb7aff5a1d2ee7&units=metric`
        )
        .then((result) => {
          let info = result.data;
          console.log(info);
          let id = info.weather[0].icon;
          id = id.slice(0, id.length - 1);
          this.image = this.iconList[id];
        });
    } else {
      /* geolocation IS NOT available */
    }
  },
  components: {
    WeatherWidget,
    MainImage,
    DailyCard,
  },
  data() {
    return {
      tiempo: {
        titulo: "Mon, 8 Jun",
        img: require("../assets/img/LightCloud.png"),
        max: "16°C",
        min: "11°C",
        alt: "Texto alternatvo",
      },
      iconList: {
        "01": require("../assets/img/Clear.png"),
        "02": require("../assets/img/LightCloud.png"),
        "03": require("../assets/img/HeavyCloud.png"),
        "04": require("../assets/img/LightCloud.png"),
        "09": require("../assets/img/LightRain.png"),
        10: require("../assets/img/Shower.png"),
        11: require("../assets/img/Thunderstorm.png"),
        13: require("../assets/img/Snow.png"),
        50: require("../assets/img/LightCloud.png"),
      },
      image: "",
    };
  },
};
</script>
<style scoped>
.sidebar {
  background-image: url(@/assets/img/Cloud-background.png);
  background-size: 35rem;
  background-position: 45% 15%;
  filter: grayscale(200%) opacity(0.1) drop-shadow(0 0 0 black);
  height: 50%;
}

.main-icon {
  margin-top: -25rem;
}

@media screen and (width: 1366px) {
  .main-icon {
    margin-top: -15rem; /* para pantallas de menos de 768px de ancho */
  }
}
</style>
