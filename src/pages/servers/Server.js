/* jshint esversion: 11 */
import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../css/Button.module.css";
import styles from "../../css/Server.module.css";
import { Rating } from 'react-simple-star-rating';
import { axiosRes } from "../../api/axiosDefaults";

const Server = (props) => {
    const {
        id,
        author,
        server_address,
        server_name,
        game,
        banner,
        avg_rating,
        author_id,
        author_image,
        serverPage
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author;
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/servers/${id}`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        history.push(`/servers/${id}/edit`);
    };

    let gameTitle;
    if (game === 'se') {
        gameTitle = "Space Engineers";
    } else if (game === 'mc') {
        gameTitle = "Minecraft";
    } else {
        gameTitle = "";
    }

    return (
        <Card className={styles.Server} border="warning">
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
                <Container>
                    <hr className={styles.hr} />
                    <Button className={btnStyles.Button} onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" className={btnStyles.Button} onClick={handleDelete}>Delete</Button>
                </Container></>}
        </Card>
    );
};

export default Server
