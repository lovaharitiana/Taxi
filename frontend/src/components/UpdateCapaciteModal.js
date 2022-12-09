import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateCapacite } from '../services/CapaciteService';
const UpdateCapaciteModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateCapacite(props.capacite.numCap, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Capacite");
                });
    }
    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modifier Capacites
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="droit">
                                    <Form.Label>Droit(Ariary)</Form.Label>
                                    <Form.Control type="text" name="droit" required
                                        defaultValue={props.capacite.droit}
                                        placeholder=""></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="date_certificat">
                                    <Form.Label>Date Certificat</Form.Label>
                                    <Form.Control type="text" name="date_certificat" required
                                        defaultValue={props.capacite.date_certificat}
                                        placeholder=""></Form.Control>
                                </Form.Group>


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
export default UpdateCapaciteModal;
