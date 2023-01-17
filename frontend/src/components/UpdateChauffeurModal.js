import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateChauffeur } from '../services/ChauffeurService';
const UpdateChauffeurModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateChauffeur(props.chauffeur.numChf, e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Erreur de modification de chauffeur");
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
                        Modifier Chauffeurs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="nomChf">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" name="nomChf" required
                                    defaultValue={props.chauffeur.nomChf}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="prenomChf">
                                    <Form.Label>Prénoms</Form.Label>
                                    <Form.Control type="text" name="prenomChf" required 
                                    defaultValue={props.chauffeur.prenomChf}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                {/* <Form.Group controlId="date_naissance">
                                    <Form.Label>Date de naissance</Form.Label>
                                    <Form.Control type="date" name="date_naissance" required 
                                    defaultValue={props.chauffeur.date_naissance}
                                    placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="lieu_naissance">
                                     <Form.Label>Lieu de naissance</Form.Label>
                                    <Form.Control type="text" name="lieu_naissance" required 
                                    defaultValue={props.chauffeur.lieu_naissance}
                                    placeholder=""></Form.Control>
                                </Form.Group> */}

                                <Form.Group controlId="adresse">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control type="text" name="adresse" required 
                                    defaultValue={props.chauffeur.adresse}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="permis">
                                    <Form.Label>Catégorie permis</Form.Label>
                                    <Form.Control type="text" name="permis" required 
                                    defaultValue={props.chauffeur.permis}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="capacite">
                                    <Form.Label>Numero capacite</Form.Label>
                                    <Form.Control type="text" name="capacite" required 
                                    defaultValue={props.chauffeur.capacite}
                                    placeholder=""></Form.Control>
                                </Form.Group>

                                {/* <Form.Group controlId="profession">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control type="text" name="profession" required 
                                    defaultValue={props.chauffeur.profession}
                                    placeholder=""></Form.Control>
                                </Form.Group> */}

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
export default UpdateChauffeurModal;
