import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addAssurance} from '../services/AssuranceService';
const addAssuranceModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addAssurance(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Assurance");
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
                        Ajouter Assurance
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="ref">
                                    <Form.Label>Référence</Form.Label>
                                    <Form.Control type="text" name="ref" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="debut_ass">
                                    <Form.Label>Debut assurance</Form.Label>
                                    <Form.Control type="date" name="debut_ass" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="fin_ass">
                                    <Form.Label>Fin assurance</Form.Label>
                                    <Form.Control type="date" name="fin_ass" required placeholder=""></Form.Control>
                                </Form.Group>


                                

                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Ajouter
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
export default addAssuranceModal;
