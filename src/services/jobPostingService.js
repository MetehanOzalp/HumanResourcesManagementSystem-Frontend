import axios from "axios";

export default class JobPostingService {

  add(values) {
    return axios.post("http://localhost:8080/api/jobPosting/add", values);
  }

  getJobPostings() {
    return axios.get("http://localhost:8080/api/jobPosting/getByActive");
  }

  getPassiveJobPostings() {
    return axios.get("http://localhost:8080/api/jobPosting/getByPassive");
  }

  getJobPostingById(id) {
    return axios.get(`http://localhost:8080/api/jobPosting/getById?id=${id}`);
  }

  changeJobPostingStatus(id) {
    return axios.post(`http://localhost:8080/api/jobPosting/changeStatus?jobPostingId=${id}`);
  }

  deleteJobPostingId(id) {
    return axios.post(`http://localhost:8080/api/jobPosting/delete?jobPostingId=${id}`);
  }
}
