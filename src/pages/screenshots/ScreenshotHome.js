import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../css/Screenshot.module.css";

const ScreenshotHome = (props) => {
    const {
        id,
        title,
    } = props;
    
    return (
        <Card className={styles.ScreenshotHome} border="warning">
            <Link to={`/screenshots/${id}`}>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            </Link>
        </Card>
    );
};

export default ScreenshotHome