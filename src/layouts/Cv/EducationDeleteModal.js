import React from 'react'
import { Icon, Button, Modal } from "semantic-ui-react";
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function EducationDeleteModal({ id }) {

    const [open, setOpen] = React.useState(false)

    const deleteEducation = () => {
        let cvService = new CvService();
        console.log(id);
        cvService.deleteEducations(id).then(toast.success("Eğitim bilgisi silindi!"));
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" negative><Icon name="trash alternate" />Sil</Button>}
            >
                <Modal.Header>Eğitim Bilgisi Sil</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Bu eğitim bilgisini silmek istiyormusunuz?
                        </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpen(false)}>
                        Vazgeç
                    </Button>
                    <Button
                        content="Evet"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setOpen(false)}
                        onClick={() => deleteEducation()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
