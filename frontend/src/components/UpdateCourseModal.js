import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateCourse } from '../services/CourseService';
import { getTaxis } from "../services/TaxiService";

const UpdateCourseModal = (props) => {
    const [taxis, setTaxis] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    
     // TAXI
     useEffect(() => {
        let mounted = true;
        getTaxis()
            .then(data => {
                if (mounted) {
                    setTaxis(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, taxis]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCourse(props.course.id, e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to update Course");
        }); 
    }
    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered style={{ fontFamily: 'Times New Roman'}}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modifier Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="depart">
                                    {/* <Form.Label>Depart</Form.Label> */}
                                    <Form.Control type="hidden" name="depart" required
                                    defaultValue={props.course.depart}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="destination">
                                    {/* <Form.Label>Prénoms</Form.Label> */}
                                    <Form.Control type="hidden" name="destination" required 
                                    defaultValue={props.course.destination}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="user">
                                    {/* <Form.Label>Date de naissance</Form.Label> */}
                                    <Form.Control type="hidden" name="user" required 
                                    defaultValue={props.course.user}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="montant">
                                    {/* <Form.Label>Montant</Form.Label> */}
                                    <Form.Control type="hidden" name="montant" required 
                                    defaultValue={props.course.montant}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date">
                                    {/* <Form.Label>Date</Form.Label> */}
                                    <Form.Control type="hidden" name="date" required 
                                    defaultValue={props.course.date}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Label>Immatriculation</Form.Label>
                                <Form.Select aria-label="Default select example" name="numImm" >
                                    {taxis.map((txs) =>

                                        <option value={txs.numImm}>{txs.numImm}</option>
                                    )}
                                </Form.Select>
                                

                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Modifier
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};
export default UpdateCourseModal;
