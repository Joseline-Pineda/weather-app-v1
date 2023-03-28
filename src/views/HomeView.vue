<template>
  <v-container class="fill-height py-0" fluid
    ><v-row class="fill-height"
      ><v-col class="primary" md="3"
        ><v-row class="sidebar"></v-row><MainImage :img="image" /></v-col
      ><v-col class="secondary"><WeatherWidget :time="tiempo" /></v-col
    ></v-row>
  </v-container>
</template>

<script>
import WeatherWidget from "@/components/WeatherWidget.vue";
import MainImage from "@/components/MainImage.vue";
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
          this.image = this.iconList[info.weather[0].icon];
        });
    } else {
      /* geolocation IS NOT available */
    }
  },
  components: {
    WeatherWidget,
    MainImage,
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
        "01n": require("../assets/img/Clear.png"),
        "02n": "../assets/img/LightCloud.png",
        "03n": "../assets/img/HeavyCloud.png",
        "04n": require("../assets/img/LightCloud.png"),
        "09n": "../assets/img/LightRain.png",
        "10n": "../assets/img/Shower.png",
        "11n": "../assets/img/Thunderstorm.png",
        "13n": "../assets/img/Snow.png",
        "50n": "../assets/img/LightCloud.png",
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
</style>
