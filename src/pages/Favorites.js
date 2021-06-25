import React, { useEffect, useState } from 'react'
import FavoriteService from '../services/favoriteService';
import { Button, Card, Icon, Label } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

export default function Favorites() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        let favorite = new FavoriteService();
        favorite
            .getByJobSeekerId(8)
            .then((result) => setFavorites(result.data.data));
    }, []);

    function calculateDay(params) {
        var date = new Date().getTime();
        var params = new Date(params).getTime();
        var howManyDaysAgo = (((((date - params) / 1000) / 60) / 60) / 24);
        if (Math.floor(howManyDaysAgo) < 1) {
            return <Label color="red" tag>Yeni ilan</Label >
        } else {
            return <Label color="red"><Icon name="clock" />{Math.floor(howManyDaysAgo)} gün önce</Label>
        }
    }

    const deleteToFavorites = () => {
        let favoriteService = new FavoriteService();
    }

    return (
        <div>
            <Card.Group>
                {favorites.map(favorite => (
                    <Card fluid key={favorite.id} color="teal">
                        <Card.Content header={favorite.jobPosting?.jobPosition.name} />
                        <Card.Content description={favorite.jobPosting?.jobDescription} />
                        <Card.Content extra>
                            <Label color="blue"><Icon name='user' />Açık pozisyon : {favorite.jobPosting?.openPositionCount}</Label>
                            <Label color="orange">{favorite.jobPosting?.typeOfWorking?.name}</Label>
                            <Label color="green">{favorite.jobPosting?.wayOfWorking?.name}</Label>
                            {calculateDay(favorite.jobPosting?.releaseDate)}
                            <Button color="teal" floated="right" as={NavLink} to={`/jobPostings/${favorite.jobPosting.id}`}>Detaylar<Icon name='right chevron' /></Button>
                            <Button color="red" floated="right" >Favorilerden kaldır <Icon name='delete' /></Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>

        </div>
    )
}
