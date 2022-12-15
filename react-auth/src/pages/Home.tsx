import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { addCourse } from '../services/CourseService';
import { Button, Modal, Row, Col, Form } from "react-bootstrap";




const Home = (props: any) => {
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

                {/* <Form.Group controlId="distance">
                    <Form.Label>Distance</Form.Label>
                    <Form.Control type="text" name="distance" required placeholder=""></Form.Control>
                </Form.Group> */}



                <Form.Group>
                    <p></p>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </Form.Group>
            </Form>

        </div>
    );
};

export default Home;
