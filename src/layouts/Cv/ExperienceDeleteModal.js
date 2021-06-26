import React from 'react'
import { Icon, Button, Modal } from "semantic-ui-react";
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ExperienceDeleteModal({ id }) {

    const [open, setOpen] = React.useState(false)

    const deleteExperience = () => {
        let cvService = new CvService();
        cvService.deleteExperiences(id).then(toast.success("Deneyim bilgisi silindi!"));
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" negative><Icon name="trash alternate" />Sil</Button>}
            >
                <Modal.Header>Deneyim Bilgisi Sil</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Bu deneyim bilgisini silmek istiyormusunuz?
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
                        onClick={() => deleteExperience()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
