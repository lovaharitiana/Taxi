import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addAgence} from '../services/AgenceService';
const addAgenceModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addAgence(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Agence");
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
                        Ajouter Agence
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numAg">
                                    <Form.Label>Numero Agence</Form.Label>
                                    <Form.Control type="text" name="numAg" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="nomAg">
                                    <Form.Label>Nom agence</Form.Label>
                                    <Form.Control type="text" name="nomAg" required placeholder=""></Form.Control>
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
export default addAgenceModal;
