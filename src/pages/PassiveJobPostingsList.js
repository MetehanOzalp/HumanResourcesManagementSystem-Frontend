import React, { useEffect, useState } from 'react'
import JobPostingService from '../services/jobPostingService';
import { Menu, Table, Icon, Button } from "semantic-ui-react";

export default function PassiveJobPostingsList() {
    let jobPostingService = new JobPostingService();

    const [jobPostings, setJobPostings] = useState([]);

    useEffect(() => {
        jobPostingService
            .getPassiveJobPostings()
            .then((result) => setJobPostings(result.data.data));
    }, []);

    const changePassiveJobPostingStatus = (id) => {
        jobPostingService.changeJobPostingStatus(id).then(id + " onaylandı");
    }

    return (
        <div>
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Açıklama</Table.HeaderCell>
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
                            <Table.Cell>{jobPosting.jobDescription}</Table.Cell>
                            <Table.Cell>{jobPosting.employer.companyName}</Table.Cell>
                            <Table.Cell>{jobPosting.city.name}</Table.Cell>
                            <Table.Cell>{jobPosting.openPositionCount}</Table.Cell>
                            <Table.Cell>{jobPosting.applicationDeadline}</Table.Cell>
                            <Table.Cell>
                                {jobPosting.minSalary} - {jobPosting.maxSalary}
                            </Table.Cell>
                            <Table.Cell>
                                <Button.Group >
                                    <Button negative>Sil</Button>
                                    <Button positive onClick={(e) => changePassiveJobPostingStatus(jobPosting.id)}>Onayla</Button>
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
