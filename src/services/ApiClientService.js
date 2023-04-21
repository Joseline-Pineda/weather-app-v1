import axios from "axios";
const apiKey = process.env.VUE_APP_API_KEY;

const apiCliente = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey,
    },
});

export default {
    getTodayInfo(lat, lon) {
        return apiCliente.get(
            "weather?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=6ac7cc5ef159eb0ca2eb7aff5a1d2ee7&units=metric"
        );
    },
};
