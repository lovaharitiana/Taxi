import React, { useEffect, useState } from "react";
// import { getPermis } from "../services/PermiService";
// import { getCapacites } from "../services/CapaciteService";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addChauffeur } from '../services/ChauffeurService';
const AddChauffeurModal = (props) => {
    // const [permis, setPermis] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    // const [capacites, setCapacites] = useState([]);
    // PERMI
    // useEffect(() => {
    //     let mounted = true;
    //     getPermis()
    //         .then(data => {
    //             if (mounted) {
    //                 setPermis(data)
    //             }
    //         })
    //     return () => {
    //         mounted = false;
    //         setIsUpdated(false);
    //     }
    // }, [isUpdated, permis]);

    // CAPACITE
    // useEffect(() => {
    //     let mounted = true;
    //     getCapacites()
    //         .then(data => {
    //             if (mounted) {
    //                 setCapacites(data)
    //             }
    //         })
    //     return () => {
    //         mounted = false;
    //         setIsUpdated(false);
    //     }
    // }, [isUpdated, capacites]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addChauffeur(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Erreur d'ajout de chauffeur");
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

                                {/* <Form.Group controlId="date_naissance">
                                    <Form.Label>Date de naissance</Form.Label>
                                    <Form.Control type="date" name="date_naissance" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="lieu_naissance">
                                    <Form.Label>Lieu de naissance</Form.Label>
                                    <Form.Control type="text" name="lieu_naissance" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                <Form.Group controlId="adresse">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control type="text" name="adresse" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="permis">
                                    <Form.Label>Catégorie permis</Form.Label>
                                    <Form.Control type="text" name="permis" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="capacite">
                                    <Form.Label>Numero capacité</Form.Label>
                                    <Form.Control type="text" name="capacite" required placeholder=""></Form.Control>
                                </Form.Group>

                                {/* <Form.Group controlId="profession">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control type="text" name="profession" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                <p></p>
                                {/* <Form.Label>Permis</Form.Label>
                                <Form.Select aria-label="Default select example" name="numPer" >
                                    {permis.map((per) =>

                                        <option value={per.numPer}>{per.numPer}</option>
                                    )}
                                </Form.Select> */}

                                <p></p>
                                {/* <Form.Label>Capacite</Form.Label>
                                <Form.Select aria-label="Default select example" name="numCap" >
                                    {capacites.map((cap) =>

                                        <option value={cap.numCap}>{cap.numCap}</option>
                                    )}
                                </Form.Select> */}

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
export default AddChauffeurModal;
