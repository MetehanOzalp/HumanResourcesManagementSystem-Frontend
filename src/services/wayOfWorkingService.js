import axios from "axios";

export default class WayOfWorkingService {
    getWaysOfWorking() {
        return axios.get("http://localhost:8080/api/waysOfWorking/getAll");
    }
}