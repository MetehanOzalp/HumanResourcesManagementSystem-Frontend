import { useFormik } from 'formik'
import { Button, Form, Message } from 'semantic-ui-react'
import *as Yup from "yup"
import React from 'react'
import JobPostingService from '../services/jobPostingService';

export default function JobPostingAdd() {

    const { values, errors, handleChange, handleSubmit, handleReset, dirty, isSubmitting, touched } = useFormik({
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
                    <input name="jobDescription" placeholder='Açıklama' value={values.jobDescription} onChange={handleChange} />
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
                    <input name="typeOfWorkingId" value={values.typeOfWorkingId} onChange={handleChange} />
                    {
                        errors.typeOfWorkingId && touched.typeOfWorkingId &&
                        <Message color='red'>{errors.typeOfWorkingId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Çalışma Şekli</label>
                    <input name="wayOfWorkingId" value={values.wayOfWorkingId} onChange={handleChange} />
                    {
                        errors.wayOfWorkingId && touched.wayOfWorkingId &&
                        <Message color='red'>{errors.wayOfWorkingId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>İşveren</label>
                    <input name="employerId" value={values.employerId} onChange={handleChange} />
                    {
                        errors.employerId && touched.employerId &&
                        <Message color='red'>{errors.employerId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>İş pozisyonu</label>
                    <input name="jobPositionId" value={values.jobPositionId} onChange={handleChange} />
                    {
                        errors.jobPositionId && touched.jobPositionId &&
                        <Message color='red'>{errors.jobPositionId}</Message>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Şehir</label>
                    <input name="cityId" value={values.cityId} onChange={handleChange} />
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
