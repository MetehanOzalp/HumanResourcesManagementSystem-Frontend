import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobPostingService from "../services/jobPostingService";
import { Button, Card } from "semantic-ui-react";

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
        <Card fluid color="green">
          <Card.Content>
            <Card.Header>{jobPosting.jobPosition?.name}</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Approve
              </Button>
              <Button basic color="red">
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
