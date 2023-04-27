<template>
  <v-container class="fill-height py-0" fluid>
    <v-row class="fill-height">
      <v-col class="primary" md="3">
        <v-row class="sidebar"> </v-row>
        <v-container class="main-icon"><MainImage :img="image" /> </v-container>
        <v-row class="dailycard"
          ><DailyCard :info="today" :fahrenheit="fahrenheit" />
        </v-row>
      </v-col>
      <v-col class="secondary">
        <v-row>
          <v-row class="mt-5">
            <v-col md="10" offset-md="1" class="d-flex justify-end">
              <v-btn
                class="mx-2 text-h6 primary"
                fab
                @click="fahrenheit = false"
              >
                °C
              </v-btn>
              <v-btn
                class="mx-2 text-h6 primary"
                fab
                @click="fahrenheit = true"
              >
                °F
              </v-btn>
            </v-col>
          </v-row>
          <v-col offset-md="1" md="12">
            <v-row class="mt-0">
              <v-col v-for="day in days" :key="day.id" md="2">
                <WeatherWidget :time="day" :fahrenheit="fahrenheit" />
              </v-col>
            </v-row>
            <v-row>
              <v-col><h2>Today's Hightlights</h2></v-col>
            </v-row>
            <v-row>
              <v-col md="5"> <TodayHightlights :info="wind" /></v-col>
              <v-col md="5"><TodayHightlights :info="humedad" /></v-col>
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
import ApiClientService from "@/services/ApiClientService";
import moment from "moment";
export default {
  name: "Home",
  async created() {
    const date = moment();
    const fechaFormatter = date.format("ddd D MMMM");
    let lat = 0;
    let lon = 0;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      });

      let info = await ApiClientService.getTodayInfo(lat, lon);
      let ubicacion = await ApiClientService.getLocation(lat, lon);
      console.log(ubicacion);
      let id = info.weather[0].icon;
      id = id.slice(0, id.length - 1);
      this.image = this.iconList[id];

      this.today = {
        temp: Math.trunc(info.main.feels_like),
        tempF: (Math.trunc(info.main.feels_like) * 9) / 5 + 32,

        description: info.weather[0].main,
        date: fechaFormatter,
        location: ubicacion.address.city,
      };
      console.log(this.today.tempF);
      this.wind = {
        title: "Wind status",
        body: (info.wind.speed * 3.6).toFixed(2),
        unit: "km/h",
        extra: {
          title: "Visibility",
          body: info.visibility / 1000,
          unit: "km",
        },
      };
      this.humedad = {
        title: "Humidity",
        body: info.main.humidity,
        unit: "%",
        extra: {
          title: "Air Pressure",
          body: info.main.pressure,
          unit: "mb",
        },
      };

      this.days = await ApiClientService.getForescastFiveDays(lat, lon);

      let dayList = this.days.list;
      dayList = dayList.map((item) => ({
        min: item.main.temp_min,
        minF: (item.main.temp_min * 9) / 5 + 32,
        max: item.main.temp_max,
        maxF: (item.main.temp_max * 9) / 5 + 32,
        img: this.iconList[
          item.weather[0].icon.slice(0, item.weather[0].icon.length - 1)
        ],
        //todo cambiar nombre de titulo por fecha
        titulo: item.dt_txt.slice(0, 10),
      }));
      let fechas = dayList.map((fecha) => fecha.titulo);
      fechas = [...new Set(fechas)];
      let climas = [];
      for (const fecha of fechas) {
        let filter = dayList.filter((item) => item.titulo == fecha);
        let climaPromedio = filter.reduce((a, b) => ({
          titulo: a.titulo,
          min: a.min + b.min,
          minF: a.minF + b.minF,
          max: a.max + b.max,
          maxF: a.maxF + b.maxF,
          img: a.img,
        }));
        climaPromedio.titulo = date.add(1, "day").format("ddd D MMMM");
        climaPromedio.min = Math.trunc(climaPromedio.min / filter.length);
        climaPromedio.minF = Math.trunc(climaPromedio.minF / filter.length);
        climaPromedio.max = Math.trunc(climaPromedio.max / filter.length);
        climaPromedio.maxF = Math.trunc(climaPromedio.maxF / filter.length);
        climas.push(climaPromedio);
      }
      this.days = climas;
      if (this.days.length > 5) this.days.pop();
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
      today: {
        temp: "",
        description: "",
        date: "",
        location: "",
      },
      wind: {
        title: "Wind status",
        body: "",
        unit: "km/h",
        extra: {
          title: "Visibility",
          body: "",
          unit: "km",
        },
      },
      humedad: {
        title: "Humidity",
        body: "",
        unit: "%",
        extra: {
          title: "Air Pressure",
          body: "",
          unit: "mb",
        },
      },
      days: {},
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
      fahrenheit: false,
    };
  },
};
</script>
<style scoped>
.main-icon {
  margin-top: -25rem;
}
.bg-slate-800 {
  background-color: #1f2937;
}

@media screen and (max-width: 1366px) {
  .main-icon {
    margin-top: -20rem; /* para pantallas de menos de 768px de ancho */
  }
  .dailycard {
    margin-top: -3.5rem;
  }
  .sidebar {
    background-image: url(@/assets/img/Cloud-background.png);
    background-size: 35rem;
    background-position: 53% 15%;
    filter: grayscale(200%) opacity(0.1) drop-shadow(0 0 0 black);
    height: 50%;
  }
}

@media screen and (min-width: 1400px) {
  .dailycard {
    margin-top: 3rem;
  }
  .sidebar {
    background-image: url(@/assets/img/Cloud-background.png);
    background-size: 50rem;
    background-position: 50% 15%;
    filter: grayscale(200%) opacity(0.1) drop-shadow(0 0 0 black);
    height: 50%;
  }
}
</style>
