import React, { useEffect, useState } from 'react'
import JobPostingService from '../services/jobPostingService';
import { Menu, Header, Table, Icon, Button, Modal } from "semantic-ui-react";
import { toast } from 'react-toastify';

export default function PassiveJobPostingsList() {
    let jobPostingService = new JobPostingService();

    const [open, setOpen] = React.useState(false)

    const [jobPostings, setJobPostings] = useState([]);

    useEffect(() => {
        jobPostingService
            .getPassiveJobPostings()
            .then((result) => setJobPostings(result.data.data));
    }, []);

    const changePassiveJobPostingStatus = (id) => {
        jobPostingService.changeJobPostingStatus(id).then(toast.success("İş ilanı onaylandı"));
        setOpen(false);
    }

    const deleteJobPosting = (id) => {
        jobPostingService.deleteJobPostingId(id).then(toast.success("İş ilanı silindi"));
    }

    return (
        <div>
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                        <Table.HeaderCell>Sirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Sehir</Table.HeaderCell>
                        <Table.HeaderCell>Alım Sayısı</Table.HeaderCell>
                        <Table.HeaderCell>Son Basvuru Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Maas Aralıgı</Table.HeaderCell>
                        <Table.HeaderCell>Onay</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {jobPostings.map((jobPosting) => (
                        <Table.Row key={jobPosting.id}>
                            <Table.Cell>{jobPosting.jobPosition?.name}</Table.Cell>
                            <Table.Cell>{jobPosting.employer.companyName}</Table.Cell>
                            <Table.Cell>{jobPosting.city.name}</Table.Cell>
                            <Table.Cell>{jobPosting.openPositionCount}</Table.Cell>
                            <Table.Cell>{jobPosting.applicationDeadline}</Table.Cell>
                            <Table.Cell>
                                {jobPosting.minSalary} - {jobPosting.maxSalary}
                            </Table.Cell>
                            <Table.Cell>
                                <Button.Group >
                                    <Button negative onClick={(e) => deleteJobPosting(jobPosting.id)}><Icon name="trash alternate" /> Sil</Button>
                                    <Modal
                                        onClose={() => setOpen(false)}
                                        onOpen={() => setOpen(true)}
                                        open={open}
                                        trigger={<Button positive><Icon name="check" />Onayla</Button>}
                                    >
                                        <Modal.Header>İş ilanı onayı</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <p>
                                                    Bu iş ilanını onaylamak istiyormusunuz?
                                                </p>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={() => setOpen(false)}>
                                                Vazgeç
                                            </Button>
                                            <Button
                                                content="Onayla"
                                                labelPosition='right'
                                                icon='checkmark'
                                                onClick={() => setOpen(false)}
                                                onClick={() => changePassiveJobPostingStatus(jobPosting.id)}
                                                positive
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="7">
                            <Menu floated="right" pagination>
                                <Menu.Item as="a" icon>
                                    <Icon name="chevron left" />
                                </Menu.Item>
                                <Menu.Item as="a">1</Menu.Item>
                                <Menu.Item as="a">2</Menu.Item>
                                <Menu.Item as="a">3</Menu.Item>
                                <Menu.Item as="a">4</Menu.Item>
                                <Menu.Item as="a" icon>
                                    <Icon name="chevron right" />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}
