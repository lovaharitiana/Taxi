import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addCategorie} from '../services/CategorieService';
const addCategorieModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addCategorie(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Categorie");
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
                        Ajouter Categorie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numCat">
                                    <Form.Label>Numero Categorie</Form.Label>
                                    <Form.Control type="text" name="numCat" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control type="text" name="type" required placeholder=""></Form.Control>
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
export default addCategorieModal;
