/* jshint esversion: 11 */
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../css/Server.module.css";

const ServerProfile = (props) => {
    const {
        id,
        server_name,
        banner
    } = props;

    return (
        <Card className={styles.ServerProfile} border="warning">
            <Link to={`/servers/${id}`}>
                <Card.Img src={banner} alt={server_name} />
            </Link>
            <Card.Title>{server_name}</Card.Title>
        </Card>
    );
};

export default ServerProfile
