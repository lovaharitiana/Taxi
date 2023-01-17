import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateAgence } from '../services/AgenceService';
const UpdateAgenceModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateAgence(props.agence.numAg, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Agence");
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
                        Modifier Agences
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="nomAg">
                                    <Form.Label>Nom agence</Form.Label>
                                    <Form.Control type="text" name="nomAg" required
                                        defaultValue={props.agence.nomAg}
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
export default UpdateAgenceModal;
