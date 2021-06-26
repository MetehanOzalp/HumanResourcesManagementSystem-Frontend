import React, { useEffect, useState } from 'react'
import { Button, Segment, Label, Checkbox } from 'semantic-ui-react'
import CityService from "../services/cityService";
import JobPositionService from '../services/jobPositionService';
import TypeOfWorkingService from "../services/typeOfWorkingService";
import WayOfWorkingService from '../services/wayOfWorkingService';

export default function JobPostingFilter({ clickEvent }) {

    const [cities, setCities] = useState([]);
    const [typeOfWorkings, setTypeOfWorkings] = useState([])
    const [wayOfWorkings, setWayOfWorkings] = useState([])
    const [jobPositions, setJobPositions] = useState([])

    const [cityIds, setCityIds] = useState([])
    const [typeOfWorkingIds, setTypeOfWorkingIds] = useState([])
    const [wayOfWorkingIds, setWayOfWorkingIds] = useState([])
    const [jobPositionIds, setJobPositionIds] = useState([])

    useEffect(() => {
        let cityService = new CityService();
        cityService.getCities().then((result) => setCities(result.data.data));

        let typeOfWorkingService = new TypeOfWorkingService();
        typeOfWorkingService.getTypesOfWorking().then((result) => setTypeOfWorkings(result.data.data));

        let wayOfWorkingService = new WayOfWorkingService();
        wayOfWorkingService.getWaysOfWorking().then((result) => setWayOfWorkings(result.data.data));

        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    }, []);

    const handleCityChange = (e, { value }) => {
        cityIds.push(value);
    }

    const handleJobPositionChange = (e, { value }) => {
        jobPositionIds.push(value);
    }

    const handleTypeOfWorkingChange = (e, { value }) => {
        typeOfWorkingIds.push(value);
    }

    const handleWayOfWorkingChange = (e, { value }) => {
        wayOfWorkingIds.push(value);
    }

    return (
        <div>
            <Segment color="purple" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="blue">Şehir</Label>
                {cities.map(city => (
                    <Checkbox key={city.id} label={city.name} onChange={handleCityChange} value={city.id} />))}
            </Segment>
            <Segment color="purple" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="blue">İş Pozisyonu</Label>
                {jobPositions.map(jobPosition => (
                    <Checkbox key={jobPosition.id} label={jobPosition.name} onChange={handleJobPositionChange} value={jobPosition.id} />))}
            </Segment>
            <Segment color="purple" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="blue">Çalışma Türü</Label>
                {typeOfWorkings.map(typeOfWorking => (
                    <Checkbox key={typeOfWorking.id} label={typeOfWorking.name} onChange={handleTypeOfWorkingChange} value={typeOfWorking.id} />))}
            </Segment>
            <Segment color="purple" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="blue">Çalışma Şekli</Label>
                {wayOfWorkings.map(wayOfWorking => (
                    <Checkbox key={wayOfWorking.id} label={wayOfWorking.name} onChange={handleWayOfWorkingChange} value={wayOfWorking.id} />))}
            </Segment>
            <Button fluid color="teal" onClick={() => clickEvent({ cityId: cityIds, jobPositionId: jobPositionIds, typeOfWorkingId: typeOfWorkingIds, wayOfWorkingId: wayOfWorkingIds })}>Filtrele</Button>
        </div>
    )
}
