import React from "react";
import EmployerList from "../pages/EmployerList";
import Sidebar from "./Sidebar";
import { Grid } from "semantic-ui-react";
import JobSeekerList from "../pages/JobSeekerList";
import EmployeeList from "../pages/EmployeeList";
import JobPostingList from "../pages/JobPostingList";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <EmployerList />
            <JobSeekerList />
            <EmployeeList />
            <JobPostingList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
