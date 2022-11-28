import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addTaxi } from '../services/TaxiService';
const addTaxiModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addTaxi(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Taxi");
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

                                <Form.Group controlId="numMoteur">
                                    <Form.Label>Numero du moteur</Form.Label>
                                    <Form.Control type="text" name="numMoteur" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="poids_total">
                                    <Form.Label>Poids total</Form.Label>
                                    <Form.Control type="text" name="poids_total" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="poids_vide">
                                    <Form.Label>Poids à vide</Form.Label>
                                    <Form.Control type="text" name="poids_vide" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="charge_utile">
                                    <Form.Label>Charge utile</Form.Label>
                                    <Form.Control type="text" name="charge_utile" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="carrosserie">
                                    <Form.Label>Carrosserie</Form.Label>
                                    <Form.Control type="text" name="carrosserie" required placeholder=""></Form.Control>
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
export default addTaxiModal;
