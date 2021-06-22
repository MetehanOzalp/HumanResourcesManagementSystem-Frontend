import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Icon, Item, Label } from "semantic-ui-react";
import { date } from "yup/lib/locale";
import JobPostingService from "../services/jobPostingService";

export default function JobPostingList() {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobPostings()
      .then((result) => setJobPostings(result.data.data));
  }, []);

  function calculateDay(params) {
    var date = new Date().getTime();
    var params = new Date(params).getTime();
    var howManyDaysAgo = (((((date - params) / 1000) / 60) / 60) / 24);
    if (Math.floor(howManyDaysAgo) < 1) {
      return <Label color="red" tag>Yeni ilan</Label >
    } else {
      return <Label color="red"><Icon name="clock" />{Math.floor(howManyDaysAgo)} gün önce</Label>
    }
  }

  return (
    <div>
      {/* <Header size="large">İs İlanları</Header>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Açıklama</Table.HeaderCell>
            <Table.HeaderCell>Sirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Sehir</Table.HeaderCell>
            <Table.HeaderCell>Alım Sayısı</Table.HeaderCell>
            <Table.HeaderCell>Son Basvuru Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Maas Aralıgı</Table.HeaderCell>
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
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
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
      </Table> */}


      {/* <Item.Group divided>
        {jobPostings.map((jobPosting) => (
          <Item key={jobPosting.id}>
            <Item.Content>
              <Item.Header as={NavLink} to={`/jobPostings/${jobPosting.id}`}>
                {jobPosting.jobPosition.name}
              </Item.Header>
              <Item.Meta>
                <span className="cinema">
                  {jobPosting.employer.companyName}
                </span>
              </Item.Meta>
              <Item.Description>{jobPosting.jobDescription}</Item.Description>
              <Item.Extra>
                <Button
                  primary
                  floated="right"
                  as={NavLink}
                  to={`/jobPostings/${jobPosting.id}`}
                >
                  Detaylar
                  <Icon name="right chevron" />
                </Button>
                <Label>Açık pozisyon : {jobPosting.openPositionCount}</Label>
                <Label>{jobPosting.typeOfWorking?.name}</Label>
                <Label>{jobPosting.wayOfWorking?.name}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group> */}

      <Card.Group>
        {jobPostings.map(jobPosting => (
          <Card fluid key={jobPosting.id} color="teal">
            <Card.Content header={jobPosting.jobPosition.name} />
            <Card.Content description={jobPosting.jobDescription} />
            <Card.Content extra>
              <Label color="blue"><Icon name='user' />Açık pozisyon : {jobPosting.openPositionCount}</Label>
              <Label color="orange">{jobPosting.typeOfWorking?.name}</Label>
              <Label color="green">{jobPosting.wayOfWorking?.name}</Label>
              {calculateDay(jobPosting.releaseDate)}
              <Button color="teal" floated="right" as={NavLink} to={`/jobPostings/${jobPosting.id}`}>Detaylar<Icon name='right chevron' /></Button>
            </Card.Content>
          </Card>
        ))}

      </Card.Group>


    </div>
  );
}
