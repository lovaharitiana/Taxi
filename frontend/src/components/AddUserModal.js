import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addUser } from '../services/UserService';
const addUserModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Erreur d'ajout d'utilisateur");
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
                        Ajouter Utilisateur
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nom utilisateur</Form.Label>
                                    <Form.Control type="text" name="name" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password" name="password" required placeholder=""></Form.Control>
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
export default addUserModal;
