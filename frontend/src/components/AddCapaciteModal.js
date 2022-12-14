import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addCapacite} from '../services/CapaciteService';
const addCapaciteModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addCapacite(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Capacite");
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
                        Ajouter Capacite
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numCap">
                                    <Form.Label>Numero Capacite</Form.Label>
                                    <Form.Control type="text" name="numCap" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="droit">
                                    <Form.Label>Droit(Ariary)</Form.Label>
                                    <Form.Control type="text" name="droit" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date_certificat">
                                    <Form.Label>Date certificat</Form.Label>
                                    <Form.Control type="date" name="date_certificat" required placeholder=""></Form.Control>
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
export default addCapaciteModal;
