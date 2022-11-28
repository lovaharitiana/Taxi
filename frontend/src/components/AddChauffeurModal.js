import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addChauffeur } from '../services/ChauffeurService';
const addChauffeurModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addChauffeur(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Chauffeur");
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
                        Ajouter Chauffeurs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="nomChf">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" name="nomChf" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="prenomChf">
                                    <Form.Label>Prénoms</Form.Label>
                                    <Form.Control type="text" name="prenomChf" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date_naissance">
                                    <Form.Label>Date de naissance</Form.Label>
                                    <Form.Control type="date" name="date_naissance" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="lieu_naissance">
                                    <Form.Label>Lieu de naissance</Form.Label>
                                    <Form.Control type="text" name="lieu_naissance" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="adresse">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control type="text" name="adresse" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="profession">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control type="text" name="profession" required placeholder=""></Form.Control>
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
export default addChauffeurModal;
