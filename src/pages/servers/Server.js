import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../css/Server.module.css";
import { Rating } from 'react-simple-star-rating';

const Server = (props) => {
    const {
        author,
        server_address,
        server_name,
        game,
        banner,
        avg_rating,
        author_id,
        author_image,
        serverPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author

    let gameTitle;
    console.log(game)
    if (game === 'se') {
        gameTitle = "Space Engineers"
    } else if ( game  === 'mc') {
        gameTitle = "Minecraft"
    } else {
        gameTitle = ""
    }

    return (
        <Card className="bg-dark text-white text-center justify-content-center">
            <Card.Img src={banner} alt={server_name} />
            <Card.Body>
                <Card.Title>{server_name}</Card.Title>
                <hr className={styles.hr} />
                <Card.Text>{gameTitle}</Card.Text>
                <hr className={styles.hr} />
                <Card.Text>{server_address}</Card.Text>
                <hr className={styles.hr} />
                <Rating initialValue={avg_rating} readonly={true} />
                <hr className={styles.hr} />
                <Card.Text>Server Owner: <Link to={`/profiles/${author_id}`}>{author_image}{author}</Link></Card.Text>
            </Card.Body>
            {is_author && serverPage && <>
                <hr className={styles.hr} />
                Edit Delete</>}
        </Card>


    )
}

export default Server
