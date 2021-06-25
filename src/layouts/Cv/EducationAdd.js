import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label, Segment, Modal, Icon } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function EducationAdd({cvId}) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        let cvService = new CvService();
        // cvService.getCvByJobSeekerId(8).then((result) => setCvId(result.data.data[0].id));
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            cvId: cvId,
            schoolName: "",
            fieldOfStudy: "",
            degree: "",
            startDate: "",
            endDate: "",
        },
        validationSchema:
            Yup.object({
                schoolName: Yup.string().required("Okul adı boş bırakılamaz!"),
                fieldOfStudy: Yup.string().required("Bölüm boş bırakılamaz!"),
                degree: Yup.string().required("Derece boş bırakılamaz!"),
                startDate: Yup.date().required("Başlama tarihi bos bırakılamaz!"),
                endDate: Yup.date()
            }),
        onSubmit: values => {
            let cvService = new CvService();
            values.cvId = cvId;
            cvService.addEducations(values).then(toast.success("Eğitim eklendi"));
        }
    });

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" color="blue" style={{ marginBottom: ".5em", marginRight: ".5em" }}><Icon name="add"></Icon>Ekle</Button>}
            >
                <Modal.Header>Eğitim Ekle</Modal.Header>
                <Modal.Description>
                    <Form onSubmit={handleSubmit} style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "1em" }}>
                        <Grid stackable>
                            <GridColumn width={14}>
                                <Form.Field>
                                    <label>Okul Adı</label>
                                    <input name="schoolName" placeholder='Okul Adı' value={values.schoolName} onChange={handleChange} />
                                    {
                                        errors.schoolName && touched.schoolName &&
                                        <Label basic color='red' pointing>
                                            {errors.schoolName}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Bölüm Adı</label>
                                    <input name="fieldOfStudy" placeholder='Bölüm Adı' value={values.fieldOfStudy} onChange={handleChange} />
                                    {
                                        errors.fieldOfStudy && touched.fieldOfStudy &&
                                        <Label basic color='red' pointing>
                                            {errors.fieldOfStudy}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Derece</label>
                                    <input name="degree" placeholder='Derece' value={values.degree} onChange={handleChange} />
                                    {
                                        errors.degree && touched.degree &&
                                        <Label basic color='red' pointing>
                                            {errors.degree}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Başlama Tarihi</label>
                                    <input name="startDate" type="date" value={values.startDate} onChange={handleChange} />
                                    {
                                        errors.startDate && touched.startDate &&
                                        <Label basic color='red' pointing>
                                            {errors.startDate}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Bitiş Tarihi</label>
                                    <input name="endDate" type="date" value={values.endDate} onChange={handleChange} />
                                    {
                                        errors.endDate && touched.endDate &&
                                        <Label basic color='red' pointing>
                                            {errors.endDate}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                        </Grid>
                        <Modal.Actions>
                            <Button color='red' onClick={() => setOpen(false)}>
                                Vazgeç
                            </Button>
                            <Button type='submit' color="teal" style={{ marginLeft: "22em", marginTop: "1em" }}>Ekle</Button>
                        </Modal.Actions>
                    </Form>
                </Modal.Description>
            </Modal>
        </div>
    )
}
