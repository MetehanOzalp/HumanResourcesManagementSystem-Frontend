import React, { useEffect, useState } from 'react'
import CvService from '../services/cvService';
import { Button, Card, Image, Rating, Grid, Icon } from "semantic-ui-react";
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
import { Link, NavLink } from "react-router-dom";

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
                            <Grid>
                                <Grid.Column width={5}>
                                    <Image floated="left" size="medium" src={cv.imagePath} />
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Card.Header><h2>{cv.jobSeeker?.firstName} {cv.jobSeeker?.lastName}</h2></Card.Header>
                                    <Card.Description style={{ marginTop: ".5em" }}>{cv.coverLetter}</Card.Description>
                                    <Card.Description style={{ marginTop: ".5em" }}><a href={cv.githubLink} target="_blank" style={{ color: "black" }}><Icon name="github" size="big" /><b>Github</b></a></Card.Description>
                                    <Card.Description style={{ marginTop: ".5em" }}><a href={cv.linkedinLink} target="_blank" style={{ color: "black" }}><Icon name="linkedin" color="blue" size="big" /><b>Linkedin</b></a></Card.Description>
                                </Grid.Column>
                            </Grid>
                            <Card.Description>
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Card.Content header='Kişisel Bilgiler' />
                                    <Card.Content><b>Adı: </b>{cv.jobSeeker?.firstName}</Card.Content>
                                    <Card.Content><b>Soyadı: </b>{cv.jobSeeker?.lastName}</Card.Content>
                                    <Card.Content><b>Doğum Yılı: </b>{cv.jobSeeker?.birthYear}</Card.Content>
                                    <Card.Content><b>Email: </b>{cv.jobSeeker?.email}</Card.Content>
                                </Card>
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Card.Header><h3 style={{ marginTop: ".5em", marginLeft: ".8em", color: "black" }}>Eğitim</h3></Card.Header>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Card.Content style={{ marginTop: ".5em", marginLeft: ".8em" }}><EducationAdd cvId={cv.id} /></Card.Content>
                                        </Grid.Column>
                                    </Grid>
                                    {cv.jobSeekerEducations?.map(education => (
                                        <Card fluid style={{ marginTop: ".5em" }} key={education.id}>
                                            <Card.Content>
                                                <Grid>
                                                    <Grid.Column width={8}>
                                                        <Card.Content><h4>{education.schoolName}</h4></Card.Content>
                                                        <Card.Meta>{education.fieldOfStudy}</Card.Meta>
                                                        <Card.Description>
                                                            <b>Derece: </b>{education.degree}
                                                            <br />
                                                            <b>Tarih: </b>{education.startDate} / {education.endDate}
                                                        </Card.Description>
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                        <EducationUpdateModal education={education} />
                                                        <EducationDeleteModal id={education.id} />
                                                    </Grid.Column>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card>

                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Card.Header><h3 style={{ marginTop: ".5em", marginLeft: ".8em", color: "black" }}>Deneyim</h3></Card.Header>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Card.Content style={{ marginTop: ".5em", marginLeft: ".8em" }}><ExperienceAdd cvId={cv.id} /></Card.Content>
                                        </Grid.Column>
                                    </Grid>
                                    {cv.jobSeekerExperiences.map(experience => (
                                        <Card fluid style={{ marginTop: "1em" }} key={experience.id}>
                                            <Card.Content>
                                                <Grid>
                                                    <Grid.Column width={8}>
                                                        <Card.Content><h4>{experience.businessName}</h4></Card.Content>
                                                        <Card.Meta>{experience.positionName}</Card.Meta>
                                                        <Card.Description>
                                                            <b>Tarih: </b>{experience.startDate} / {experience.endDate}
                                                        </Card.Description>
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                        <ExperienceUpdateModal experience={experience} />
                                                        <ExperienceDeleteModal id={experience.id} />
                                                    </Grid.Column>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card>
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Card.Header><h3 style={{ marginTop: ".5em", marginLeft: ".8em", color: "black" }}>Yetenekler</h3></Card.Header>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Card.Content style={{ marginTop: ".5em", marginLeft: ".8em" }}><SkillAdd cvId={cv.id} /></Card.Content>
                                        </Grid.Column>
                                    </Grid>
                                    {cv.jobSeekerSkills.map(skill => (
                                        <Card fluid style={{ marginTop: "1em" }} key={skill.id}>
                                            <Card.Content>
                                                <Grid>
                                                    <Grid.Column width={8}>
                                                        <Card.Description>
                                                            <b>{skill.skillName}</b>
                                                        </Card.Description>
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                        <SkillUpdateModal skill={skill} />
                                                        <SkillDeleteModal id={skill.id} />
                                                    </Grid.Column>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card>
                                <Card fluid style={{ marginTop: "1em" }} color="red">
                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Card.Header><h3 style={{ marginTop: ".5em", marginLeft: ".8em", color: "black" }}>Yabancı Diller</h3></Card.Header>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Card.Content style={{ marginTop: ".5em", marginLeft: ".8em" }}><ForeignLanguageAdd cvId={cv.id} /></Card.Content>
                                        </Grid.Column>
                                    </Grid>
                                    {cv.jobSeekerForeignLanguages.map(foreignLanguage => (
                                        <Card fluid style={{ marginTop: "1em" }} key={foreignLanguage.id}>
                                            <Card.Content>
                                                <Grid>
                                                    <Grid.Column width={8}>
                                                        <Card.Description>
                                                            <b>{foreignLanguage.languageName}</b>
                                                            <Rating maxRating={5} defaultRating={foreignLanguage.languageLevel} icon='star' size='large' disabled />
                                                        </Card.Description>
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                        <ForeignLanguageUpdateModal foreignLanguage={foreignLanguage} />
                                                        <ForeignLanguageDeleteModal id={foreignLanguage.id} />
                                                    </Grid.Column>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    ))}
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
