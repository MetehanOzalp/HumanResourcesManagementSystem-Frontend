import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, Form, Grid, GridColumn, Label } from "semantic-ui-react";
import { useFormik } from 'formik'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ImageUpdateModal({ cvId }) {

    useEffect(() => {
        setOpen(true);
    }, []);

    const [open, setOpen] = React.useState(false);

    const [image, setImage] = useState();

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            curriculumVitaeId: cvId,
            file: image,
        },
        validationSchema:
            Yup.object({
                curriculumVitaeId: Yup.number().required("Cv bulunamadı!"),
                file: Yup.object().required("Fotoğraf seçmelisiniz!"),
            }),
        onSubmit: values => {
            const formData = new FormData();
            formData.append("file", image, image.name);
            let cvService = new CvService();
            values.curriculumVitaeId = cvId;
            values.file = formData;
            cvService.updateImage(values).then(toast.success("Fotoğraf güncellendi!"));
        }
    });

    const fileSelectedHandler = event => {
        setImage(event.target.files[0]);
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                open={open}
            >
                <Modal.Header>Upload image</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={values.file} wrapped />
                    <Modal.Description>
                        <Form onSubmit={handleSubmit} style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "1em" }}>
                            <label>Fotoğraf seçiniz</label>
                            <input id="file-id" name="file" type="file" value={values.file} onChange={fileSelectedHandler} />
                            {
                                errors.file && touched.file &&
                                <Label basic color='red' pointing>
                                    {errors.file}
                                </Label>
                            }
                            <Modal.Actions>
                                <Button color='red' onClick={() => setOpen(false)}>
                                    Vazgeç
                                </Button>
                                <Button type='submit' color="teal" style={{ marginLeft: "22em", marginTop: "1em" }}>Güncelle</Button>
                            </Modal.Actions>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}
