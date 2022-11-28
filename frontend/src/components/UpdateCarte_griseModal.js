import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateCarte_grise } from '../services/Carte_griseService';
const UpdateCarte_griseModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateCarte_grise(props.carte_grise.numSerie, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Carte_grise");
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
                        Modifier Carte_grises
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="date_fabrication">
                                    <Form.Label>Date de fabrication</Form.Label>
                                    <Form.Control type="date" name="date_fabrication" required
                                        defaultValue={props.carte_grise.date_fabrication}
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
export default UpdateCarte_griseModal;
