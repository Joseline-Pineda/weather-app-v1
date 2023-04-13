<template>
  <v-container class="fill-height py-0" fluid>
    <v-row class="fill-height">
      <v-col class="primary" md="3">
        <v-row class="sidebar"> </v-row>
        <v-container class="main-icon"><MainImage :img="image" /> </v-container>
        <v-row class="dailycard"><DailyCard :info="today" /> </v-row>
      </v-col>
      <v-col class="secondary">
        <v-row>
          <v-col offset-md="1" md="12">
            <v-row class="mt-10">
              <v-col v-for="day in days" :key="day.id" md="2">
                <WeatherWidget :time="day" />
              </v-col>
            </v-row>
            <v-row> <h2 class="ml-3">Today's Hightlights</h2></v-row>
            <v-row>
              <v-col md="5"> <TodayHightlights /></v-col>
              <v-col md="5"><TodayHightlights /></v-col>
            </v-row>
            <v-row>
              <v-col md="5"><TodayHightlights /></v-col>
              <v-col md="5"><TodayHightlights /></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import WeatherWidget from "@/components/WeatherWidget.vue";
import MainImage from "@/components/MainImage.vue";
import DailyCard from "@/components/DailyCard.vue";
import TodayHightlights from "@/components/TodayHightlights.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "Home",
  created() {
    const date = moment();
    console.log(date);
    const fechaFormatter = date.format("ddd D MMMM");
    console.log(fechaFormatter);
    let lat = 0;
    let lon = 0;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var ubicacion;

        axios
          .get(
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
              lat +
              "&lon=" +
              lon
          )
          .then((result) => {
            ubicacion = result.data;

            axios
              .get(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                  lat +
                  "&lon=" +
                  lon +
                  "&appid=6ac7cc5ef159eb0ca2eb7aff5a1d2ee7&units=metric"
              )
              .then((result) => {
                let info = result.data;

                let id = info.weather[0].icon;
                id = id.slice(0, id.length - 1);
                this.image = this.iconList[id];

                this.today = {
                  temp: Math.trunc(info.main.feels_like),
                  description: info.weather[0].main,
                  date: fechaFormatter,
                  location: ubicacion.address.city,
                };
              });
          });
        axios
          .get(
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
              lat +
              "&lon=" +
              lon +
              "&appid=6ac7cc5ef159eb0ca2eb7aff5a1d2ee7&units=metric"
          )
          .then((result) => {
            this.days = result.data;
            let dayList = result.data.list;
            dayList = dayList.map((item) => ({
              min: item.main.temp_min,
              max: item.main.temp_max,
              img: this.iconList[
                item.weather[0].icon.slice(0, item.weather[0].icon.length - 1)
              ],
              //todo cambiar nombre de titulo por fecha
              titulo: item.dt_txt.slice(0, 10),
            }));

            let fechas = dayList.map((fecha) => fecha.titulo);

            fechas = [...new Set(fechas)];
            console.log(dayList);
            console.log(fechas);
            let climas = [];
            for (const fecha of fechas) {
              let filter = dayList.filter((item) => item.titulo == fecha);
              let climaPromedio = filter.reduce((a, b) => ({
                titulo: a.titulo,
                min: a.min + b.min,
                max: a.max + b.max,
                img: a.img,
              }));
              climaPromedio.titulo = date.add(1, "day").format("ddd D MMMM");
              climaPromedio.min = Math.trunc(climaPromedio.min / filter.length);
              climaPromedio.max = Math.trunc(climaPromedio.max / filter.length);

              climas.push(climaPromedio);
            }
            console.log(climas);
            this.days = climas;
            if (this.days.length > 5) this.days.pop();
          });
      });
    } else {
      /* geolocation IS NOT available */
    }
  },
  components: {
    WeatherWidget,
    MainImage,
    DailyCard,
    TodayHightlights,
  },
  props: {
    info: Object,
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
      today: {
        temp: 18,
        description: "shower",
        date: "Fri 30 Mar",
        location: "Santa Ana",
      },
      days: [],
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
.bg-slate-800 {
  background-color: #1f2937;
}

@media screen and (max-width: 1366px) {
  .main-icon {
    margin-top: -15rem; /* para pantallas de menos de 768px de ancho */
  }
  .dailycard {
    margin-top: -3.5rem;
  }
}

@media screen and (min-width: 1400px) {
  .dailycard {
    margin-top: 3rem;
  }
}
</style>
