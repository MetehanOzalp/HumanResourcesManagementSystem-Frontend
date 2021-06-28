import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobPostingService from "../services/jobPostingService";
import { Button, Card, Icon } from "semantic-ui-react";
import FavoriteService from "../services/favoriteService";
import { toast } from "react-toastify";

export default function JobPostingDetail() {
  let { id } = useParams();

  const [jobPosting, setJobPosting] = useState({});

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobPostingById(id)
      .then((result) => setJobPosting(result.data.data));
  }, []);

  const addToFavorites = () => {
    let favoriteService = new FavoriteService();
    const favorite = {
      userId: 8,
      jobPostingId: id
    }
    favoriteService.add(favorite).then(toast.success("Favorilere eklendi"))
  }

  function calculateHowManyDaysLeft(params) {
    var nowDate = new Date();
    var todayDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
    var applicationDeadline = new Date(params).getTime();
    var date = new Date(todayDate).getTime();
    var remaniningTime = (((((applicationDeadline - date) / 1000) / 60) / 60) / 24);
    if (remaniningTime >= 0 && remaniningTime < 1) {
      return <Card.Content><Icon name="time" /><b>Son basvuru tarihi: </b>Son gün<Icon name="warning" color="red" /></Card.Content>
    } else if (remaniningTime >= 1) {
      return <Card.Content><Icon name="time" /><b>Son basvuru tarihi: </b>{Math.floor(remaniningTime)} gün sonra ({params})</Card.Content>
    } else {
      return <Card.Content><Icon name="time" /><b>Son basvuru tarihi: </b>İlan süresi doldu<Icon name="warning" color="red" /></Card.Content>
    }
  }

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
                {calculateHowManyDaysLeft(jobPosting.applicationDeadline)}
              </Card>
              <Card fluid style={{ marginTop: "1em" }}>
                <Card.Content header='İsveren Bilgileri' />
                <Card.Content><Icon name="mail" /><b>Email: </b>{jobPosting.employer?.email}</Card.Content>
                <Card.Content><Icon name="building"></Icon><b>Sirket adı: </b>{jobPosting.employer?.companyName}</Card.Content>
                <Card.Content><Icon name="world" /><b>Web site: </b>{jobPosting.employer?.webSite}</Card.Content>
                <Card.Content><Icon name="phone" /><b>Telefon numarası: </b>{jobPosting.employer?.phoneNumber}</Card.Content>
              </Card>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button color="teal">
                Basvur
              </Button>
              <Button color="red" onClick={() => addToFavorites()}>
                Favorilere Ekle
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
