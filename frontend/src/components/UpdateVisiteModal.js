import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateVisite } from '../services/VisiteService';
const UpdateVisiteModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateVisite(props.visite.numVis, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Visite");
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
                        Modifier Visites
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="date_vis">
                                    <Form.Label>Date de visite</Form.Label>
                                    <Form.Control type="date" name="date_vis" required
                                        defaultValue={props.visite.date_vis}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="fin_vis">
                                    <Form.Label>Date de validité de visite</Form.Label>
                                    <Form.Control type="date" name="fin_vis" required
                                        defaultValue={props.visite.fin_vis}
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
export default UpdateVisiteModal;
