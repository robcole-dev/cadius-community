import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Server from "./Server";

function ServerPage() {
    const { id } = useParams();
    const [server, setServer] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: server}] = await Promise.all([
                    axiosReq.get(`/servers/${id}`),
                ])
                setServer({results: [server]});
            } catch(err){
                console.log(err)
            }
        };
        handleMount();
    }, [id]);

    return (
        <Row>
            <Col>
                <Server {...server.results[0]} setServers={setServer} serverPage/>
            </Col>
        </Row>
    );
}

export default ServerPage;