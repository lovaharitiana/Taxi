import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { updateCategorie } from '../services/CategorieService';
const UpdateCategorieModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategorie(props.categorie.numCat, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to update Categorie");
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
                        Modifier Categorie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>


                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control type="text" name="type" required
                                        defaultValue={props.categorie.type}
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
export default UpdateCategorieModal;
