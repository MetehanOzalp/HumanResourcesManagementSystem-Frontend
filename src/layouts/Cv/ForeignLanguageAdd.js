import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label, Modal, Icon, Rating } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ForeignLanguageAdd({ cvId }) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        //let cvService = new CvService();
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            cvId: cvId,
            languageName: "",
            languageLevel: 1,
        },
        validationSchema:
            Yup.object({
                languageName: Yup.string().required("Dil adı boş bırakılamaz!"),
                languageLevel: Yup.number().required("Dil derecesi boş bırakılamaz!")
            }),
        onSubmit: values => {
            let cvService = new CvService();
            values.cvId = cvId;
            cvService.addForeignLanguages(values).then(toast.success("Yabancı dil eklendi"));
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
                <Modal.Header>Yabancı Dil Ekle</Modal.Header>
                <Modal.Description>
                    <Form onSubmit={handleSubmit} style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "1em" }}>
                        <Grid stackable>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Dil Adı</label>
                                    <input name="languageName" placeholder='Dil Adı' value={values.languageName} onChange={handleChange} />
                                    {
                                        errors.languageName && touched.languageName &&
                                        <Label basic color='red' pointing>
                                            {errors.languageName}
                                        </Label>
                                    }
                                </Form.Field>
                            </GridColumn>
                            <GridColumn width={7}>
                                <Form.Field>
                                    <label>Derece</label>
                                    <input type='range'
                                        defaultValue={0}
                                        min={1}
                                        max={5}
                                        value={values.languageLevel} name="languageLevel" onChange={handleChange} />
                                    <br></br>
                                    <Rating icon="star" size="huge" rating={values.languageLevel} maxRating={5} />
                                    {
                                        errors.languageLevel && touched.languageLevel &&
                                        <Label basic color='red' pointing>
                                            {errors.languageLevel}
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
        </div >
    )
}
