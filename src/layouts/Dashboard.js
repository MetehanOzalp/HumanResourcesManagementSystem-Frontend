import React from "react";
import EmployerList from "../pages/EmployerList";
import Sidebar from "./Sidebar";
import { Grid } from "semantic-ui-react";
import JobSeekerList from "../pages/JobSeekerList";
import EmployeeList from "../pages/EmployeeList";
import JobPostingList from "../pages/JobPostingList";
import { Route } from "react-router";
import JobPostingDetail from "../pages/JobPostingDetail";
import JobPostingAdd from "../pages/JobPostingAdd";
import PassiveJobPostingsList from "../pages/PassiveJobPostingsList";
import { ToastContainer } from "react-toastify";
import Cv from "../pages/Cv";
import Favorites from "../pages/Favorites";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      {/* <Grid> */}
      {/* <Grid.Row> */}
      {/* <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column> */}
      {/* <Grid.Column width={12}> */}
      <Route exact path="/" component={JobPostingList} />
      <Route exact path="/jobPostings" component={JobPostingList} />
      <Route path="/jobPostings/:id" component={JobPostingDetail} />
      <Route path="/passiveJobPostings" component={PassiveJobPostingsList} />
      <Route path="/postJob/add" component={JobPostingAdd} />
      <Route path="/employers" component={EmployerList} />
      <Route path="/employees" component={EmployeeList} />
      <Route path="/jobSeekers" component={JobSeekerList} />
      <Route exact path="/cv" component={Cv} />
      <Route path="/favorites" component={Favorites} />
      {/* </Grid.Column> */}
      {/* </Grid.Row> */}
      {/* </Grid> */}
    </div>
  );
}
