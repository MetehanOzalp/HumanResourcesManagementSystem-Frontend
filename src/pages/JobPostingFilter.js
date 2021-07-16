import React, { useEffect, useState } from 'react'
import { Button, Segment, Label, Checkbox, Dropdown, Input, Form } from 'semantic-ui-react'
import CityService from "../services/cityService";
import JobPositionService from '../services/jobPositionService';
import TypeOfWorkingService from "../services/typeOfWorkingService";
import WayOfWorkingService from '../services/wayOfWorkingService';

export default function JobPostingFilter({ clickEvent }) {

    const [cities, setCities] = useState([]);
    const [typeOfWorkings, setTypeOfWorkings] = useState([])
    const [wayOfWorkings, setWayOfWorkings] = useState([])
    const [jobPositions, setJobPositions] = useState([])

    const [cityIds] = useState([])
    const [typeOfWorkingIds] = useState([])
    const [wayOfWorkingIds] = useState([])
    const [jobPositionIds] = useState([])
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);

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

    const handleJobPositionChange = (e, { value, checked }) => {
        if (checked) {
            jobPositionIds.push(value);
        } else {
            var index = jobPositionIds.indexOf(value);
            if (index !== -1) {
                jobPositionIds.splice(index, 1);
            }
        }
    }

    const handleTypeOfWorkingChange = (e, { value, checked }) => {
        if (checked) {
            typeOfWorkingIds.push(value);
        } else {
            var index = typeOfWorkingIds.indexOf(value);
            if (index !== -1) {
                typeOfWorkingIds.splice(index, 1);
            }
        }
    }

    const handleWayOfWorkingChange = (e, { value, checked }) => {
        if (checked) {
            wayOfWorkingIds.push(value);
        } else {
            var index = wayOfWorkingIds.indexOf(value);
            if (index !== -1) {
                wayOfWorkingIds.splice(index, 1);
            }
        }
    }

    const handleMinSalaryChange = (e, { value }) => {
        setMinSalary(value);
    }

    const handleMaxSalaryChange = (e, { value }) => {
        setMaxSalary(value);
    }

    return (
        <div>
            <Segment raised style={{ borderRadius: 10 }}>
                <Segment raised>
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
                <Segment raised style={{ marginTop: "1em" }}>
                    <Label attached="top" color="purple">İş Pozisyonu</Label>
                    {jobPositions.map(jobPosition => (
                        <Checkbox key={jobPosition.id} label={jobPosition.name} onChange={handleJobPositionChange} value={jobPosition.id} />))}
                </Segment>
                <Segment raised style={{ marginTop: "1em" }}>
                    <Label attached="top" color="purple">Çalışma Türü</Label>
                    {typeOfWorkings.map(typeOfWorking => (
                        <Checkbox key={typeOfWorking.id} label={typeOfWorking.name} onChange={handleTypeOfWorkingChange} value={typeOfWorking.id} style={{ marginRight: "1em" }} />))}
                </Segment>
                <Segment raised style={{ marginTop: "1em" }}>
                    <Label attached="top" color="purple">Çalışma Şekli</Label>
                    {wayOfWorkings.map(wayOfWorking => (
                        <Checkbox key={wayOfWorking.id} label={wayOfWorking.name} onChange={handleWayOfWorkingChange} value={wayOfWorking.id} />))}
                </Segment>
                <Segment raised style={{ marginTop: "1em" }}>
                    <Label attached="top" color="purple">Maaş Aralığı</Label>
                    <Form>
                        <Form.Group>
                            <Form.Input fluid label='Minimum maaş' placeholder='Minimum' onChange={handleMinSalaryChange} />
                            <Form.Input fluid label='Maksimum maaş' placeholder='Maksimum' onChange={handleMaxSalaryChange} />
                        </Form.Group>
                    </Form>
                </Segment>
                <Button fluid primary onClick={() => clickEvent({ cityId: cityIds[cityIds.length - 1], jobPositionId: jobPositionIds, typeOfWorkingId: typeOfWorkingIds, wayOfWorkingId: wayOfWorkingIds, minSalary: minSalary, maxSalary: maxSalary })}>Filtrele</Button>
            </Segment>
        </div >
    )
}
