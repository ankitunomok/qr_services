import axios from "axios";

export function setAxiosDefault() {
  axios.defaults.timeout = 30 * 1000;
  axios.defaults.baseURL =
    "https://portals.sproxil.us/sws/services/api/v0/pin";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
}
