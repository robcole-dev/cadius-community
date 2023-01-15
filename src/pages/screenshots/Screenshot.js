import React from "react";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../css/Button.module.css";
import styles from "../../css/Screenshot.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import ProfileImage from "../../components/ProfileImage";

const Screenshot = (props) => {
    const {
        id,
        author,
        title,
        description,
        image,
        last_modified,
        author_id,
        author_image,
        screenshotPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_author = currentUser?.username === author;
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/screenshots/${id}`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        history.push(`/screenshots/${id}/edit`);
    };
    
    return (
        <Card className={styles.Screenshot} border="warning">
            <Link to={`/screenshots/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${author_id}`}>
                        <ProfileImage src={author_image} height={55} />{author}
                    </Link>
                    <div className="align-self-center">
                        <span>{last_modified}</span>
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
            </Card.Body>
            {currentUser && is_author && screenshotPage &&
                <Card.Footer>
                    <Button className={btnStyles.Button} onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" className={btnStyles.Button} onClick={handleDelete}>Delete</Button>
                </Card.Footer>}
        </Card>
    );
};

export default Screenshot