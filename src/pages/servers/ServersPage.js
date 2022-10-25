import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset"

import appStyles from "../../App.module.css";
import styles from "../../css/ServersPage.module.css";
import { Link, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";

function ServersPage() {
    const [servers, setServers] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const { data } = await axiosReq.get(`/servers/`)
                setServers({ results: [data] })
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        fetchServers();
    }, [pathname]);

    return (
        <Container>
            <p className={styles.Intro}>Below is a list of server that user have added</p>
            {hasLoaded ? (
                <>
                    {servers.results.length ? (
                        servers.results[0].map((server, idx) => (
                                <Row key={idx} className={`h-100 border border-warning ${styles.Server}`}>
                                    <Col className={`${styles.Col}`} ><Link to={`/servers/${server.id}`}><img src={server.banner} alt={server.server_name} /></Link></Col>
                                    {server.game === 'se' && <Col className={`${styles.Col}`}>Space Engineers</Col>}
                                    {server.game === 'mc' && <Col className={`${styles.Col}`}>Minecraft</Col>}
                                    <Col className={`${styles.Col}`}>{server.server_name}</Col>
                                    <Col className={`${styles.Col}`}>{server.server_address}</Col>
                                    <Col className={`${styles.Col}`}><Rating initialValue={server.avg_rating} readonly={true} /></Col>
                                </Row>
                        ))
                    ) : (
                        console.log('Show no results asset')
                    )}
                </>
            ) : (
                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
            )}

        </Container>
    );
}

export default ServersPage