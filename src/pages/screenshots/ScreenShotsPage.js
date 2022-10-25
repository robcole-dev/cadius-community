import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset"

import appStyles from "../../App.module.css";
import styles from "../../css/ServersPage.module.css";
import { Link, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function ScreenshotsPage() {
    const [screenshots, setScreenshots] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const { data } = await axiosReq.get(`/screenshots/`)
                setScreenshots({ results: [data] })
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        fetchScreenshots();
    }, [pathname]);

    return (
        <Container>
            {hasLoaded ? (
                <>
                    {screenshots.results.length ? (
                        screenshots.results[0].map((screenshot) => (
                                <Row className={`h-100 border border-warning ${styles.Server}`}>
                                    <Col className={`${styles.Col}`} ><Link to={`/screenshots/${screenshot.id}`}><img src={screenshot.image} alt={screenshot.title} /></Link></Col>
                                    <Col className={`${styles.Col}`}>{screenshot.title}</Col>
                                    <Col className={`${styles.Col}`}>{screenshot.description}</Col>
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

export default ScreenshotsPage