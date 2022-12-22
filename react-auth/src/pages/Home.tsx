import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { addCourse } from '../services/CourseService';
import { Button, Modal, Row, Col, Form, FormControl } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';


const Home = (props: any) => {
    const [show, setShow] = useState(false)

    // const history = useNavigate();

    // const currentUrl = history.location.pathname;
    // const userId = currentUrl.split('/user')[2];
    const [distance, setDistance] = useState(0)
    const [speed, setSpeed] = useState(2);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const currentDate = new Date();
    const estimatedTimeInMinutes = Math.ceil(estimatedTime * 5);
    const handleSubmit = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();

        addCourse(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to add Course");
                });
    }
    const handleCalculer = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();
        setShow(true);
        setDistance(Math.floor(Math.random() * 10) + 1)
    }

    useEffect(() => {
        setEstimatedTime(distance / speed);
    }, [distance, speed]);

    return (
        <div className="container">


            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="depart">
                    <Form.Label>Depart</Form.Label>
                    <Form.Control type="text" name="depart" required placeholder=""></Form.Control>
                </Form.Group>

                <Form.Group controlId="destination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name="destination" required placeholder=""></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" rows={parseInt('5', 10)} name="description" required placeholder="Veuillez suivre les instructions à noter à droite de votre écran pour donner plus d'indication pour notre chauffeur, s'il vous plaît!! "></Form.Control>
                </Form.Group>

                <Form.Group controlId="date">

                    <Form.Control type="hidden" name="date" required placeholder="" value={currentDate.toISOString().substr(0, 10)}></Form.Control>

                </Form.Group>

                {/* <Form.Group controlId="distance">
                    <Form.Label>Distance</Form.Label>
                    <Form.Control type="text" name="distance" required placeholder=""></Form.Control>
                </Form.Group> */}




                <Form.Group>
                    <p></p>
                    <Button variant="primary" onClick={handleCalculer}>
                        Calculez
                    </Button>
                </Form.Group>

                {show && <Form.Group controlId="calcul">
                    <Form.Group controlId="distance">

                        <Form.Control type="hidden" name="distance" required placeholder="" value={distance}></Form.Control>

                    </Form.Group>


                    <Form.Group controlId="montant">
                        <Form.Label>Tarif</Form.Label>
                        <Form.Control type="number" name="montant" required placeholder="" value={distance * 1500}></Form.Control>
                        <div>
                            <h2>Arrivé du taxi dans: {estimatedTimeInMinutes} minutes</h2>
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <p></p>
                        <Button variant="primary" type="submit">
                            Envoyer
                        </Button>
                    </Form.Group>
                </Form.Group>}



            </Form>

        </div>
    );
};

export default Home;
