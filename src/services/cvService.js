import axios from "axios";

export default class CvService {
    getCvByJobSeekerId(jobSeekerId) {
        return axios.get(`http://localhost:8080/api/curriculumVitaes/getByJobSeekerId?getByJobSeekerId=${jobSeekerId}`);
    }

    addEducations(education) {
        return axios.post("http://localhost:8080/api/jobSeeerEducations/add", education);
    }

    updateEducations(updatedEducation) {
        return axios.put("http://localhost:8080/api/jobSeeerEducations/update", updatedEducation);
    }

    addExperiences(experience) {
        return axios.post("http://localhost:8080/api/jobExperiences/add", experience);
    }

    updateExperiences(updatedExperience) {
        return axios.put("http://localhost:8080/api/jobExperiences/update", updatedExperience);
    }

    addForeignLanguages(foreignLanguage) {
        return axios.post("http://localhost:8080/api/jobSeekerForeignLanguages/add", foreignLanguage);
    }

    updateForeignLanguages(updatedForeignLanguage) {
        return axios.put("http://localhost:8080/api/jobSeekerForeignLanguages/update", updatedForeignLanguage);
    }

    addSkills(skill) {
        return axios.post("http://localhost:8080/api/jobSeekerSkills/add", skill);
    }

    updateSkills(updatedSkill) {
        return axios.put("http://localhost:8080/api/jobSeekerSkills/update", updatedSkill);
    }
}