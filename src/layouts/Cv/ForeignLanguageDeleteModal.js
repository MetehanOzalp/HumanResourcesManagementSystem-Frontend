import React from 'react'
import { Icon, Button, Modal } from "semantic-ui-react";
import { toast } from 'react-toastify';
import CvService from '../../services/cvService';

export default function ForeignLanguageDeleteModal({ id }) {

    const [open, setOpen] = React.useState(false)

    const deleteForeignLanguage = () => {
        let cvService = new CvService();
        cvService.deleteForeignLanguages(id).then(toast.success("Yabancı dil bilgisi silindi!"));
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button floated="right" negative><Icon name="trash alternate" />Sil</Button>}
            >
                <Modal.Header>Yabancı Dil Bilgisi Sil</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Bu yabancı dil bilgisini silmek istiyormusunuz?
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
                        onClick={() => deleteForeignLanguage()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
