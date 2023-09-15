import axios from "axios";

const API_KEY = "39422970-7b6782b5257085f988eb60a82";

const BASE_URL = "https://pixabay.com/api/"

    
export async function fetchImeges(value) {
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
        return response;
    }
    catch (error) {
    console.log(error);
  }
}