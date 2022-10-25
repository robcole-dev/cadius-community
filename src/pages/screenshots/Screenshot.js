import React from "react";
import { Card, Container, Image, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../css/Button.module.css";
import styles from "../../css/Server.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import ScreenshotPage from "./ScreenshotPage";

const Screenshot = (props) => {
    const {
        id,
        author,
        title,
        description,
        image,
        author_id,
        author_image
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/screenshots/${id}`);
            history.goBack();
        } catch (err) {
            console.log(err)
        }
    };

    const handleEdit = () => {
        history.push(`/screenshots/${id}/edit`)
    }

    return (
        <Card className={styles.Server} border="warning">
            <Link to={`/screenshots/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                <Media>
                    <Link to={`/profiles/${author_id}`}>
                        <Image src={author_image} height={30}>{author}</Image>
                    </Link>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
            </Card.Body>
            {is_author && ScreenshotPage &&
            <Card.Footer>
                <Button className={btnStyles.Button} onClick={handleEdit}>Edit</Button>
                <Button variant="danger" className={btnStyles.Button} onClick={handleDelete}>Delete</Button>
            </Card.Footer>}
        </Card>
    );
};

export default Screenshot
