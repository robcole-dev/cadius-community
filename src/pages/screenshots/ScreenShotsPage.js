import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import styles from "../../css/ServersPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Screenshot from "./Screenshot";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ScreenshotsPage() {
    const [screenshots, setScreenshots] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const { data } = await axiosReq.get(`/screenshots/`)
                setScreenshots(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchScreenshots();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                {hasLoaded ? (
                    <>
                        {screenshots.results.length ? (
                            <InfiniteScroll
                                children={screenshots.results.map((screenshot) => (
                                    <Screenshot key={screenshot.id} {...screenshot} setScreenshots={setScreenshots} />
                                ))}
                                dataLength={screenshots.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!screenshots.next}
                                next={() => fetchMoreData(screenshots, setScreenshots)}
                            />
                        ) : (
                            console.log('Show no results asset')
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default ScreenshotsPage