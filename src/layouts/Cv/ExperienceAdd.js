import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label, Modal, Icon } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ExperienceAdd({ cvId }) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        //let cvService = new CvService();
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            cvId: cvId,
            businessName: "",
            positionName: "",
            startDate: "",
            endDate: "",
        },
        validationSchema:
            Yup.object({
                businessName: Yup.string().required("Şirket adı boş bırakılamaz!"),
                positionName: Yup.string().required("Pozisyon adı boş bırakılamaz!"),
                startDate: Yup.date().required("Başlama tarihi bos bırakılamaz!"),
                endDate: Yup.date()
            }),
        onSubmit: values => {
            let cvService = new CvService();
            values.cvId = cvId;
            cvService.addExperiences(values).then(toast.success("Deneyim eklendi"));
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
                <Modal.Header>Deneyim Ekle</Modal.Header>
                <Modal.Description>
                    <Form onSubmit={handleSubmit} style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "1em" }}>
                        <Grid stackable>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>İşyeri Adı</label>
                                    <input name="businessName" placeholder='İşyeri Adı' value={values.businessName} onChange={handleChange} />
                                    {
                                        errors.businessName && touched.businessName &&
                                        <Label basic color='red' pointing>
                                            {errors.businessName}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Pozisyon</label>
                                    <input name="positionName" placeholder='Pozisyon' value={values.positionName} onChange={handleChange} />
                                    {
                                        errors.positionName && touched.positionName &&
                                        <Label basic color='red' pointing>
                                            {errors.positionName}
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
