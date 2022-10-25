import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Screenshot from "./Screenshot";

function ScreenshotPage() {
    const { id } = useParams();
    const [screenshot, setScreenshot] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: screenshot}] = await Promise.all([
                    axiosReq.get(`/screenshots/${id}`),
                ])
                setScreenshot({results: [screenshot]});
            } catch(err){
                console.log(err)
            }
        };
        handleMount();
    }, [id]);

    return (
        <Row>
            <Col>
                <Screenshot {...screenshot.results[0]} setScreenshot={setScreenshot} screenshotPage />
            </Col>
        </Row>
    );
}

export default ScreenshotPage;