import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Message, Label, Segment } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function SkillAdd() {

    const [cvId, setCvId] = useState(0);

    useEffect(() => {
        let cvService = new CvService();
        cvService.getCvByJobSeekerId(8).then((result) => setCvId(result.data.data[0].id));
    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            cvId: cvId,
            skillName: "",
        },
        validationSchema:
            Yup.object({
                skillName: Yup.string().required("Yetenek adı boş bırakılamaz!"),
            }),
        onSubmit: values => {
            let cvService = new CvService();
            values.cvId = cvId;
            cvService.addSkills(values).then(toast.success("Yetenek eklendi"));
        }
    });

    return (
        <div>
            <Segment color="blue">
                <Form onSubmit={handleSubmit}>
                    <Grid stackable>
                        <GridColumn width={7}>
                            <Form.Field>
                                <label>Yetenek Adı</label>
                                <input name="skillName" placeholder='Yetenek Adı' value={values.skillName} onChange={handleChange} />
                                {
                                    errors.skillName && touched.skillName &&
                                    <Label basic color='red' pointing>
                                        {errors.skillName}
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
