import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobPostingService from "../services/jobPostingService";
import { Button, Card, Icon } from "semantic-ui-react";

export default function JobPostingDetail() {
  let { id } = useParams();

  const [jobPosting, setJobPosting] = useState({});

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobPostingById(id)
      .then((result) => setJobPosting(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
        <Card fluid color="teal">
          <Card.Content>
            <Card.Header>{jobPosting.jobPosition?.name}</Card.Header>
            <Card.Meta>{jobPosting.employer?.companyName}</Card.Meta>
            <Card.Description>
              {jobPosting.jobDescription}
              <Card fluid style={{ marginTop: "1em" }}>
                <Card.Content header='Pozisyon Bilgileri' />
                <Card.Content><b>Pozisyon: </b>{jobPosting.jobPosition?.name}</Card.Content>
                <Card.Content><b>Maas skalası: </b>{jobPosting.minSalary} - {jobPosting.maxSalary}</Card.Content>
                <Card.Content><b>Alım sayısı: </b>{jobPosting.openPositionCount}</Card.Content>
                <Card.Content><Icon name="map marker alternate" /><b>Sehir: </b>{jobPosting.city?.name}</Card.Content>
                <Card.Content><b>Çalısma türü: </b>{jobPosting.typeOfWorking?.name}</Card.Content>
                <Card.Content><b>Çalısma sekli: </b>{jobPosting.wayOfWorking?.name}</Card.Content>
                <Card.Content><Icon name="time" /><b>Son basvuru tarihi: </b>{jobPosting.applicationDeadline}</Card.Content>
              </Card>
              <Card fluid style={{ marginTop: "1em" }}>
                <Card.Content header='İsveren Bilgileri' />
                <Card.Content><Icon name="mail" /><b>Email: </b>{jobPosting.employer?.email}</Card.Content>
                <Card.Content><b>Sirket adı: </b>{jobPosting.employer?.companyName}</Card.Content>
                <Card.Content><b>Web site: </b>{jobPosting.employer?.webSite}</Card.Content>
                <Card.Content><Icon name="phone" /><b>Telefon numarası: </b>{jobPosting.employer?.phoneNumber}</Card.Content>
              </Card>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button color="teal">
                Basvur
              </Button>
              <Button color="red">
                Favorilere Ekle
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
