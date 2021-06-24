import axios from "axios";

export default class CvService {
    getCvByJobSeekerId(jobSeekerId) {
        return axios.get(`http://localhost:8080/api/curriculumVitaes/getByJobSeekerId?getByJobSeekerId=${jobSeekerId}`);
    }
}