/* jshint esversion: 11 */
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../css/Server.module.css";

const ServerHome = (props) => {
    const {
        id,
        server_name,
    } = props;

    return (
        <Card className={styles.ServerHome} border="warning">
            <Link to={`/servers/${id}`}>
                <Card.Title>{server_name}</Card.Title>
            </Link>
        </Card>
    );
};

export default ServerHome
