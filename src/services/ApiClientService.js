import axios from "axios";

const apiKey = process.env.VUE_APP_API_KEY;

const apiCliente = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getTodayInfo(lat, lon) {
    try {
      let response = await apiCliente.get(
        "weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=metric&" +
          "appid=" +
          apiKey
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Hubo un problema al obtener la información del clima.");
    }
  },
};
