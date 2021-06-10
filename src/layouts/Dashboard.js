import React from "react";
import EmployerList from "../pages/EmployerList";
import Sidebar from "./Sidebar";
import { Grid } from "semantic-ui-react";
import JobSeekerList from "../pages/JobSeekerList";
import EmployeeList from "../pages/EmployeeList";
import JobPostingList from "../pages/JobPostingList";
import { Route } from "react-router";
import JobPostingDetail from "../pages/JobPostingDetail";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path="/" component={JobPostingList} />
            <Route exact path="/jobPostings" component={JobPostingList} />
            <Route exact path="/jobPostings/:id" component={JobPostingDetail} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/jobSeekers" component={JobSeekerList} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
