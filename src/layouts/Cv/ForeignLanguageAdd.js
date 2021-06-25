import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Message, Label, Segment } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ForeignLanguageAdd() {

    const [cvId, setCvId] = useState(0);

    useEffect(() => {
        let cvService = new CvService();
        cvService.getCvByJobSeekerId(8).then((result) => setCvId(result.data.data[0].id));
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            cvId: cvId,
            languageName: "",
            languageLevel: "",
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
            <Segment color="blue">
                <Form onSubmit={handleSubmit}>
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
                    <Button type='submit' color="teal" style={{ marginLeft: "22em", marginTop: "1em" }}>Ekle</Button>
                </Form>
            </Segment>
        </div>
    )
}
