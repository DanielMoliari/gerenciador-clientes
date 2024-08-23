import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios.defaults.baseURL =
    process.env.MIX_APP_URL ||
    "https://gerenciador-clientes-daniel-ddcba2d51b3b.herokuapp.com/";
