import axios from "axios";

const API_KEY = "39422970-7b6782b5257085f988eb60a82";

const BASE_URL = "https://pixabay.com/api/"
    
axios.defaults.headers.common["x-api-key"] = API_KEY;