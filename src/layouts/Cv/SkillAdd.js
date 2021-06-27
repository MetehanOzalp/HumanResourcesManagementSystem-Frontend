import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label, Modal, Icon } from 'semantic-ui-react'
import *as Yup from "yup"
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function SkillAdd({ cvId }) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        //let cvService = new CvService();
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
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" color="blue" style={{ marginBottom: ".5em", marginRight: ".5em" }}><Icon name="add"></Icon>Ekle</Button>}
            >
                <Modal.Header>Yetenek Ekle</Modal.Header>
                <Modal.Description>
                    <Form onSubmit={handleSubmit} style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "1em" }}>
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
