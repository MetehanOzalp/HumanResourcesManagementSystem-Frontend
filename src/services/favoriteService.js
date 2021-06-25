import axios from "axios";

export default class FavoriteService {
    add(favorite) {
        return axios.post("http://localhost:8080/api/favorites/add", favorite);
    }

    getByJobSeekerId(id) {
        return axios.get(`http://localhost:8080/api/favorites/getByJobSeekerId?id=${id}`);
    }
}