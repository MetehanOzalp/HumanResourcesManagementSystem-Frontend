import React, { useEffect, useState } from 'react'
import { Button, Segment, Label, Checkbox, Dropdown } from 'semantic-ui-react'
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
        console.log(cityIds[cityIds.length - 1]);
    }

    const handleJobPositionChange = (e, { value }) => {
        jobPositionIds.push(value);
    }

    const handleTypeOfWorkingChange = (e, { value }) => {
        typeOfWorkingIds.push(value);
    }

    const handleWayOfWorkingChange = (e, { value }) => {
        wayOfWorkingIds.push(value);
        console.log(wayOfWorkingIds);
    }

    //<Checkbox key={city.id} label={city.name} onChange={handleCityChange} value={city.id} />

    return (
        <div>
            <Segment color="blue" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="purple">Şehir</Label>
                <Dropdown
                    clearable
                    fluid
                    multiple
                    search
                    selection
                    options={cities.map((city) => {
                        return { key: city.id, value: city.id, text: city.name }
                    })}
                    onChange={handleCityChange}
                    placeholder='Sehirler'
                />
            </Segment>
            <Segment color="blue" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="purple">İş Pozisyonu</Label>
                {jobPositions.map(jobPosition => (
                    <Checkbox key={jobPosition.id} label={jobPosition.name} onChange={handleJobPositionChange} value={jobPosition.id} />))}
            </Segment>
            <Segment color="blue" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="purple">Çalışma Türü</Label>
                {typeOfWorkings.map(typeOfWorking => (
                    <Checkbox key={typeOfWorking.id} label={typeOfWorking.name} onChange={handleTypeOfWorkingChange} value={typeOfWorking.id} />))}
            </Segment>
            <Segment color="blue" raised style={{ marginTop: "1em" }}>
                <Label attached="top" color="purple">Çalışma Şekli</Label>
                {wayOfWorkings.map(wayOfWorking => (
                    <Checkbox key={wayOfWorking.id} label={wayOfWorking.name} onChange={handleWayOfWorkingChange} value={wayOfWorking.id} />))}
            </Segment>
            <Button fluid primary onClick={() => clickEvent({ cityId: cityIds[cityIds.length - 1], jobPositionId: jobPositionIds, typeOfWorkingId: typeOfWorkingIds, wayOfWorkingId: wayOfWorkingIds })}>Filtrele</Button>
        </div>
    )
}