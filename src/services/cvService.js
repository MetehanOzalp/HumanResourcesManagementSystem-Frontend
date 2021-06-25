import axios from "axios";

export default class CvService {
    getCvByJobSeekerId(jobSeekerId) {
        return axios.get(`http://localhost:8080/api/curriculumVitaes/getByJobSeekerId?getByJobSeekerId=${jobSeekerId}`);
    }

    addEducations(education) {
        return axios.post("http://localhost:8080/api/jobSeeerEducations/add", education);
    }

    addExperiences(experience) {
        return axios.post("http://localhost:8080/api/jobExperiences/add", experience);
    }

    addForeignLanguages(foreignLanguage) {
        return axios.post("http://localhost:8080/api/jobSeekerForeignLanguages/add", foreignLanguage);
    }

    addSkills(skill) {
        return axios.post("http://localhost:8080/api/jobSeekerSkills/add", skill);
    }
}