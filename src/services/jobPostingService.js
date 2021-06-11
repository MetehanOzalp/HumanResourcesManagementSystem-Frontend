import axios from "axios";

export default class JobPostingService {

  add(values) {
    return axios.post("http://localhost:8080/api/jobPosting/add", values);
  }

  getJobPostings() {
    return axios.get("http://localhost:8080/api/jobPosting/getByActive");
  }

  getJobPostingById(id) {
    return axios.get(`http://localhost:8080/api/jobPosting/getById?id=${id}`);
  }
}
