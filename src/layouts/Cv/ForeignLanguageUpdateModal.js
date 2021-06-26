import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label, Modal, Icon } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ForeignLanguageUpdateModal({ foreignLanguage }) {

    const [open, setOpen] = useState(false)

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            id: foreignLanguage.id,
            cvId: foreignLanguage.cvId,
            languageName: foreignLanguage.languageName,
            languageLevel: foreignLanguage.languageLevel,
        },
        validationSchema:
            Yup.object({
                languageName: Yup.string().required("Dil adı boş bırakılamaz!"),
                languageLevel: Yup.number().required("Dil derecesi boş bırakılamaz!")
            }),
        onSubmit: values => {
            let cvService = new CvService();
            values.cvId = foreignLanguage.cvId;
            cvService.updateForeignLanguages(values).then(toast.success("Yabancı dil bilgisi güncellendi"));
        }
    });

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" positive style={{ marginBottom: ".5em", marginRight: ".5em" }}><Icon name="pencil"></Icon>Düzenle</Button>}
            >
                <Modal.Header>Yabancı Dil Güncelle</Modal.Header>
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
                                    <input name="languageLevel" placeholder='Derece' value={values.languageLevel} onChange={handleChange} />
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
                            <Button type='submit' color="teal" style={{ marginLeft: "22em", marginTop: "1em" }}>Güncelle</Button>
                        </Modal.Actions>
                    </Form>
                </Modal.Description>
            </Modal>
        </div>
    )
}
