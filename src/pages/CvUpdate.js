import React from 'react'
import Cv from "../pages/Cv";
import EducationAdd from "../layouts/Cv/EducationAdd";
import ExperienceAdd from "../layouts/Cv/ExperienceAdd";
import { Grid } from 'semantic-ui-react'
import ForeignLanguageAdd from '../layouts/Cv/ForeignLanguageAdd';
import SkillAdd from '../layouts/Cv/SkillAdd';

export default function CvUpdate() {
    return (
        <div>
            <Grid>
                <Grid.Column width="8">
                    <EducationAdd />
                    <ExperienceAdd />
                    <ForeignLanguageAdd />
                    <SkillAdd />
                </Grid.Column>
                <Grid.Column width="8">
                    <Cv />
                </Grid.Column>
            </Grid>

        </div>
    )
}
