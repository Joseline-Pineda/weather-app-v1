import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#1E213A",
        secondary: "#100E1D",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
    dark: true,
  },
  icons: {
    iconfont: "fa",
  },
});
