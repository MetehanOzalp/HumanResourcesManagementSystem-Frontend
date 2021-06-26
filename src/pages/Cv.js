import React, { useEffect, useState } from 'react'
import CvService from '../services/cvService';
import { Button, Card, Image } from "semantic-ui-react";
import EducationAdd from '../layouts/Cv/EducationAdd';
import EducationUpdateModal from '../layouts/Cv/EducationUpdateModal';
import ExperienceAdd from '../layouts/Cv/ExperienceAdd';
import ExperienceUpdateModal from '../layouts/Cv/ExperienceUpdateModal';
import ForeignLanguageAdd from '../layouts/Cv/ForeignLanguageAdd';
import ForeignLanguageUpdateModal from '../layouts/Cv/ForeignLanguageUpdateModal';
import SkillAdd from '../layouts/Cv/SkillAdd';
import SkillUpdateModal from '../layouts/Cv/SkillUpdateModal';
import EducationDeleteModal from '../layouts/Cv/EducationDeleteModal';
import ExperienceDeleteModal from '../layouts/Cv/ExperienceDeleteModal';
import SkillDeleteModal from '../layouts/Cv/SkillDeleteModal';
import ForeignLanguageDeleteModal from '../layouts/Cv/ForeignLanguageDeleteModal';

export default function Cv() {

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        let cvService = new CvService();
        cvService.getCvByJobSeekerId(8).then((result) => setCvs(result.data.data));
    }, []);

    return (
        <div>
            <Card.Group>
                {cvs.map(cv => (
                    <Card fluid color="teal" key={cv.id}>
                        <Card.Content>
                            <Image floated="left" size="medium" src={cv.imagePath} />
                            <Card.Header>{cv.jobSeeker?.firstName} {cv.jobSeeker?.lastName}</Card.Header>
                            <Card.Meta>Buraya ne gelir</Card.Meta>
                            <Card.Description>
                                {cv.coverLetter}
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Card.Content header='Kişisel Bilgiler' />
                                    <Card.Content><b>Adı: </b>{cv.jobSeeker?.firstName}</Card.Content>
                                    <Card.Content><b>Soyadı: </b>{cv.jobSeeker?.lastName}</Card.Content>
                                    <Card.Content><b>Doğum Yılı: </b>{cv.jobSeeker?.birthYear}</Card.Content>
                                    <Card.Content><b>Email: </b>{cv.jobSeeker?.email}</Card.Content>
                                </Card>
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Card.Content header='Eğitim' />
                                    {cv.jobSeekerEducations?.map(education => (
                                        <Card fluid style={{ marginTop: ".5em" }} key={education.id}>
                                            <Card.Content>
                                                <Card.Content><h4>{education.schoolName}</h4></Card.Content>
                                                <EducationUpdateModal education={education} />
                                                <EducationDeleteModal id={education.id} />
                                                <Card.Meta>{education.fieldOfStudy}</Card.Meta>
                                                <Card.Description>
                                                    <b>Derece: </b>{education.degree}
                                                    <br />
                                                    <b>Tarih: </b>{education.startDate} / {education.endDate}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                    <EducationAdd cvId={cv.id} />
                                </Card>

                                <Card fluid style={{ marginTop: ".5em" }} color="red">
                                    <Card.Content header='Deneyim' />
                                    {cv.jobSeekerExperiences.map(experience => (
                                        <Card fluid style={{ marginTop: "1em" }} key={experience.id}>
                                            <Card.Content>
                                                <Card.Content><h4>{experience.businessName}</h4></Card.Content>
                                                <ExperienceUpdateModal experience={experience} />
                                                <ExperienceDeleteModal id={experience.id} />
                                                <Card.Meta>{experience.positionName}</Card.Meta>
                                                <Card.Description>
                                                    <b>Tarih: </b>{experience.startDate} / {experience.endDate}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                    <ExperienceAdd cvId={cv.id} />
                                </Card>
                                <Card fluid style={{ marginTop: ".5em" }} color="red">
                                    <Card.Content header='Yetenekler' />
                                    {cv.jobSeekerSkills.map(skill => (
                                        <Card fluid style={{ marginTop: "1em" }} key={skill.id}>
                                            <Card.Content>
                                                <Card.Description>
                                                    <b>{skill.skillName}</b>
                                                </Card.Description>
                                                <SkillUpdateModal skill={skill} />
                                                <SkillDeleteModal id={skill.id} />
                                            </Card.Content>
                                        </Card>
                                    ))}
                                    <SkillAdd cvId={cv.id} />
                                </Card>
                                <Card fluid style={{ marginTop: ".5em" }} color="red">
                                    <Card.Content header='Yabancı Diller' />
                                    {cv.jobSeekerForeignLanguages.map(foreignLanguage => (
                                        <Card fluid style={{ marginTop: "1em" }} key={foreignLanguage.id}>
                                            <Card.Content>
                                                <Card.Description>
                                                    <b>{foreignLanguage.languageName}</b>
                                                </Card.Description>
                                                <ForeignLanguageUpdateModal foreignLanguage={foreignLanguage} />
                                                <ForeignLanguageDeleteModal id={foreignLanguage.id} />
                                                <Card.Meta>{foreignLanguage.languageLevel}</Card.Meta>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                    <ForeignLanguageAdd cvId={cv.id} />
                                </Card>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="ui two buttons">
                                <Button color="teal">
                                    Güncelle
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}
