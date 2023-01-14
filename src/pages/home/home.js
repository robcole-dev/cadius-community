import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import style from "../../css/Home.module.css";
import ServerHome from "../servers/ServerHome";
import ScreenshotHome from "../screenshots/ScreenshotHome";


function Home() {
    const [recentServers, setRecentServers] = useState({ results: []});
    const [recentScreenshots, setRecentScreenshots] = useState({ results: []});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: recentServers}, {data: recentScreenshots}] = await Promise.all([
                    axiosReq.get(`/servers/`),
                    axiosReq.get(`/screenshots/`),
                ]);
                setRecentServers(recentServers);
                setRecentScreenshots(recentScreenshots);
                setHasLoaded(true);
            } catch(err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const mainTitle = (
        <>
            <Row>
                <Col>
                    <h1 className={style.title}>Welcome to the Cadius Community site</h1>
                    <hr className={style.hr} />
                    <p className={style.desc}>Here you can view active user servers for Space engineers or Minecraft.</p>
                    <p className={style.desc}>We have also added a new section to the site called "Screenshots". This
                        is where user can show off and comment on other users posts.
                    </p>
                    <hr className={style.hr} />
                    <h3 className={style.title}>Most recent Servers and Screenshots</h3>
                </Col>
            </Row>
        </>
    )

    const recentActivity = (
        <>
            <Row>
                <Col>
                    <Container>
                        {recentServers.results.length ? (
                            <div>
                            {recentServers.results.slice(0,5).map((server) => (
                                <ServerHome key={server.id} {...server} setServers={setRecentServers} />
                            ))}
                            </div>
                        ) :(
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
                <Col>
                    <Container>
                        {recentScreenshots.results.length ? (
                            <div>
                                {recentScreenshots.results.slice(0,5).map((screen) => (
                                    <ScreenshotHome key={screen.id} {...screen} setScreenshots={setRecentScreenshots} />
                                ))}
                            </div>
                        ) : (
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
            </Row>
        </>
    )



    return (
        <Row>
            <Col>
                <Container>
                    {hasLoaded ? (
                        <>
                        {mainTitle}
                        {recentActivity}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                    </Container>
            </Col>
        </Row>
    )
}

export default Home;