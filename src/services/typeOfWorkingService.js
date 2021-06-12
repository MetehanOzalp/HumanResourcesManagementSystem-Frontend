import axios from "axios";

export default class TypeOfWorkingService {
    getTypesOfWorking() {
        return axios.get("http://localhost:8080/api/typesOfWorking/getAll");
    }
}