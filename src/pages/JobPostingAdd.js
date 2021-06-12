import { useFormik } from 'formik'
import { Button, Form, Message } from 'semantic-ui-react'
import *as Yup from "yup"
import React, { useEffect, useState } from 'react'
import JobPostingService from '../services/jobPostingService';
import CityService from '../services/cityService';
import JobPositionService from '../services/jobPositionService';
import WayOfWorkingService from '../services/wayOfWorkingService';
import TypeOfWorkingService from '../services/typeOfWorkingService';

export default function JobPostingAdd() {

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [waysOfWorking, setWaysOfWorking] = useState([])
    const [typesOfWorking, setTypesOfWorking] = useState([])

    useEffect(() => {
        let cityService = new CityService();
        cityService.getCities().then((result) => setCities(result.data.data));
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data));
        let wayOfWorkingService = new WayOfWorkingService();
        wayOfWorkingService.getWaysOfWorking().then(result => setWaysOfWorking(result.data.data));
        let typeOfWorkingService = new TypeOfWorkingService();
        typeOfWorkingService.getTypesOfWorking().then(result => setTypesOfWorking(result.data.data));
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            jobDescription: "",
            minSalary: "",
            maxSalary: "",
            openPositionCount: "",
            applicationDeadline: "",
            typeOfWorkingId: "",
            wayOfWorkingId: "",
            employerId: "",
            jobPositionId: "",
            cityId: "",
        },
        validationSchema:
            Yup.object({
                jobDescription: Yup.string().required("Açıklama bos bırakılamaz!"),
                minSalary: Yup.number().required("Minimum maaş bırakılamaz!"),
                maxSalary: Yup.number().required("Maximum maaş bırakılamaz!"),
                openPositionCount: Yup.number().required("Açık pozisyon sayısı boş bırakılamaz!"),
                applicationDeadline: Yup.date().required("Son başvuru tarihi bos bırakılamaz!"),
                typeOfWorkingId: Yup.number().required("Çalışma türü bos bırakılamaz!"),
                wayOfWorkingId: Yup.number().required("Çalışma şekli bos bırakılamaz!"),
                employerId: Yup.number().required("İşveren boş bırakılamaz!"),
                jobPositionId: Yup.string().required("İş pozisyonu boş bırakılamaz!"),
                cityId: Yup.number().required("Şehir boş bırakılamaz!"),
            }),
        onSubmit: values => {
            let jobPostingService = new JobPostingService();
            jobPostingService.add(values).then();
        }
    });

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Açıklama</label>
                    <textarea name="jobDescription" placeholder='Açıklama' value={values.jobDescription} onChange={handleChange} />
                    {
                        errors.jobDescription && touched.jobDescription &&
                        <Message color='red'>{errors.jobDescription}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Minimum Maaş</label>
                    <input name="minSalary" placeholder='Minimum Maaş' value={values.minSalary} onChange={handleChange} />
                    {
                        errors.minSalary && touched.minSalary &&
                        <Message color='red'>{errors.minSalary}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Maksimum Maaş</label>
                    <input name="maxSalary" placeholder='Maksimum Maaş' value={values.maxSalary} onChange={handleChange} />
                    {
                        errors.maxSalary && touched.maxSalary &&
                        <Message color='red'>{errors.maxSalary}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Açık Pozisyon Sayısı</label>
                    <input name="openPositionCount" placeholder='Açık Pozisyon Sayısı' value={values.openPositionCount} onChange={handleChange} />
                    {
                        errors.openPositionCount && touched.openPositionCount &&
                        <Message color='red'>{errors.openPositionCount}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Son Başvuru Tarihi</label>
                    <input name="applicationDeadline" type="date" value={values.applicationDeadline} onChange={handleChange} />
                    {
                        errors.applicationDeadline && touched.applicationDeadline &&
                        <Message color='red'>{errors.applicationDeadline}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Çalışma Türü</label>
                    <select id="typeOfWorkingId" name="typeOfWorkingId" value={values.typeOfWorkingId} onChange={handleChange}>
                        <option value="">Çalışma türü seçiniz</option>
                        {typesOfWorking.map(typeOfWorking => (
                            <option value={typeOfWorking.id}>{typeOfWorking.name}</option>
                        ))}
                    </select>
                    {
                        errors.typeOfWorkingId && touched.typeOfWorkingId &&
                        <Message color='red'>{errors.typeOfWorkingId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Çalışma Şekli</label>
                    <select id="wayOfWorkingId" name="wayOfWorkingId" value={values.wayOfWorkingId} onChange={handleChange}>
                        <option value="">Çalışma şekli seçiniz</option>
                        {waysOfWorking.map(wayOfWorking => (
                            <option value={wayOfWorking.id}>{wayOfWorking.name}</option>
                        ))}
                    </select>
                    {
                        errors.wayOfWorkingId && touched.wayOfWorkingId &&
                        <Message color='red'>{errors.wayOfWorkingId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>İşveren</label>
                    <input id="employerId" name="employerId" value={values.employerId} onChange={handleChange} />
                    {
                        errors.employerId && touched.employerId &&
                        <Message color='red'>{errors.employerId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>İş pozisyonu</label>
                    <select id="jobPositionId" name="jobPositionId" value={values.jobPositionId} onChange={handleChange}>
                        <option value="">İş pozisyonu seçiniz</option>
                        {jobPositions.map(jobPosition => (
                            <option value={jobPosition.id}>{jobPosition.name}</option>
                        ))}
                    </select>
                    {
                        errors.jobPositionId && touched.jobPositionId &&
                        <Message color='red'>{errors.jobPositionId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Şehir</label>
                    <select id="cityId" name="cityId" value={values.cityId} onChange={handleChange}>
                        <option value="">Şehir seçiniz</option>
                        {cities.map(city => (<option key={city.id} value={city.id} selected>{city.name}</option>))}
                    </select>
                    {
                        errors.cityId && touched.cityId &&
                        <Message color='red'>{errors.cityId}</Message>
                    }
                </Form.Field>
                <Button type='submit'>İlan Ver</Button>
            </Form>
        </div>
    )
}
