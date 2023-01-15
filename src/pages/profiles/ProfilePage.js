import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../css/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../css/Button.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import ServerProfile from "../servers/ServerProfile";
import Screenshot from "../screenshots/Screenshot";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileServers, setProfileServers] = useState({ results: [] });
    const [profileScreenshots, setProfileScreenshots] = useState({ results: []});

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile?.results;
    const is_owner = currentUser?.username === profile?.author

    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profileServers }, { data: profileScreenshots }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/servers/?author_id__profile=${id}`),
                    axiosReq.get(`/screenshots/?author_id__profile=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfileScreenshots(profileScreenshots);
                setProfileServers(profileServers);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.profile_image} />
                </Col>
                <Col lg={6}>
                    <h2 className={`${styles.ProfileText} m-2`}>{profile?.author}</h2>
                    <p className={styles.ProfileText}>Screen Name: {profile?.screen_name}</p>
                </Col>
                <Col className="m-2">
                    {is_owner && (
                        <>
                            <Button className={btnStyles.Button} onClick={() => history.push(`/profiles/${id}/edit`)}>Edit Profile</Button>
                            <Button variant="warning" className={btnStyles.Button} onClick={() => history.push(`/profiles/${id}/edit/username`)} 
                                aria-label="edit-username">Change Username</Button>
                            <Button variant="danger" className={btnStyles.Button} onClick={() => history.push(`/profiles/${id}/edit/password`)}
                                aria-label="edit-password">Change Password</Button>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className= {`${styles.ProfileText} text-center`}>{profile?.author}'s servers and posts</p>
            <hr />
            <Row>
                <Col>
                    {profileServers.results.length ? (
                        <InfiniteScroll
                            children={profileServers.results.map((server) => (
                                <ServerProfile key={server.id} {...server} setServers={setProfileServers} />
                            ))}
                            dataLength={profileServers.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!profileServers.next}
                            next={() => fetchMoreData(profileServers, setProfileServers)}
                        />
                    ) : (
                        <Asset message={`No results found, ${profile?.owner} hasn't posted yet.`} />
                    )}
                </Col>
                <Col>
                    {profileScreenshots.results.length ? (
                        <InfiniteScroll
                            children={profileScreenshots.results.map((screenshot) => (
                                <Screenshot key={screenshot.id} {...screenshot} setScreenshots={setProfileScreenshots} />
                            ))}
                            dataLength={profileScreenshots.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!profileScreenshots.next}
                            next={() => fetchMoreData(profileScreenshots, setProfileScreenshots)}
                        />
                    ) : (
                        <Asset message={`No results found, ${profile?.owner} hasn't posted yet.`} />
                    )}
                </Col>
            </Row>
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default ProfilePage;