import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateTaxi } from '../services/TaxiService';
const UpdateTaxiModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTaxi(props.taxi.numImm, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Taxi");
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
                        Modifier Taxis
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="marque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control type="text" name="marque" required
                                        defaultValue={props.taxi.marque}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="nb_place">
                                    <Form.Label>Nombre de place</Form.Label>
                                    <Form.Control type="text" name="nb_place" required
                                        defaultValue={props.taxi.nb_place}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="numMoteur">
                                    <Form.Label>Numero moteur</Form.Label>
                                    <Form.Control type="text" name="numMoteur" required
                                        defaultValue={props.taxi.numMoteur}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="poids_total">
                                    <Form.Label>Poids total</Form.Label>
                                    <Form.Control type="text" name="poids_total" required
                                        defaultValue={props.taxi.poids_total}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="poids_vide">
                                    <Form.Label>Poids à vide</Form.Label>
                                    <Form.Control type="text" name="poids_vide" required
                                        defaultValue={props.taxi.poids_vide}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="charge_utile">
                                    <Form.Label>Charge utile</Form.Label>
                                    <Form.Control type="text" name="charge_utile" required
                                        defaultValue={props.taxi.charge_utile}
                                        placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="carrosserie">
                                    <Form.Label>Carrosserie</Form.Label>
                                    <Form.Control type="text" name="carrosserie" required
                                        defaultValue={props.taxi.carrosserie}
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
export default UpdateTaxiModal;
