import './CameraSettings.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Camera, Circle, PlayCircle, PlayCircleFill, PauseCircle, PauseCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import swal from 'sweetalert';

function CameraSettings() {
    const dispatch = useDispatch();
    const [motionStarted, setMotionStarted] = useState(false);
    const toggleMotionStarted = () => {
        setMotionStarted(!motionStarted);
    }

    const snapPhoto = () => {
        axios.get('http://192.168.0.82:5000/photos').then((result) => {
            if (result.status === 200) {
                const element = document.getElementById('the-flash');
                element.classList.add('the-flash');
                setTimeout(() => {
                    element.classList.remove('the-flash');
                }, 500);
            }
            else if (result.status !== 200) {
                console.log(result);
            }
        }).catch(error => console.log(error));
    }

    const startMotion = () => {
        axios.get('http://192.168.0.82:8080/0/detection/start').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }
    const pauseMotion = () => {
        axios.get('http://192.168.0.82:8080/0/detection/pause').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }

    const restartMotion = () => {
        axios.get('http://192.168.0.82:8080/0/action/restart').then((result) => {
            const element = document.getElementById('restart-button');
            element.classList.add('spin-restart');
            setTimeout(() => {
                element.classList.remove('spin-restart');
            }, 500);
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        //dispatch({ type: '?' });
        axios.get('http://192.168.0.82:8080/0/detection/status').then((result) => {
            if (result.data.includes('ACTIVE')) {
                setMotionStarted(true);
            }
            else if (result.data.includes('PAUSE')) {
                setMotionStarted(false);
            }
        }).catch(error => console.log(error));
    }, []);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col lg={2} md={2} className="d-flex-inline text-center">
                    <div className="border shadow mb-4"><h4 className="camera-settings-text">Motion Detection Settings{motionStarted ?
                        <div
                            className="pt-2 active-sign"
                        >ACTIVE</div> :
                        <div
                            className="pt-2 pause-sign"
                        >PAUSED</div>}</h4></div>
                    <h5 className="camera-settings-text">START&nbsp;&nbsp;&nbsp;&nbsp;
                    {motionStarted ?
                            <PlayCircleFill
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            /> :
                            <PlayCircle
                                onClick={startMotion}
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            />
                        }</h5>
                    <h5 className="camera-settings-text">PAUSE&nbsp;&nbsp;&nbsp;&nbsp;
                    {motionStarted ?
                            <PauseCircle
                                onClick={pauseMotion}
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            /> :
                            <PauseCircleFill

                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            />
                        }       </h5>
                    <h5 className="camera-settings-text">RESTART&nbsp;<ArrowCounterclockwise
                        id="restart-button"
                        onClick={restartMotion}
                        className="motion-buttons"
                        as="button"
                        fontSize="2.9rem"
                        variant="outline-dark"
                    /></h5>
                </Col>
                <Col lg={8} md={8} className="d-flex-inline justify-content-center">
                    <div id="the-flash-div" className="d-flex justify-content-center">
                        <img
                            id="the-flash"
                            src="flash.jpg" alt="flash"></img>
                        <iframe
                            id="the-webcam"
                            className="" name="webcam" src='http://192.168.0.82:8081'
                            width="1024" height="768" frameBorder="1" frameSpacing="" scrolling="no" border="0" ></iframe >
                    </div>
                    <div id="the-div" className="d-flex justify-content-center pt-3">
                        <Circle
                            id="the-circle"
                            fontSize="3rem"
                            variant="outline-dark"
                            onClick={snapPhoto}
                        ></Circle>
                        <Camera
                            className=" mt-1"
                            id="the-camera"
                            as="button"
                            fontSize="2.1rem"
                            variant="outline-dark" />
                    </div>

                </Col>
                <Col lg={2} md={2} className="d-flex-inline justify-content-center">
                    <div></div>
                </Col>
            </Row>
        </Container>
    );
}

export default CameraSettings;
