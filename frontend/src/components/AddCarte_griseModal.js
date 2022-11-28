import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addCarte_grise } from '../services/Carte_griseService';
const addCarte_griseModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addCarte_grise(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Carte_grise");
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
                        Ajouter Carte_grise
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numSerie">
                                    <Form.Label>Numero de serie</Form.Label>
                                    <Form.Control type="text" name="numSerie" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date_fabrication">
                                    <Form.Label>Date de fabrication</Form.Label>
                                    <Form.Control type="date" name="date_fabrication" required placeholder=""></Form.Control>
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
export default addCarte_griseModal;
