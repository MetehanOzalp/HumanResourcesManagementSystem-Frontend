import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Icon, Label, Pagination, Grid, Loader } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import JobPostingFilter from "./JobPostingFilter";
import FavoriteService from "../services/favoriteService";
import { toast } from "react-toastify";

export default function JobPostingList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [jobPostingFilter, setJobPostingFilter] = useState({});
  const [favorites, setFavorites] = useState([]);

  let jobPostingService = new JobPostingService();
  let favoriteService = new FavoriteService();

  useEffect(() => {
    jobPostingService
      .getPageableAndFilterJobPostings(activePage, jobPostingFilter)
      .then((result) => setJobPostings(result.data.data));
    favoriteService.getByJobSeekerId(8).then(result => setFavorites(result.data.data));
  }, [jobPostingFilter]);

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

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
    jobPostingService.getPageableAndFilterJobPostings(activePage, jobPostingFilter).then((result) => setJobPostings(result.data.data));
  }

  const handleJobPostingFilterClick = (jobPostingFilter) => {
    if (!jobPostingFilter.cityId || jobPostingFilter.cityId.length === 0) {
      jobPostingFilter.cityId = null;
    }
    if (jobPostingFilter.jobPositionId.length === 0) {
      jobPostingFilter.jobPositionId = null;
    }
    if (jobPostingFilter.typeOfWorkingId.length === 0) {
      jobPostingFilter.typeOfWorkingId = null;
    }
    if (jobPostingFilter.wayOfWorkingId.length === 0) {
      jobPostingFilter.wayOfWorkingId = null;
    }
    console.log(jobPostingFilter);
    setJobPostingFilter(jobPostingFilter);
  }

  const addToFavorites = (jobPostingId) => {
    const favorite = {
      userId: 8,
      jobPostingId: jobPostingId
    };
    favoriteService.add(favorite).then(toast.success("Favorilere eklendi!"));
  }

  const deleteToFavorites = (jobPostingId) => {
    favoriteService.delete(jobPostingId).then(toast.warning("Favorilerden silindi!"));
  }

  const checkIfFavoritesAdded = (id) => {
    var jobSeekerFavorites = favorites.find(f => f.jobPostingId === id);
    if (jobSeekerFavorites) {
      return <Button onClick={() => deleteToFavorites(jobSeekerFavorites.id)} inverted basic circular floated="right" style={{ marginLeft: "17em" }}><Icon name="heart" color="red" size="large"></Icon></Button>
    } else {
      return <Button onClick={() => addToFavorites(id)} inverted basic circular floated="right" style={{ marginLeft: "17em" }}><Icon name="heart outline" color="red" size="large"></Icon></Button>
    }
  }

  return (
    <div>
      {jobPostings.length > 0 ?
        <Grid>
          <Grid.Column width={4}>
            <JobPostingFilter clickEvent={handleJobPostingFilterClick} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Group>
              {jobPostings.map(jobPosting => (
                <Card as={NavLink} to={`/jobPostings/${jobPosting.id}`} fluid key={jobPosting.id} color="teal" style={{ borderRadius: 10 }}>
                  <Grid>
                    <Grid.Column width={8}>
                      <Card.Header><h3 style={{ color: "black", marginTop: ".5em", marginLeft: ".8em" }}>{jobPosting.jobPosition.name}</h3></Card.Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      {checkIfFavoritesAdded(jobPosting.id)}
                    </Grid.Column>
                  </Grid>

                  <Card.Content description={jobPosting.jobDescription} />
                  <Card.Content extra>
                    <Label color="blue"><Icon name='user' />Açık pozisyon : {jobPosting.openPositionCount}</Label>
                    <Label color="orange">{jobPosting.typeOfWorking?.name}</Label>
                    <Label color="green">{jobPosting.wayOfWorking?.name}</Label>
                    {calculateDay(jobPosting.releaseDate)}
                    <Button color="teal" floated="right" style={{ borderRadius: 10 }}>Detaylar<Icon name='right chevron' /></Button>
                  </Card.Content>
                </Card>
              ))}
              <Pagination
                defaultActivePage={1}
                pointing
                secondary
                totalPages={3}
                onPageChange={handlePageChange}
              />
              {/* <Pagination defaultActivePage={5} totalPages={10} onPageChange={() => (handlePageChange)} /> */}
            </Card.Group>
          </Grid.Column>
        </Grid> : <Loader active inline='centered' />}

    </div >
  );
}
