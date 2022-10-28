/* jshint esversion: 11 */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Screenshot from "./Screenshot";
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import EmojiCreateForm from "../emojis/EmojiCreateForm";


function ScreenshotPage() {
    const { id } = useParams();
    const [screenshot, setScreenshot] = useState({ results: [] });
    const [comments, setComments] = useState({ results: [] });
    const [emojis, setEmojis] = useState({ results: []});
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: screenshot }, { data: comments }, {data: emojis}] = await Promise.all([
                    axiosReq.get(`/screenshots/${id}`),
                    axiosReq.get(`/comments/?screenshot=${id}`),
                    axiosReq.get(`/emojis/?screenshot=${id}`)
                ]);
                setScreenshot({ results: [screenshot] });
                setComments(comments);
                setEmojis(emojis);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);
    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Screenshot {...screenshot.results[0]} setScreenshot={setScreenshot} screenshotPage />
                <Container border="warning" className={appStyles.Content}>
                    {currentUser ? (
                        <>
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            screenshot={id}
                            setScreenshot={setScreenshot}
                            setComments={setComments}
                        />
                        
                        <EmojiCreateForm screenshot={id} setScreenshot={setScreenshot} setEmojis={setEmojis} />
                        </>
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll children={comments.results.map(comment => (
                            <Comment key={comment.id} {...comment}
                                setScreenshot={setScreenshot} setComments={setComments} />
                        ))}
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>No comments yet!</span>
                    ) : (
                        <span>No comments..... yet!</span>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default ScreenshotPage;