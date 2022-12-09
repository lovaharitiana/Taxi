import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateAssurance } from '../services/AssuranceService';
const UpdateAssuranceModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateAssurance(props.assurance.ref, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Assurance");
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
                        Modifier assurance
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="debut_ass">
                                    <Form.Label>Debut assurance</Form.Label>
                                    <Form.Control type="date" name="debut_ass" required
                                        defaultValue={props.assurance.debut_ass}
                                        placeholder=""></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="fin_ass">
                                    <Form.Label>Fin assurance</Form.Label>
                                    <Form.Control type="date" name="fin_ass" required
                                        defaultValue={props.assurance.fin_ass}
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
export default UpdateAssuranceModal;
