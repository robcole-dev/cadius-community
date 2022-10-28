/* jshint esversion: 11 */
import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../css/ServerAddEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../css/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function ServerCreateForm() {

    const [errors, setErrors] = useState({});

    const [serverData, setServerData] = useState({
        game: "",
        server_name: "",
        server_address: "",
        banner: "",
    });
    const { game, server_name, server_address, banner } = serverData;

    const bannerInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setServerData({
            ...serverData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeBanner = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(banner);
            setServerData({
                ...serverData,
                banner: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('game', game);
        formData.append('server_name', server_name);
        formData.append('server_address', server_address);
        formData.append('banner', bannerInput.current.files[0]);

        try {
            const { data } = await axiosReq.post('/servers/', formData);
            history.push(`/servers/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Game</Form.Label>
                <Form.Control as="select" name="game" value={game} onChange={handleChange}>
                    <option>Pick a Game from the list</option>
                    <option value="se">Space Engineers</option>
                    <option value="mc">Minecraft</option>
                </Form.Control>
            </Form.Group>
            {errors.game?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Form.Group>
                <Form.Label>Server Name</Form.Label>
                <Form.Control type="text" name="server_name" value={server_name} onChange={handleChange} />
            </Form.Group>
            {errors.name?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Form.Group>
                <Form.Label>Server Address</Form.Label>
                <Form.Control type="text" name="server_address" value={server_address} onChange={handleChange} />
            </Form.Group>
            {errors.address?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Button className={btnStyles.Button} onClick={() => history.goBack()}>cancel</Button>
            <Button className={btnStyles.Button} type="submit">create</Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {banner ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={banner} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="banner-upload" >Change Image</Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className="d-flex justify-content-center" htmlFor="banner-upload" >
                                    <Asset src={Upload} message="Click or tap to upload" />
                                </Form.Label>
                            )};

                            <Form.File id="banner-upload" accept="image/*" onChange={handleChangeBanner} ref={bannerInput} />
                        </Form.Group>
                        {errors?.banner?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default ServerCreateForm;