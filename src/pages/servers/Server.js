import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../css/Server.module.css";
import { Rating } from "@mui/material";

const Server = (props) => {
    const {
        id,
        author,
        server_address,
        server_name,
        game,
        banner,
        created_date,
        avg_rating,
        author_id,
        author_image,
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author

    let gameTitle
    if ({ game } === 'se') {
        gameTitle = "Space Engineers"
    } else if ({ game } === 'mc') {
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
                <Card.Text>{server_address}</Card.Text>
                <hr className={styles.hr} />
                <Rating precision={0.5} value={avg_rating} onChange={(event, newValue) => {avg_rating(newValue)}} />
                <hr className={styles.hr} />
                <Card.Text>Server Owner: <Link to={`/profiles/${author_id}`}>{author}</Link></Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Server
