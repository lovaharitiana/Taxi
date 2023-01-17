import React, { useState, useEffect } from "react";
// import { getCarte_grises } from "../services/Carte_griseService";
import { getChauffeurs } from "../services/ChauffeurService";

import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addTaxi } from '../services/TaxiService';
const AddTaxiModal = (props) => {
    // const [carte_grises, setCarte_grises] = useState([]);
    const [chauffeurs, setChauffeurs] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    // //    CARTE GRISE
    // useEffect(() => {
    //     let mounted = true;
    //     getCarte_grises()
    //         .then(data => {
    //             if (mounted) {
    //                 setCarte_grises(data)
    //             }
    //         })
    //     return () => {
    //         mounted = false;
    //         setIsUpdated(false);
    //     }
    // }, [isUpdated, carte_grises]);

    // CHAUFFEUR
    useEffect(() => {
        let mounted = true;
        if (chauffeurs.length && !isUpdated) {
            return;
        }
        getChauffeurs()
            .then(data => {
                if (mounted) {
                    setChauffeurs(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, chauffeurs]);


    const handleSubmit = (e) => {
        e.preventDefault();
        addTaxi(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Erreur d'ajout de taxi");
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
                        Ajouter Taxis
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numImm">
                                    <Form.Label>Immatriculation</Form.Label>
                                    <Form.Control type="text" name="numImm" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="marque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control type="text" name="marque" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="nb_place">
                                    <Form.Label>Nombre de place</Form.Label>
                                    <Form.Control type="text" name="nb_place" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="carte_grise">
                                    <Form.Label>Carte_grise</Form.Label>
                                    <Form.Control type="text" name="carte_grise" required placeholder=""></Form.Control>
                                </Form.Group>

                                {/* <Form.Group controlId="numMoteur">
                                    <Form.Label>Numero du moteur</Form.Label>
                                    <Form.Control type="text" name="numMoteur" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="poids_total">
                                    <Form.Label>Poids total</Form.Label>
                                    <Form.Control type="text" name="poids_total" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="poids_vide">
                                    <Form.Label>Poids à vide</Form.Label>
                                    <Form.Control type="text" name="poids_vide" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="charge_utile">
                                    <Form.Label>Charge utile</Form.Label>
                                    <Form.Control type="text" name="charge_utile" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <Form.Group controlId="carrosserie">
                                    <Form.Label>Carrosserie</Form.Label>
                                    <Form.Control type="text" name="carrosserie" required placeholder=""></Form.Control>
                                </Form.Group> */}

                                {/* <p></p>
                                <Form.Label>Numero carte_grise</Form.Label>
                                <Form.Select aria-label="Default select example" name="numSerie" >
                                    
                                    {carte_grises.map((crt) =>

                                        <option value={crt.numSerie}>{crt.numSerie}</option>
                                    )}
                                </Form.Select>

                                <p></p> */}
                                <Form.Label>Numero Chauffeur</Form.Label>
                                <Form.Select aria-label="Default select example" name="numChf" >
                                    {chauffeurs.map((chf) =>

                                        <option value={chf.numChf}>{chf.numChf}</option>
                                    )}
                                </Form.Select>

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
export default AddTaxiModal;
